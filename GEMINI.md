# Agent Guidelines & Project Rules — Sinhala A/L ICT AI Tutor

You are pair programming on the **Sinhala A/L ICT AI Tutor** project. Follow these foundational rules across all tasks:

## Core Directives
1. **Always read `docs/SPEC.md` before any task:**  
   `docs/SPEC.md` is the single source of truth for architecture, functional requirements, schemas, API contracts, and roadmap phases. Always reference the relevant section when designing or implementing features.

2. **Technology Stack:**  
   - **Backend:** FastAPI + Pydantic v2 + async SQLAlchemy 2 + asyncpg (or Supabase Postgres with pgvector).
   - **Frontend:** React + Vite + TypeScript + Tailwind CSS + shadcn/ui + TanStack Query + Zustand.

3. **Security & Secrets:**  
   - **Never put secrets in code.** Use environment variables (`.env`) for all keys and URLs.
   - **All LLM calls happen in the backend.** Never expose API keys or make direct AI/LLM calls from the frontend client.

4. **Code Quality & Testing:**  
   - Write unit and integration tests (pytest for backend, Vitest for frontend) for new services and critical endpoints.
   - Keep functions small, modular, single-responsibility, and strictly typed.
   - Use Pydantic schemas to validate all inputs, outputs, and LLM JSON payloads.

5. **Phased Workflow:**  
   - Work **one phase at a time** (follow Section 16.3 and Section 17 of `docs/SPEC.md`).
   - Stop and summarise progress after each phase.
   - Maintain and update `docs/PROGRESS.md` after every milestone so context is never lost.
