import time
from typing import AsyncGenerator
import jwt
import pytest
import pytest_asyncio
from httpx import ASGITransport, AsyncClient

from app.core.config import get_settings
from app.main import app

settings = get_settings()


@pytest_asyncio.fixture
async def async_client() -> AsyncGenerator[AsyncClient, None]:
    """Async test client using ASGI transport for testing endpoints without real HTTP server."""
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        yield client


@pytest.fixture
def create_test_token():
    """Factory fixture generating valid signed JWT tokens with specified roles."""
    def _generator(user_id: str, role: str = "student", email: str = "student@test.com") -> str:
        payload = {
            "sub": user_id,
            "email": email,
            "role": role,
            "app_metadata": {"role": role},
            "user_metadata": {"role": role, "full_name": f"Test {role.capitalize()}"},
            "exp": int(time.time()) + 3600,
        }
        return jwt.encode(payload, settings.SUPABASE_JWT_SECRET, algorithm="HS256")

    return _generator
