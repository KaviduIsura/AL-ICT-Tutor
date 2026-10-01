import uuid
from datetime import datetime
from typing import Optional
from pgvector.sqlalchemy import Vector
from sqlalchemy import (
    Boolean,
    CheckConstraint,
    Column,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
)
from sqlalchemy.dialects.postgresql import ARRAY, JSONB, UUID
from sqlalchemy.orm import relationship

from app.db.session import Base


class Profile(Base):
    __tablename__ = "profiles"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    full_name = Column(Text, nullable=True)
    role = Column(
        String,
        CheckConstraint("role in ('student', 'teacher', 'admin')"),
        default="student",
        nullable=False,
    )
    grade = Column(Integer, nullable=True)
    preferred_language = Column(String, default="si", nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)


class Unit(Base):
    __tablename__ = "units"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name_si = Column(Text, nullable=False)
    name_en = Column(Text, nullable=False)
    position = Column(Integer, nullable=False)

    lessons = relationship("Lesson", back_populates="unit", cascade="all, delete-orphan")
    chunks = relationship("Chunk", back_populates="unit")


class Lesson(Base):
    __tablename__ = "lessons"

    id = Column(Integer, primary_key=True, autoincrement=True)
    unit_id = Column(Integer, ForeignKey("units.id", ondelete="CASCADE"), nullable=False)
    name_si = Column(Text, nullable=False)
    name_en = Column(Text, nullable=False)
    position = Column(Integer, nullable=False)

    unit = relationship("Unit", back_populates="lessons")
    chunks = relationship("Chunk", back_populates="lesson")


class Document(Base):
    __tablename__ = "documents"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(Text, nullable=True)
    source_type = Column(Text, default="notes", nullable=True)  # syllabus | notes | past_paper | teacher_guide
    year = Column(Integer, nullable=True)
    storage_path = Column(Text, nullable=True)
    status = Column(Text, default="pending", nullable=False)  # pending | processing | ready | failed
    uploaded_by = Column(UUID(as_uuid=True), ForeignKey("profiles.id"), nullable=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    chunks = relationship("Chunk", back_populates="document", cascade="all, delete-orphan")


class Chunk(Base):
    __tablename__ = "chunks"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    document_id = Column(UUID(as_uuid=True), ForeignKey("documents.id", ondelete="CASCADE"), nullable=False)
    unit_id = Column(Integer, ForeignKey("units.id"), nullable=True)
    lesson_id = Column(Integer, ForeignKey("lessons.id"), nullable=True)
    language = Column(Text, default="si", nullable=False)  # si | en | mixed
    content = Column(Text, nullable=False)
    embedding = Column(Vector(1024), nullable=True)
    quality_score = Column(Float, default=0.0, nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    document = relationship("Document", back_populates="chunks")
    unit = relationship("Unit", back_populates="chunks")
    lesson = relationship("Lesson", back_populates="chunks")


class PromptVersion(Base):
    __tablename__ = "prompt_versions"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(Text, nullable=False)
    mode = Column(Text, nullable=False)
    body = Column(Text, nullable=False)
    uses = Column(Integer, default=0, nullable=False)
    avg_reward = Column(Float, default=0.0, nullable=False)
    active = Column(Boolean, default=True, nullable=False)


class Interaction(Base):
    __tablename__ = "interactions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("profiles.id"), nullable=True)
    mode = Column(Text, default="ask", nullable=False)  # ask | discuss
    scope = Column(Text, default="all", nullable=False)  # unit | all
    unit_id = Column(Integer, ForeignKey("units.id"), nullable=True)
    question = Column(Text, nullable=False)
    chunk_ids = Column(ARRAY(UUID(as_uuid=True)), nullable=True)  # uuid[] in Postgres
    prompt_version_id = Column(Integer, ForeignKey("prompt_versions.id"), nullable=True)
    answer = Column(Text, nullable=True)
    confidence = Column(Float, nullable=True)
    latency_ms = Column(Integer, nullable=True)
    reward = Column(Float, nullable=True)
    review_status = Column(Text, default="none", nullable=False)  # none | approved | edited | rejected
    corrected_answer = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    prompt_version = relationship("PromptVersion")
    unit = relationship("Unit")
