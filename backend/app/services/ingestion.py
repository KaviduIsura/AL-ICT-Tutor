import re
import uuid
from pathlib import Path
from typing import Any, BinaryIO, Dict, List, Optional, Tuple, Union
import pypdf
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.logging import logger
from app.db.models import Chunk, Document
from app.services.embeddings import embeddings_service
from app.utils.language import detect_language
from app.utils.text import clean_sinhala_text, estimate_token_count

# Regex pattern matching numbered sections, chapter headings, and A/L ICT unit/lesson titles
HEADING_PATTERN = re.compile(
    r"^(?:"
    r"[0-9]{1,2}(?:\.[0-9]{1,2})*\.?\s+[^\n]{2,80}|"
    r"(?:Unit|Lesson|Chapter|පාඩම|ඒකකය)\s+[0-9IVXLCDM]+\s*[:–-]?\s*[^\n]{0,80}|"
    r"[A-Z0-9\s/–-]{4,60}$"
    r")",
    re.MULTILINE,
)


class IngestionService:
    """Service handling PDF text extraction, Sinhala cleaning, heading-based chunking, and embedding."""

    def __init__(self, target_min_tokens: int = 300, target_max_tokens: int = 500):
        self.target_min_tokens = target_min_tokens
        self.target_max_tokens = target_max_tokens

    def extract_text_from_pdf(
        self, pdf_source: Union[str, Path, BinaryIO]
    ) -> List[Tuple[int, str]]:
        """Extract text page-by-page from PDF and apply Sinhala cleaning."""
        reader = pypdf.PdfReader(pdf_source)
        pages_data: List[Tuple[int, str]] = []

        for idx, page in enumerate(reader.pages):
            page_num = idx + 1
            raw_text = page.extract_text() or ""
            cleaned = clean_sinhala_text(raw_text)
            if cleaned:
                pages_data.append((page_num, cleaned))

        logger.info("Extracted %d non-empty pages from PDF.", len(pages_data))
        return pages_data

    def chunk_by_headings(
        self, pages_data: List[Tuple[int, str]]
    ) -> List[Dict[str, Any]]:
        """Split document into semantic 300–500 token passages, keeping each heading with its text."""
        chunks: List[Dict[str, Any]] = []
        current_heading = "General"
        current_buffer: List[str] = []
        current_tokens = 0
        current_start_page = pages_data[0][0] if pages_data else 1

        for page_num, page_text in pages_data:
            paragraphs = page_text.split("\n\n")

            for para in paragraphs:
                para = para.strip()
                if not para:
                    continue

                # Check if paragraph is or starts with a heading
                lines = para.split("\n")
                first_line = lines[0].strip()

                is_heading = bool(HEADING_PATTERN.match(first_line)) and len(first_line) < 90

                if is_heading:
                    # Flush current buffer if large enough
                    if current_buffer and current_tokens >= self.target_min_tokens:
                        chunk_text = "\n\n".join(current_buffer)
                        chunks.append({
                            "content": chunk_text,
                            "heading": current_heading,
                            "page": current_start_page,
                            "tokens": current_tokens,
                            "language": detect_language(chunk_text),
                        })
                        current_buffer = []
                        current_tokens = 0
                        current_start_page = page_num

                    current_heading = first_line

                para_tokens = estimate_token_count(para)

                # If paragraph itself is huge (> 500 tokens), split into sentences
                if para_tokens > self.target_max_tokens:
                    sentences = re.split(r"(?<=[.?!।\n])\s+", para)
                    sub_buf: List[str] = [f"[{current_heading}]"] if current_heading != "General" else []
                    sub_tokens = estimate_token_count(sub_buf[0]) if sub_buf else 0

                    for sent in sentences:
                        s_tokens = estimate_token_count(sent)
                        if sub_tokens + s_tokens > self.target_max_tokens and sub_buf:
                            chunk_text = " ".join(sub_buf)
                            chunks.append({
                                "content": chunk_text,
                                "heading": current_heading,
                                "page": page_num,
                                "tokens": sub_tokens,
                                "language": detect_language(chunk_text),
                            })
                            sub_buf = [f"[{current_heading}]", sent]
                            sub_tokens = estimate_token_count(" ".join(sub_buf))
                        else:
                            sub_buf.append(sent)
                            sub_tokens += s_tokens

                    if sub_buf:
                        current_buffer.append(" ".join(sub_buf))
                        current_tokens += sub_tokens
                else:
                    # Normal paragraph accumulation
                    if current_tokens + para_tokens > self.target_max_tokens and current_buffer:
                        chunk_text = "\n\n".join(current_buffer)
                        chunks.append({
                            "content": chunk_text,
                            "heading": current_heading,
                            "page": current_start_page,
                            "tokens": current_tokens,
                            "language": detect_language(chunk_text),
                        })
                        current_buffer = [f"[{current_heading}]\n{para}"]
                        current_tokens = estimate_token_count(current_buffer[0])
                        current_start_page = page_num
                    else:
                        if not current_buffer and current_heading != "General" and not is_heading:
                            current_buffer.append(f"[{current_heading}]")
                            current_tokens += estimate_token_count(current_buffer[0])
                        current_buffer.append(para)
                        current_tokens += para_tokens

        # Flush any remaining buffer
        if current_buffer:
            chunk_text = "\n\n".join(current_buffer)
            chunks.append({
                "content": chunk_text,
                "heading": current_heading,
                "page": current_start_page,
                "tokens": current_tokens,
                "language": detect_language(chunk_text),
            })

        logger.info("Chunked document into %d semantic passages.", len(chunks))
        return chunks

    async def ingest_document(
        self,
        pdf_path: Union[str, Path],
        unit_id: Optional[int] = None,
        lesson_id: Optional[int] = None,
        title: Optional[str] = None,
        source_type: str = "notes",
        year: Optional[int] = None,
        uploaded_by: Optional[uuid.UUID] = None,
        db_session: Optional[AsyncSession] = None,
    ) -> Dict[str, Any]:
        """Complete ingestion pipeline: extract -> clean -> chunk -> embed -> store."""
        path = Path(pdf_path)
        if not path.exists():
            raise FileNotFoundError(f"PDF file not found: {path}")

        doc_title = title or path.stem.replace("_", " ").title()
        pages_data = self.extract_text_from_pdf(path)

        if not pages_data:
            raise ValueError(f"No extractable text found in PDF: {path}")

        chunks_data = self.chunk_by_headings(pages_data)

        # Batch embed all chunk contents
        logger.info("Generating embeddings for %d chunks...", len(chunks_data))
        contents = [c["content"] for c in chunks_data]
        embeddings = embeddings_service.embed_documents(contents)

        for chunk, emb in zip(chunks_data, embeddings):
            chunk["embedding"] = emb

        doc_id = uuid.uuid4()
        language_summary = {}
        for c in chunks_data:
            lang = c["language"]
            language_summary[lang] = language_summary.get(lang, 0) + 1

        total_tokens = sum(c["tokens"] for c in chunks_data)

        # Store in database if session is provided
        if db_session:
            db_doc = Document(
                id=doc_id,
                title=doc_title,
                source_type=source_type,
                year=year,
                storage_path=str(path.resolve()),
                status="ready",
                uploaded_by=uploaded_by,
            )
            db_session.add(db_doc)

            for c in chunks_data:
                db_chunk = Chunk(
                    document_id=doc_id,
                    unit_id=unit_id,
                    lesson_id=lesson_id,
                    language=c["language"],
                    content=c["content"],
                    embedding=c["embedding"],
                    quality_score=0.0,
                )
                db_session.add(db_chunk)

            await db_session.commit()
            logger.info("Stored document %s with %d chunks in database.", doc_id, len(chunks_data))

        return {
            "document_id": str(doc_id),
            "title": doc_title,
            "unit_id": unit_id,
            "lesson_id": lesson_id,
            "pages": len(pages_data),
            "chunks_count": len(chunks_data),
            "total_tokens": total_tokens,
            "languages": language_summary,
            "chunks": chunks_data,
        }


ingestion_service = IngestionService()
