import json
import time
import uuid
from typing import AsyncGenerator, Optional
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.logging import logger
from app.core.security import AuthenticatedUser
from app.db.models import Interaction
from app.schemas.ask import AskMetadata, AskRequest
from app.services.llm import llm_service
from app.services.prompts import prompt_service
from app.services.retrieval import retrieval_service
from app.utils.language import detect_language


class AskService:
    """Service orchestrating the complete Ask flow (language detection, retrieval, streaming, and logging)."""

    async def execute_ask_stream(
        self,
        request: AskRequest,
        current_user: Optional[AuthenticatedUser] = None,
        db: Optional[AsyncSession] = None,
    ) -> AsyncGenerator[str, None]:
        """Execute Ask request flow and yield Server-Sent Events (SSE) formatted frames."""
        start_time = time.time()
        interaction_id = str(uuid.uuid4())

        # 1. Detect or use user-specified language
        language = request.language or detect_language(request.question)

        # 2. Retrieve grounded context from vector database
        retrieval = await retrieval_service.retrieve(
            query=request.question,
            scope=request.scope,
            unit_id=request.unit_id,
            lesson_id=request.lesson_id,
            db=db,
            top_k=5,
        )

        # 3. Load active prompt version
        prompt_id, prompt_version, prompt_body = await prompt_service.get_active_prompt(
            mode=request.mode,
            db=db,
        )

        # 4. Assemble system and user prompts
        system_prompt = prompt_service.format_system_prompt(prompt_body, language)
        user_prompt = prompt_service.assemble_user_query(request.question, retrieval.raw_texts)

        # 5. Emit initial metadata frame (sources, confidence, interaction_id)
        metadata = AskMetadata(
            interaction_id=interaction_id,
            sources=retrieval.chunks,
            confidence=retrieval.top_confidence,
            confidence_warning=retrieval.confidence_warning,
            prompt_version=prompt_version,
            language=language,
        )

        yield f"event: metadata\ndata: {metadata.model_dump_json()}\n\n"

        # 6. Stream LLM tokens
        full_answer_parts = []
        try:
            async for token in llm_service.stream_chat(system_prompt, user_prompt):
                full_answer_parts.append(token)
                token_payload = json.dumps({"token": token}, ensure_ascii=False)
                yield f"event: token\ndata: {token_payload}\n\n"
        except Exception as exc:
            logger.error("Streaming error: %s", str(exc))
            err_payload = json.dumps({"error": "Stream interrupted"}, ensure_ascii=False)
            yield f"event: error\ndata: {err_payload}\n\n"

        complete_answer = "".join(full_answer_parts)
        latency_ms = int((time.time() - start_time) * 1000)

        # 7. Save interaction record to database
        if db:
            try:
                user_uuid = uuid.UUID(current_user.id) if current_user and current_user.id else None
                chunk_uuids = [uuid.UUID(c.id) for c in retrieval.chunks] if retrieval.chunks else []

                interaction_record = Interaction(
                    id=uuid.UUID(interaction_id),
                    user_id=user_uuid,
                    mode=request.mode,
                    scope=request.scope,
                    unit_id=request.unit_id,
                    question=request.question,
                    chunk_ids=chunk_uuids,
                    prompt_version_id=prompt_id,
                    answer=complete_answer,
                    confidence=retrieval.top_confidence,
                    latency_ms=latency_ms,
                    review_status="none",
                )
                db.add(interaction_record)
                await db.commit()
                logger.info("Saved interaction %s (latency: %dms)", interaction_id, latency_ms)
            except Exception as exc:
                await db.rollback()
                logger.error("Failed to persist interaction record: %s", str(exc))

        # 8. Emit completion frame
        done_payload = json.dumps({
            "interaction_id": interaction_id,
            "latency_ms": latency_ms,
            "status": "complete",
        })
        yield f"event: done\ndata: {done_payload}\n\n"


ask_service = AskService()
