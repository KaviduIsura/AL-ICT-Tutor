from dataclasses import dataclass
from typing import List, Optional
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.logging import logger
from app.schemas.ask import SourceChunk
from app.services.embeddings import embeddings_service


@dataclass
class RetrievalResult:
    """Encapsulates the output of vector search, confidence evaluation, and citations."""

    chunks: List[SourceChunk]
    raw_texts: List[str]
    top_confidence: float
    confidence_warning: bool
    query_language: str


class RetrievalService:
    """Service executing unit-filtered pgvector similarity searches with confidence checks."""

    def __init__(self, default_confidence_threshold: float = 0.35, top_k: int = 5):
        self.default_confidence_threshold = default_confidence_threshold
        self.top_k = top_k

    async def retrieve(
        self,
        query: str,
        scope: str = "all",
        unit_id: Optional[int] = None,
        lesson_id: Optional[int] = None,
        db: Optional[AsyncSession] = None,
        top_k: Optional[int] = None,
        confidence_threshold: Optional[float] = None,
    ) -> RetrievalResult:
        """Search chunks by cosine similarity with optional unit/lesson filtering."""
        limit = top_k or self.top_k
        threshold = confidence_threshold or self.default_confidence_threshold

        # Embed query text into 1024-dimensional vector
        query_vector = embeddings_service.embed_text(query)
        vector_str = "[" + ",".join(f"{x:.6f}" for x in query_vector) + "]"

        # Determine filter parameters based on scope
        filter_unit = unit_id if scope == "unit" and unit_id is not None else None
        filter_lesson = lesson_id if scope == "unit" and lesson_id is not None else None

        chunks: List[SourceChunk] = []
        raw_texts: List[str] = []
        top_confidence = 0.0

        if db:
            # Section 9 SQL vector search query using cosine distance (<=>)
            query_sql = text("""
                SELECT 
                    id, 
                    content, 
                    unit_id, 
                    lesson_id,
                    1 - (embedding <=> CAST(:query_vector AS vector)) AS similarity
                FROM chunks
                WHERE (:filter_unit IS NULL OR unit_id = :filter_unit)
                  AND (:filter_lesson IS NULL OR lesson_id = :filter_lesson)
                  AND embedding IS NOT NULL
                ORDER BY embedding <=> CAST(:query_vector AS vector)
                LIMIT :limit_count
            """)

            try:
                result = await db.execute(
                    query_sql,
                    {
                        "query_vector": vector_str,
                        "filter_unit": filter_unit,
                        "filter_lesson": filter_lesson,
                        "limit_count": limit,
                    },
                )
                rows = result.fetchall()

                for row in rows:
                    r_id, r_content, r_unit, r_lesson, r_sim = row
                    sim_float = round(float(r_sim or 0.0), 4)

                    citation = f"[Unit {r_unit}]" if r_unit else "[Syllabus]"
                    if r_unit and r_lesson:
                        citation = f"[Unit {r_unit} – Lesson {r_lesson}]"

                    # Create a short snippet for metadata
                    snippet = r_content[:180].replace("\n", " ").strip() + "..."

                    chunks.append(
                        SourceChunk(
                            id=str(r_id),
                            unit_id=r_unit,
                            lesson_id=r_lesson,
                            similarity=sim_float,
                            citation=citation,
                            snippet=snippet,
                        )
                    )
                    raw_texts.append(f"{citation}\n{r_content}")

                if chunks:
                    top_confidence = chunks[0].similarity
            except Exception as exc:
                logger.error("Database vector retrieval error: %s", str(exc))

        confidence_warning = (top_confidence < threshold) or (len(chunks) == 0)

        logger.info(
            "Retrieved %d chunks (top similarity: %.4f, warning: %s) for query: '%s'",
            len(chunks),
            top_confidence,
            confidence_warning,
            query[:50],
        )

        return RetrievalResult(
            chunks=chunks,
            raw_texts=raw_texts,
            top_confidence=top_confidence,
            confidence_warning=confidence_warning,
            query_language="si",
        )


retrieval_service = RetrievalService()
