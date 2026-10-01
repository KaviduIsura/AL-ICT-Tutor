---
trigger: always_on
description: Core project rules and architectural constraints for Sinhala A/L ICT AI Tutor
---

# Sinhala A/L ICT AI Tutor — Agent Rules

- **Read `docs/SPEC.md` before any task.** Treat `docs/SPEC.md` as the single source of truth. Reference specific sections in prompts and explanations.
- **Backend:** FastAPI + Pydantic v2 + async SQLAlchemy 2 + asyncpg.
- **Frontend:** React + Vite + TypeScript + Tailwind CSS.
- **Never put secrets in code.** Use environment variables for all API keys, database credentials, and secrets.
- **All LLM calls happen in the backend.** Frontend only interacts with backend API endpoints.
- **Write tests for new backend services.** Keep functions small, modular, typed, and well-documented.
- **Do one phase at a time.** Stop and summarise after each phase. Keep `docs/PROGRESS.md` up to date.
