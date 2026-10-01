from typing import List, Optional, Tuple
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.logging import logger
from app.db.models import PromptVersion

# Section 10.4 Canonical Ask Prompt (Default ask_v1)
DEFAULT_ASK_PROMPT_BODY = (
    "You are an A/L ICT tutor for Sri Lankan students. Answer ONLY using the CONTEXT passages. "
    "If the context does not contain the answer, say clearly that it is not covered in the syllabus material "
    "and suggest which unit to check. Reply in the student's language ({language}); keep technical terms in "
    "English where textbooks do. Be concise and exam-oriented. Cite sources as [Unit X – Lesson Y]."
)


class PromptService:
    """Service managing versioned tutor system prompts and contextual prompt assembly."""

    async def get_active_prompt(
        self,
        mode: str = "ask",
        version_name: Optional[str] = None,
        db: Optional[AsyncSession] = None,
    ) -> Tuple[int, str, str]:
        """Fetch the active prompt version from database or fall back to defaults."""
        default_name = "ask_v1" if mode == "ask" else f"{mode}_v1"

        if db:
            try:
                stmt = select(PromptVersion).where(
                    PromptVersion.mode == mode,
                    PromptVersion.active.is_(True),
                )
                if version_name:
                    stmt = stmt.where(PromptVersion.name == version_name)

                result = await db.execute(stmt)
                prompt_obj = result.scalars().first()

                if prompt_obj:
                    return prompt_obj.id, prompt_obj.name, prompt_obj.body
            except Exception as exc:
                logger.warning("Could not load prompt from DB (%s), using default template.", str(exc))

        return 1, default_name, DEFAULT_ASK_PROMPT_BODY

    def format_system_prompt(self, body_template: str, language: str) -> str:
        """Inject target language into prompt template."""
        lang_map = {
            "si": "Sinhala (සිංහල)",
            "en": "English",
            "mixed": "Sinhala with English technical terms (Code-mixed)",
        }
        lang_str = lang_map.get(language, "Sinhala")
        return body_template.format(language=lang_str)

    def assemble_user_query(self, question: str, context_chunks: List[str]) -> str:
        """Construct grounded prompt including retrieved context and student question."""
        if not context_chunks:
            return (
                "CONTEXT PASSAGES:\n"
                "[No relevant syllabus material was found in the database for this query]\n\n"
                f"STUDENT QUESTION:\n{question}"
            )

        formatted_context = "\n\n---\n\n".join(context_chunks)
        return (
            "CONTEXT PASSAGES:\n"
            f"{formatted_context}\n\n"
            "---\n\n"
            f"STUDENT QUESTION:\n{question}\n\n"
            "INSTRUCTIONS:\n"
            "Answer the question accurately and concisely based strictly on the above CONTEXT passages. "
            "Include inline citations like [Unit X – Lesson Y] for facts. "
            "If the answer is not in the context, explicitly inform the student."
        )


prompt_service = PromptService()
