# Project Implementation Progress

This document tracks progress against the **10 Phases** outlined in `docs/SPEC.md` (Section 16.3 and Section 17).

---

## Current Status: Phase 4 (Frontend UI & 3-Role Theming) — Completed 🟢

| Phase | Description | Status | Completed Date | Notes |
| :---: | :--- | :---: | :---: | :--- |
| **0** | **Step 16.1 Setup**: Monorepo directories, `docs/SPEC.md`, Agent rules, Supabase Schema | 🟢 Completed | 2026-10-01 | Monorepo structured, rules active, schema & seed data ready |
| **1** | **Foundation**: FastAPI structure, config, async DB session, health check, Supabase JWT auth, role dependency, pytest | 🟢 Completed | 2026-10-01 | FastAPI app, CORS, security, asyncpg, 6/6 tests passing |
| **2** | **Data & Ingestion**: PDF text extraction, Sinhala cleaning, chunking (300–500 tokens), BGE-M3 embeddings, `scripts/ingest.py` | 🟢 Completed | 2026-10-01 | Ingestion pipeline, heading chunker, 1024-dim embeddings, 11/11 tests passing |
| **3** | **Retrieval & Ask Mode**: Vector search with unit filter, reranking, confidence check, `POST /ask` with SSE streaming | 🟢 Completed | 2026-10-01 | Vector search SQL, confidence threshold, SSE streaming, interactions logging |
| **4** | **React Frontend & 3-Role UI**: Vite + React + TS, Tailwind v4, 3 Role Themes (Student Navy, Teacher Teal, Admin Rich Dark), All 18 Visily + Wireframe Screens | 🟢 Completed | 2026-10-01 | Full UI matching Visily & 37-page wireframes, SSE Ask client, Confetti, SRS flashcards |
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

### Phase 2: Data and Ingestion (Completed)
- [x] Ingestion pipeline and services matching Section 8.6 & Section 5.2:
  - [app/utils/text.py](file:///d:/AL%20ICT%20Tutor/backend/app/utils/text.py): Sinhala text cleaning, Unicode NFC normalization, ZWJ preservation for touching letters, and mixed script token estimator
  - [app/utils/language.py](file:///d:/AL%20ICT%20Tutor/backend/app/utils/language.py): Language classification (`'si'`, `'en'`, or `'mixed'`)
  - [app/services/embeddings.py](file:///d:/AL%20ICT%20Tutor/backend/app/services/embeddings.py): 1024-dimensional embedding service (BGE-M3 standard) with normalized vectors
  - [app/services/ingestion.py](file:///d:/AL%20ICT%20Tutor/backend/app/services/ingestion.py): Complete pipeline (`extract_text_from_pdf`, `chunk_by_headings` keeping headings attached within 300–500 tokens, `ingest_document`)
  - [app/db/models.py](file:///d:/AL%20ICT%20Tutor/backend/app/db/models.py): Added `Document` and `Chunk` (with `pgvector.sqlalchemy.Vector(1024)`) ORM models
- [x] CLI Ingestion Tool [scripts/ingest.py](file:///d:/AL%20ICT%20Tutor/scripts/ingest.py):
  - CLI arguments: `<pdf> --unit X [--lesson Y] [--title T] [--source-type S] [--year Y] [--dry-run]`
  - Validated with live dry-run on `Sinhala-ICT-AI-Tutor-Spec.pdf` (parsed 16 pages, 18 semantic chunks, 1024-dim embeddings generated)
- [x] Automated test suite in [tests/test_ingestion.py](file:///d:/AL%20ICT%20Tutor/backend/tests/test_ingestion.py):
  - Tests covering text cleaning, language detection, token estimation, vector normalization, and heading chunking
  - **Test result:** 11/11 tests passing in 0.50s

### Phase 3: Retrieval and Ask Mode (Completed)
- [x] Retrieval engine and streaming Ask pipeline matching Section 5.2, 8.2, 9, 10.3, & 10.4:
  - [app/schemas/ask.py](file:///d:/AL%20ICT%20Tutor/backend/app/schemas/ask.py): Pydantic models for `AskRequest`, `SourceChunk`, `AskMetadata`, and `AskResponse`
  - [app/services/retrieval.py](file:///d:/AL%20ICT%20Tutor/backend/app/services/retrieval.py): Cosine similarity search using pgvector (`ORDER BY embedding <=> query_vector`), metadata filtering by unit (`unit_id`) and lesson (`lesson_id`), confidence score calculation and low-confidence warning detection
  - [app/services/prompts.py](file:///d:/AL%20ICT%20Tutor/backend/app/services/prompts.py): Dynamic prompt loading by version (`ask_v1`), multilingual language formatting, and grounded context assembly with strict citations (`[Unit X – Lesson Y]`)
  - [app/services/llm.py](file:///d:/AL%20ICT%20Tutor/backend/app/services/llm.py): Asynchronous LLM streaming client supporting Google Gemini (SSE REST API), OpenAI-compatible APIs, and local testing simulator
  - [app/services/ask_service.py](file:///d:/AL%20ICT%20Tutor/backend/app/services/ask_service.py): Flow orchestrator (language detection, retrieval, prompt assembly, token streaming, and interaction logging in `public.interactions`)
  - [app/routers/ask.py](file:///d:/AL%20ICT%20Tutor/backend/app/routers/ask.py): `POST /ask` streaming endpoint returning Server-Sent Events (`text/event-stream`) with metadata, tokens, and done event
  - [app/db/models.py](file:///d:/AL%20ICT%20Tutor/backend/app/db/models.py): Added `Interaction` model with `ARRAY(UUID)` for `chunk_ids` matching Postgres schema
- [x] Automated test suite in [tests/test_ask.py](file:///d:/AL%20ICT%20Tutor/backend/tests/test_ask.py):
  - Tests validating `POST /ask` SSE stream format, metadata frame parsing, Sinhala unit-filtered query, and input validation
  - **Test result:** 14/14 tests passing

### Phase 4: React Frontend & 3-Role Adaptive UI — Option A (Strict 1:1 Visily Clone) Completed 🟢
- [x] Vite + React 19 + TypeScript + Tailwind CSS v4 setup with proxy to FastAPI backend (`http://localhost:8000`).
- [x] Google Fonts *Inter* & *Noto Sans Sinhala* configured for crisp typography across all screens.
- [x] Three Distinct Role Palettes configured via CSS Custom Properties and Zustand `data-theme`:
  - **Student Role:** Visily Deep Navy Blue (`#1E3A8A` / `#0D1B3E`), clean white cards, soft slate borders.
  - **Teacher Role:** Teal palette (`#0D9488` / `#062D2C`), crisp teal cards, dark teal sidebars.
  - **Admin Role:** Ultra-rich dark theme (`#090D16` / `#070A11`), glassmorphic cards, glowing indigo and emerald accents.
  - Live Role Switcher dropdown integrated into header allowing instant previewing across all roles.
- [x] All 18 Visily Screens (`page_01.png` - `page_18.png` in `frontend/ui design/rendered_visily/`) Cloned 1:1:
  1. **Landing Page (`/` - Visily Page 01):** Hero illustration, 4-step workflow, 4 value cards, audience cards, dark syllabus modules.
  2. **Login Page (`/login` - Visily Page 02):** Split layout with left brand banner, celebration trophy artwork, email/password form, demo role quick logins.
  3. **Register Page (`/register` - Visily Page 03):** Study group artwork, grade & medium selector, password confirmation, direct navigation.
  4. **Student Dashboard (`/app` - Visily Page 04):** Resume learning banner, 4 stat cards, Ask query bar, Unit cards, weak topics, and teacher assignments.
  5. **Unit Detail Page (`/units/:id` - Visily Page 05):** Unit 4 Database overview, 4 lesson accordion rows, summary drawer, key terms, and starter questions.
  6. **Forgot Password (`/forgot` - Visily Page 06):** 3-step recovery flow (Email verification -> PIN reset -> New password confirmation).
  7. **AI Tutor Chat (`/chat` - Visily Page 07):** Scope toggle (Unit vs Whole Syllabus), Mode toggle (Ask vs Discuss), bilingual language selector, citations chip bar, interactive check question, and live SSE streaming from FastAPI backend.
  8. **Quiz Setup (`/quiz/new` - Visily Page 08):** Scope radio pills, Unit checkboxes, question count steppers (MCQ, Structured, Essay), difficulty badges, exam mode toggle, and live total score calculator.
  9. **Quiz Runner (`/quiz/run` - Visily Page 09):** Real-time timer countdown, proctoring banner, question type columns, word counter, and question map (1–13) navigation bar.
  10. **Quiz Result (`/quiz/result` - Visily Page 10):** Score badge (32/45 - 71%), breakdown bars, unit mastery progress, AI rubric feedback, agree/disagree feedback pills, and Mistake Notebook notice.
  11. **Past Papers (`/past-papers` - Visily Page 11):** Year and unit filters, past papers list, grouped unit frequency trends bar chart, question repository table, Exam Strategy card, and Platform Guide.
  12. **Academic Progress (`/progress` - Visily Page 12):** 5x8 curriculum mastery heatmap, score over time line curve chart, accuracy by question type, weak topics table, 6-day streak card, and exam readiness goal.
  13. **Mistakes Notebook (`/mistakes` - Visily Page 13):** Revise quiz button, 4 stat cards, mistake cards with Your Answer vs Correct Answer comparison and explanation, and mark as revised action.
  14. **Flashcards Center (`/flashcards` - Visily Page 14):** Left decks list with due badges, 6-day streak card, mastery stats, Card 3/12 3D flip card with tags, flip button, and SM-2 SRS algorithm notice.
  15. **Bilingual Glossary (`/glossary` - Visily Page 15):** Search + Unit + A-Z filters, bilingual terminology table with `[ + Add to flashcards ]` toggle, Elements & Actions card, Mastery Insights card, and Study Tip dark card.
  16. **Study Planner (`/planner` - Visily Page 16):** Plan Setup with 64 days countdown, Priority Units list (High/Medium/Low risk badges), 7-day Mon-Sun interactive calendar schedule, and streak card.
  17. **Teacher Dashboard (`/teacher` - Visily Page 17):** Teal theme accents (`#0D9488`), 4 stat cards (Students, Classes, Pending Reviews, Flagged Answers), weak units bar chart, upcoming deadlines, recent activity feed, and quick action cards.
  18. **Teacher Content Upload & Ingestion (`/teacher/content` - Visily Page 18):** Drag & drop PDF upload dropzone, metadata selectors (Type, Year, Unit, Lesson), Ingestion Rules with OCR Quality Warning box, and document ingestion status table.
- [x] Wireframe Pages for Teacher & Admin (matching the exact design system and role themes):
  - Review Queue (`/teacher/review`), Mark Override (`/teacher/marks`), Class Analytics (`/teacher/analytics`), Class Roster (`/teacher/classes`).
  - Admin Console (`/admin`), User Directory (`/admin/users`), Curriculum RAG Manager (`/admin/curriculum`), Prompt Versions (`/admin/prompts`), Triad Quality Dashboard (`/admin/quality`), System Settings (`/admin/settings`), Audit Logs (`/admin/audit`).
  - Shared Pages: Settings (`/settings`), Help & FAQ (`/help`), Privacy (`/privacy`).
- [x] Automated Browser Verification: All 18 screens verified through browser subagent sessions with recordings and console audits confirmed clean.



