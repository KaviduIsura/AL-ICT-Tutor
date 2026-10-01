import io
import pytest
import pypdf
from app.services.embeddings import EmbeddingsService, embeddings_service
from app.services.ingestion import IngestionService
from app.utils.language import detect_language
from app.utils.text import clean_sinhala_text, estimate_token_count


def create_sample_pdf() -> io.BytesIO:
    """Helper to synthesize an in-memory PDF with Sinhala and English sample syllabus content."""
    from pypdf import PdfWriter
    from reportlab.pdfgen import canvas

    buffer = io.BytesIO()
    c = canvas.Canvas(buffer)

    # Page 1: Heading and intro
    c.drawString(100, 750, "1. Introduction to Computer Architecture")
    c.drawString(100, 730, "The central processing unit (CPU) consists of ALU and Control Unit.")
    c.drawString(100, 710, "පරිගණකයක මධ්‍ය සැකසුම් ඒකකය (CPU) මූලික කොටස් දෙකකින් සමන්විත වේ.")
    c.drawString(100, 690, "ගණිතමය හා තාර්කික ඒකකය (ALU) සහ පාලන ඒකකය (CU).")
    c.showPage()

    # Page 2: Next section
    c.drawString(100, 750, "2. Memory Hierarchy and Storage")
    c.drawString(100, 730, "Primary storage includes RAM and ROM, providing high-speed volatile data access.")
    c.drawString(100, 710, "ප්‍රාථමික මතකය ලෙස RAM සහ ROM හැඳින්වේ.")
    c.showPage()

    c.save()
    buffer.seek(0)
    return buffer


def test_clean_sinhala_text():
    """Verify Sinhala text cleaning, whitespace normalization, and ZWJ preservation."""
    dirty_text = "පරිගණකය\t\t\u200Bක්‍රමලේඛනය   (Python)   \n\n\n\nමෙහෙයුම්   පද්ධතිය"
    cleaned = clean_sinhala_text(dirty_text)

    # Tabs and extra spaces collapsed
    assert "\t" not in cleaned
    assert "   " not in cleaned
    assert "\u200B" not in cleaned  # Zero-width space removed
    # Paragraph break preserved
    assert "\n\n" in cleaned
    assert "පරිගණකය" in cleaned
    assert "Python" in cleaned


def test_language_detection():
    """Verify script language detection for Sinhala, English, and mixed syllabus text."""
    sinhala_text = "දත්ත සමුදාය කළමනාකරණ පද්ධති මඟින් දත්ත ගබඩා කිරීම සහ ලබා ගැනීම පහසු කරයි."
    english_text = "Database Management Systems facilitate storage and retrieval of structured data."
    mixed_text = "SQL query මඟින් relational database එකකින් දත්ත ලබාගත හැක."

    assert detect_language(sinhala_text) == "si"
    assert detect_language(english_text) == "en"
    assert detect_language(mixed_text) == "mixed"


def test_token_estimation():
    """Verify token estimation gives reasonable lengths for English and Sinhala."""
    text_en = "Information and Communication Technology is essential for modern education."
    text_si = "තොරතුරු සහ සන්නිවේදන තාක්ෂණය නවීන අධ්‍යාපනය සඳහා අත්‍යවශ්‍ය වේ."

    tokens_en = estimate_token_count(text_en)
    tokens_si = estimate_token_count(text_si)

    assert 10 <= tokens_en <= 30
    assert 15 <= tokens_si <= 45


def test_embeddings_service():
    """Verify embeddings produce 1024-dimensional normalized vectors."""
    service = EmbeddingsService()
    vector = service.embed_text("පරිගණක ජාලකරණය (Computer Networking)")

    assert len(vector) == 1024
    # Check L2 normalization (sum of squares is approximately 1.0)
    norm = sum(x * x for x in vector)
    assert 0.98 <= norm <= 1.02

    # Batch embedding
    batch = service.embed_documents(["Unit 1", "Unit 2", "Unit 3"])
    assert len(batch) == 3
    for v in batch:
        assert len(v) == 1024


@pytest.mark.asyncio
async def test_heading_chunking_and_ingest():
    """Verify heading-based chunker attaches headings and respects token boundaries."""
    ingestion = IngestionService(target_min_tokens=20, target_max_tokens=100)

    pages_data = [
        (1, "1. Fundamental Digital Logic\n\nLogic gates are the basic building blocks of any digital system."),
        (1, "AND gate produces high output only when all inputs are high."),
        (2, "2. Combinational Circuits\n\nHalf adders and full adders perform binary addition."),
    ]

    chunks = ingestion.chunk_by_headings(pages_data)

    assert len(chunks) >= 2
    # Check that headings were identified
    headings = [c["heading"] for c in chunks]
    assert any("Fundamental Digital Logic" in h for h in headings)
    assert any("Combinational Circuits" in h for h in headings)

    # Verify chunk structure
    for c in chunks:
        assert "content" in c
        assert "tokens" in c
        assert "language" in c
        assert c["tokens"] > 0
