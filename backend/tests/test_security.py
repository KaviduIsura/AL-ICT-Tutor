import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_unauthorized_access(async_client: AsyncClient):
    """Endpoints requiring authentication should return 401 Unauthorized without a token."""
    response = await async_client.get("/api/v1/me")
    assert response.status_code == 401
    assert "token required" in response.json()["detail"].lower()


@pytest.mark.asyncio
async def test_student_authenticated_me(async_client: AsyncClient, create_test_token):
    """Students should be able to view their own verified identity."""
    token = create_test_token(user_id="user-stu-1", role="student")
    response = await async_client.get(
        "/api/v1/me",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == "user-stu-1"
    assert data["role"] == "student"


@pytest.mark.asyncio
async def test_student_forbidden_teacher_endpoint(async_client: AsyncClient, create_test_token):
    """Students should receive 403 Forbidden on teacher endpoints."""
    token = create_test_token(user_id="user-stu-2", role="student")
    response = await async_client.get(
        "/api/v1/teacher-only",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 403
    assert "operation not permitted" in response.json()["detail"].lower()


@pytest.mark.asyncio
async def test_teacher_allowed_teacher_endpoint(async_client: AsyncClient, create_test_token):
    """Teachers should be allowed to access teacher endpoints."""
    token = create_test_token(user_id="user-teach-1", role="teacher")
    response = await async_client.get(
        "/api/v1/teacher-only",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 200
    assert response.json()["user_id"] == "user-teach-1"


@pytest.mark.asyncio
async def test_admin_full_access(async_client: AsyncClient, create_test_token):
    """Admins should have access to both teacher and admin endpoints."""
    token = create_test_token(user_id="user-admin-1", role="admin")

    # Access teacher route
    res_teacher = await async_client.get(
        "/api/v1/teacher-only",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert res_teacher.status_code == 200

    # Access admin route
    res_admin = await async_client.get(
        "/api/v1/admin-only",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert res_admin.status_code == 200
