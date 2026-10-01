from typing import Any, Dict, List, Optional, Union
import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import BaseModel, Field

from app.core.config import get_settings
from app.core.logging import logger

security_scheme = HTTPBearer(auto_error=False)


class AuthenticatedUser(BaseModel):
    """User representation extracted and verified from Supabase JWT token."""

    id: str = Field(..., description="Supabase auth UUID")
    email: Optional[str] = None
    role: str = Field(default="student", description="Role: student | teacher | admin")
    metadata: Dict[str, Any] = Field(default_factory=dict)


def decode_supabase_jwt(token: str) -> Dict[str, Any]:
    """Decode and verify Supabase JWT token using configured secret."""
    settings = get_settings()

    try:
        # Supabase default signs tokens with HS256 and aud='authenticated'
        payload = jwt.decode(
            token,
            settings.SUPABASE_JWT_SECRET,
            algorithms=["HS256"],
            options={"verify_aud": False},
        )
        return payload
    except jwt.ExpiredSignatureError:
        logger.warning("Token signature has expired")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired. Please sign in again.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except jwt.PyJWTError as exc:
        logger.warning("JWT validation failed: %s", str(exc))
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials.",
            headers={"WWW-Authenticate": "Bearer"},
        )


async def get_current_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security_scheme),
) -> AuthenticatedUser:
    """Dependency that extracts and validates the authenticated user from the Bearer token."""
    if not credentials or not credentials.credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication token required.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    payload = decode_supabase_jwt(credentials.credentials)

    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token payload missing user identifier.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Role resolution: app_metadata.role -> user_metadata.role -> payload.role -> 'student'
    app_meta = payload.get("app_metadata", {})
    user_meta = payload.get("user_metadata", {})
    role = (
        app_meta.get("role")
        or user_meta.get("role")
        or payload.get("role")
        or "student"
    )

    # In Supabase, default auth role is 'authenticated' - map to 'student' if not application role
    if role not in ("student", "teacher", "admin"):
        role = "student"

    return AuthenticatedUser(
        id=user_id,
        email=payload.get("email"),
        role=role,
        metadata={**user_meta, **app_meta},
    )


def require_role(allowed_roles: Union[str, List[str]]):
    """Factory creating a role-enforcing dependency."""
    if isinstance(allowed_roles, str):
        roles_set = {allowed_roles}
    else:
        roles_set = set(allowed_roles)

    # Admin is inherently permitted for teacher/student actions unless strictly restricted
    if "admin" not in roles_set:
        roles_set.add("admin")

    async def role_checker(
        current_user: AuthenticatedUser = Depends(get_current_user),
    ) -> AuthenticatedUser:
        if current_user.role not in roles_set:
            logger.warning(
                "Access denied for user %s with role '%s'. Required roles: %s",
                current_user.id,
                current_user.role,
                roles_set,
            )
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Operation not permitted. Required role: {', '.join(sorted(roles_set))}",
            )
        return current_user

    return role_checker


# Convenient pre-defined dependencies
require_student = require_role(["student", "teacher", "admin"])
require_teacher = require_role(["teacher", "admin"])
require_admin = require_role(["admin"])
