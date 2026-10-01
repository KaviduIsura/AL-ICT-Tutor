r"""
Helper script to generate signed test JWT tokens for manual testing in Swagger UI.
Usage:
  backend\.venv\Scripts\python scripts/create_test_token.py --role student
  backend\.venv\Scripts\python scripts/create_test_token.py --role teacher
  backend\.venv\Scripts\python scripts/create_test_token.py --role admin
"""

import argparse
import sys
import time
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

try:
    import jwt
except ImportError:
    print("Please run with the virtualenv: backend\\.venv\\Scripts\\python scripts/create_test_token.py")
    sys.exit(1)

from app.core.config import get_settings


def generate_token(role: str = "student", email: str = None) -> str:
    settings = get_settings()

    if not email:
        email = f"{role}@al-ict-tutor.test"

    payload = {
        "sub": f"test-{role}-user-id-12345",
        "email": email,
        "role": role,
        "app_metadata": {"role": role},
        "user_metadata": {
            "role": role,
            "full_name": f"Test {role.capitalize()}",
            "preferred_language": "si",
        },
        "exp": int(time.time()) + (3600 * 24),  # Valid for 24 hours
        "iat": int(time.time()),
    }

    token = jwt.encode(payload, settings.SUPABASE_JWT_SECRET, algorithm="HS256")
    return token


def main():
    parser = argparse.ArgumentParser(description="Generate a test JWT token for Swagger UI.")
    parser.add_argument(
        "--role",
        "-r",
        choices=["student", "teacher", "admin"],
        default="student",
        help="Role for the token (default: student)",
    )
    args = parser.parse_args()

    token = generate_token(role=args.role)
    print("=" * 70)
    print(f"Generated JWT Token for Role: {args.role.upper()}")
    print("=" * 70)
    print(token)
    print("=" * 70)
    print("Copy the token above and paste it into Swagger UI (Authorize button).")


if __name__ == "__main__":
    main()
