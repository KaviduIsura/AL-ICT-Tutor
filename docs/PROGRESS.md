# Project Implementation Progress

This document tracks progress against the **10 Phases** outlined in `docs/SPEC.md` (Section 16.3 and Section 17).

---

## Current Status: Phase 1 (Foundation) — Completed 🟢

| Phase | Description | Status | Completed Date | Notes |
| :---: | :--- | :---: | :---: | :--- |
| **0** | **Step 16.1 Setup**: Monorepo directories, `docs/SPEC.md`, Agent rules, Supabase Schema | 🟢 Completed | 2026-10-01 | Monorepo structured, rules active, schema & seed data ready |
| **1** | **Foundation**: FastAPI structure, config, async DB session, health check, Supabase JWT auth, role dependency, pytest | 🟢 Completed | 2026-10-01 | FastAPI app, CORS, security, asyncpg, 6/6 tests passing |
| **2** | **Data & Ingestion**: PDF text extraction, Sinhala cleaning, chunking (300–500 tokens), BGE-M3 embeddings, `scripts/ingest.py` | ⚪ Next Up | — | Section 8.6 |
| **3** | **Retrieval & Ask Mode**: Vector search with unit filter, reranking, confidence check, `POST /ask` with SSE streaming | ⚪ Pending | — | Section 8.2 & 10.4 |
| **4** | **React Foundation & Chat**: Vite + React + TS, Tailwind, i18n (si/en), Dashboard unit cards, Chat with Scope & Mode toggles, FeedbackButtons | ⚪ Pending | — | Section 12 |
| **5** | **Discuss Mode**: Step-by-step teaching dialog, conversation history, `lesson_progress`, check questions, hint system, end-of-discussion quiz | ⚪ Pending | — | Section 3.4 & 8.3 |
| **6** | **Quiz Engine**: MCQ generation, bank drawing, `/quiz` & `/submit`, auto-marking, mistake notebook, mastery EMA, structured & essay marking | ⚪ Pending | — | Section 3.5 & 8.4 |
| **7** | **Teacher Tools**: Document upload with ingestion status, question review queue, mark override, classes, assignments, analytics | ⚪ Pending | — | Section 3.10 |
| **8** | **Progress & Revision**: Weak-topic tracker, mistake quiz, glossary, SM-2 flashcards, study planner | ⚪ Pending | — | Section 3.7 & 3.8 |
| **9** | **Feedback & Reward System**: Reward computation formula, prompt versioning with Thompson sampling bandit, chunk quality scoring | ⚪ Pending | — | Section 11 |
| **10** | **Evaluation, Polish & Deploy**: Evaluation benchmarks (`Recall@5`, MRR, test set), rate limits, Dockerfile, CI/CD | ⚪ Pending | — | Section 14 & 15 |

---

## Log of Completed Work

### Step 16.1: Setup (Completed)
- [x] Monorepo directories created: [frontend/](file:///d:/AL%20ICT%20Tutor/frontend/), [backend/](file:///d:/AL%20ICT%20Tutor/backend/), [docs/](file:///d:/AL%20ICT%20Tutor/docs/), [supabase/migrations/](file:///d:/AL%20ICT%20Tutor/supabase/migrations/), [scripts/](file:///d:/AL%20ICT%20Tutor/scripts/)
- [x] Specification saved as [docs/SPEC.md](file:///d:/AL%20ICT%20Tutor/docs/SPEC.md) from `Sinhala-ICT-AI-Tutor-Spec.pdf`
- [x] Agent rules configured in [GEMINI.md](file:///d:/AL%20ICT%20Tutor/GEMINI.md) and [.agents/rules/project_rules.md](file:///d:/AL%20ICT%20Tutor/.agents/rules/project_rules.md)
- [x] Supabase schema migration and seed data created in [supabase/schema.sql](file:///d:/AL%20ICT%20Tutor/supabase/schema.sql) and [supabase/migrations/20260330000000_initial_schema.sql](file:///d:/AL%20ICT%20Tutor/supabase/migrations/20260330000000_initial_schema.sql)
- [x] Environment variable templates created in [.env.example](file:///d:/AL%20ICT%20Tutor/.env.example) and [backend/.env.example](file:///d:/AL%20ICT%20Tutor/backend/.env.example)
- [x] Created root [.gitignore](file:///d:/AL%20ICT%20Tutor/.gitignore) covering environment secrets, Python caches, Node modules, build artifacts, and IDE configs

### Phase 1: Foundation (Completed)
- [x] FastAPI project structure created matching Section 10.1:
  - [app/main.py](file:///d:/AL%20ICT%20Tutor/backend/app/main.py): Application creation, CORS middleware, lifespan events, health check (`GET /health`), protected identity routes
  - [app/core/config.py](file:///d:/AL%20ICT%20Tutor/backend/app/core/config.py): Environment configuration with `pydantic-settings`
  - [app/core/logging.py](file:///d:/AL%20ICT%20Tutor/backend/app/core/logging.py): Structured console logger
  - [app/core/security.py](file:///d:/AL%20ICT%20Tutor/backend/app/core/security.py): Supabase JWT verification (`HTTPBearer`), role extraction, and `require_role(...)` dependencies (`require_student`, `require_teacher`, `require_admin`)
  - [app/db/session.py](file:///d:/AL%20ICT%20Tutor/backend/app/db/session.py): SQLAlchemy 2 async engine & sessionmaker with `asyncpg`, `get_db` generator
  - [app/db/models.py](file:///d:/AL%20ICT%20Tutor/backend/app/db/models.py): Core SQLAlchemy models (`Profile`, `Unit`, `Lesson`, `PromptVersion`)
  - [Dockerfile](file:///d:/AL%20ICT%20Tutor/backend/Dockerfile): Container configuration
- [x] Automated test suite in [tests/](file:///d:/AL%20ICT%20Tutor/backend/tests/) (`pytest` + `pytest-asyncio`):
  - [tests/conftest.py](file:///d:/AL%20ICT%20Tutor/backend/tests/conftest.py): Async HTTP test client fixture and JWT generator fixture
  - [tests/test_health.py](file:///d:/AL%20ICT%20Tutor/backend/tests/test_health.py): Health endpoint verification
  - [tests/test_security.py](file:///d:/AL%20ICT%20Tutor/backend/tests/test_security.py): JWT decoding and role-based access control tests
  - **Test result:** 6/6 tests passed in 0.05s
