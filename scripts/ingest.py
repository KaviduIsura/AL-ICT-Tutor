r"""
CLI Ingestion Script for Sinhala A/L ICT AI Tutor
Specification Reference: Section 8.6, Section 10.1, Section 16.3

Usage:
  backend\.venv\Scripts\python scripts/ingest.py sample.pdf --unit 1 --lesson 1
  backend\.venv\Scripts\python scripts/ingest.py syllabus.pdf --unit 2 --source-type syllabus --dry-run
"""

import argparse
import asyncio
import os
import sys
from pathlib import Path
from dotenv import load_dotenv

# Ensure UTF-8 output on Windows
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

# Add backend directory to sys.path
backend_dir = Path(__file__).resolve().parent.parent / "backend"
sys.path.insert(0, str(backend_dir))

load_dotenv(".env")
load_dotenv("backend/.env")

from app.core.logging import setup_logging
from app.db.session import AsyncSessionLocal
from app.services.ingestion import ingestion_service


async def run_cli_ingest(
    pdf_path: str,
    unit_id: int,
    lesson_id: int = None,
    title: str = None,
    source_type: str = "notes",
    year: int = None,
    dry_run: bool = False,
):
    setup_logging("INFO")
    pdf_file = Path(pdf_path)

    if not pdf_file.exists():
        print(f"Error: File not found at '{pdf_path}'")
        sys.exit(1)

    print("=" * 70)
    print(f"Ingesting Document: {pdf_file.name}")
    print(f"Unit ID: {unit_id} | Lesson ID: {lesson_id or 'All'} | Type: {source_type}")
    print(f"Mode: {'DRY RUN (no database writes)' if dry_run else 'LIVE DATABASE INGESTION'}")
    print("=" * 70)

    if dry_run:
        result = await ingestion_service.ingest_document(
            pdf_path=pdf_file,
            unit_id=unit_id,
            lesson_id=lesson_id,
            title=title,
            source_type=source_type,
            year=year,
            db_session=None,
        )
    else:
        async with AsyncSessionLocal() as session:
            result = await ingestion_service.ingest_document(
                pdf_path=pdf_file,
                unit_id=unit_id,
                lesson_id=lesson_id,
                title=title,
                source_type=source_type,
                year=year,
                db_session=session,
            )

    print("\nIngestion Summary:")
    print(f"  - Document ID:   {result['document_id']}")
    print(f"  - Title:         {result['title']}")
    print(f"  - Pages Parsed:  {result['pages']}")
    print(f"  - Chunks Created:{result['chunks_count']}")
    print(f"  - Total Tokens:  {result['total_tokens']} (avg {result['total_tokens'] // max(1, result['chunks_count'])} per chunk)")
    print(f"  - Languages:     {result['languages']}")

    print("\nSample Generated Chunk (First 1-2 chunks):")
    for i, chunk in enumerate(result["chunks"][:2]):
        print(f"\n--- [Chunk #{i+1} | Heading: '{chunk['heading']}' | Language: {chunk['language']} | Tokens: ~{chunk['tokens']}] ---")
        preview = chunk["content"][:300].replace("\n", " ")
        print(f"{preview}...")

    print("\n" + "=" * 70)
    print("Ingestion completed successfully!")


def main():
    parser = argparse.ArgumentParser(
        description="Ingest A/L ICT PDF notes, syllabus, or past papers into vector chunks."
    )
    parser.add_argument("pdf", help="Path to the PDF file to ingest")
    parser.add_argument("--unit", "-u", type=int, required=True, help="Unit number/ID (e.g. 1 to 14)")
    parser.add_argument("--lesson", "-l", type=int, default=None, help="Lesson ID (optional)")
    parser.add_argument("--title", "-t", type=str, default=None, help="Document title (defaults to filename)")
    parser.add_argument(
        "--source-type",
        "-s",
        choices=["syllabus", "notes", "past_paper", "teacher_guide"],
        default="notes",
        help="Source material type",
    )
    parser.add_argument("--year", "-y", type=int, default=None, help="Year of publication/paper")
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Extract, clean, and chunk without saving to the database",
    )

    args = parser.parse_args()

    asyncio.run(
        run_cli_ingest(
            pdf_path=args.pdf,
            unit_id=args.unit,
            lesson_id=args.lesson,
            title=args.title,
            source_type=args.source_type,
            year=args.year,
            dry_run=args.dry_run,
        )
    )


if __name__ == "__main__":
    main()
