from contextlib import asynccontextmanager
from typing import AsyncGenerator
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import get_settings
from app.core.logging import logger, setup_logging
from app.core.security import AuthenticatedUser, get_current_user, require_admin, require_teacher

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """Application lifespan manager for startup and shutdown events."""
    setup_logging(settings.LOG_LEVEL)
    logger.info("Starting %s in %s mode", settings.PROJECT_NAME, settings.ENVIRONMENT)
    yield
    logger.info("Shutting down %s", settings.PROJECT_NAME)


app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

# Configure Cross-Origin Resource Sharing (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", tags=["Health"])
async def health_check():
    """Health check endpoint to verify backend service liveness."""
    return {
        "status": "ok",
        "project": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "environment": settings.ENVIRONMENT,
    }


@app.get("/api/v1/me", tags=["Auth"])
async def get_my_profile(current_user: AuthenticatedUser = Depends(get_current_user)):
    """Return currently authenticated user and verified role claims."""
    return {
        "id": current_user.id,
        "email": current_user.email,
        "role": current_user.role,
        "metadata": current_user.metadata,
    }


@app.get("/api/v1/teacher-only", tags=["Auth"])
async def teacher_only_endpoint(
    current_user: AuthenticatedUser = Depends(require_teacher),
):
    """Protected endpoint restricted to teachers and administrators."""
    return {"message": "Welcome, teacher or admin!", "user_id": current_user.id}


@app.get("/api/v1/admin-only", tags=["Auth"])
async def admin_only_endpoint(
    current_user: AuthenticatedUser = Depends(require_admin),
):
    """Protected endpoint strictly restricted to administrators."""
    return {"message": "Welcome, administrator!", "user_id": current_user.id}
