from functools import lru_cache
from typing import List
from pydantic import computed_field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application runtime settings loaded from environment or .env file."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    PROJECT_NAME: str = "Sinhala A/L ICT AI Tutor API"
    VERSION: str = "0.1.0"
    ENVIRONMENT: str = "development"
    LOG_LEVEL: str = "INFO"
    BACKEND_PORT: int = 8000

    # CORS origins
    FRONTEND_ORIGIN: str = "http://localhost:5173"

    # Supabase Configuration
    SUPABASE_URL: str = ""
    SUPABASE_ANON_KEY: str = ""
    SUPABASE_SERVICE_ROLE_KEY: str = ""
    SUPABASE_JWT_SECRET: str = "super-secret-jwt-token-change-in-production"

    # Database Configuration (PostgreSQL with asyncpg)
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/postgres"

    # LLM & Embedding Settings
    LLM_API_KEY: str = ""
    LLM_MODEL: str = "gemini-1.5-flash"
    EMBEDDING_MODEL: str = "bge-m3"

    @computed_field
    def cors_origins(self) -> List[str]:
        origins = [self.FRONTEND_ORIGIN.strip()]
        if self.ENVIRONMENT == "development":
            origins.extend([
                "http://localhost:3000",
                "http://127.0.0.1:5173",
                "http://127.0.0.1:3000",
            ])
        return list(set(origins))


@lru_cache()
def get_settings() -> Settings:
    """Return cached application settings singleton."""
    return Settings()
