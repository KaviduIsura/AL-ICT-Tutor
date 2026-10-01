"""
Script to apply Supabase schema directly to your remote Supabase Postgres database.
Reads DATABASE_URL from .env or backend/.env and executes supabase/schema.sql.
"""

import argparse
import asyncio
import os
import sys
from pathlib import Path
from dotenv import load_dotenv

# Ensure UTF-8 output in Windows PowerShell / Command Prompt
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8")

# Try loading .env from current directory or backend/.env
load_dotenv(".env")
load_dotenv("backend/.env")


def get_clean_pg_url(db_url: str) -> str:
    """Normalize DATABASE_URL for asyncpg connection."""
    if db_url.startswith("postgresql+asyncpg://"):
        return db_url.replace("postgresql+asyncpg://", "postgresql://", 1)
    if db_url.startswith("postgres://"):
        return db_url.replace("postgres://", "postgresql://", 1)
    return db_url


async def run_migration(sql_file: Path, db_url: str):
    try:
        import asyncpg
    except ImportError:
        print("[ERROR] 'asyncpg' is not installed.")
        print("Run using the virtual environment:")
        print("  backend\\.venv\\Scripts\\python scripts/push_db.py")
        sys.exit(1)

    if not sql_file.exists():
        print(f"[ERROR] Schema file not found at: {sql_file}")
        sys.exit(1)

    clean_url = get_clean_pg_url(db_url)

    # Mask password for display
    masked_url = clean_url
    if "@" in clean_url and "://" in clean_url:
        protocol_user, host_part = clean_url.split("@", 1)
        if ":" in protocol_user:
            prefix, _ = protocol_user.rsplit(":", 1)
            masked_url = f"{prefix}:****@{host_part}"

    print("[INFO] Connecting to Supabase Postgres database...")
    print(f"       Target: {masked_url}")

    try:
        conn = await asyncpg.connect(clean_url, timeout=30)
    except Exception as e:
        print(f"[ERROR] Failed to connect to database: {e}")
        print("\nTroubleshooting tips:")
        print("1. Check your database password in DATABASE_URL in .env")
        print("2. Ensure your Supabase project is active (not paused)")
        print("3. In Supabase Dashboard -> Project Settings -> Database:")
        print("   Make sure you use the connection pooler or direct connection string")
        sys.exit(1)

    try:
        print(f"[INFO] Reading SQL script from: {sql_file}")
        sql_content = sql_file.read_text(encoding="utf-8")

        print("[INFO] Executing schema statements on Supabase...")
        await conn.execute(sql_content)
        print("[SUCCESS] Database schema and initial seed data applied successfully!")
    except Exception as e:
        print(f"[ERROR] Error executing SQL script: {e}")
        sys.exit(1)
    finally:
        await conn.close()


def main():
    parser = argparse.ArgumentParser(description="Push schema directly to Supabase Postgres database.")
    parser.add_argument(
        "--file",
        "-f",
        default="supabase/schema.sql",
        help="Path to SQL schema file (default: supabase/schema.sql)",
    )
    parser.add_argument(
        "--url",
        "-u",
        default=os.getenv("DATABASE_URL"),
        help="Database connection URL (defaults to DATABASE_URL in .env)",
    )

    args = parser.parse_args()

    if not args.url or "your_password" in args.url or "xxxxxxxx" in args.url:
        print("[WARNING] DATABASE_URL is missing or contains placeholder values!")
        print("Please configure your real Supabase connection string in your .env file:")
        print("  DATABASE_URL=postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres")
        print("\nOr pass it directly as a parameter:")
        print('  backend\\.venv\\Scripts\\python scripts/push_db.py --url "postgresql://postgres:password@db.xxx.supabase.co:5432/postgres"')
        sys.exit(1)

    schema_path = Path(args.file)
    asyncio.run(run_migration(schema_path, args.url))


if __name__ == "__main__":
    main()
