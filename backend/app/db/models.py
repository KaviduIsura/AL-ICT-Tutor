import uuid
from datetime import datetime
from typing import Optional
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
from sqlalchemy.dialects.postgresql import JSONB, UUID
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


class Lesson(Base):
    __tablename__ = "lessons"

    id = Column(Integer, primary_key=True, autoincrement=True)
    unit_id = Column(Integer, ForeignKey("units.id", ondelete="CASCADE"), nullable=False)
    name_si = Column(Text, nullable=False)
    name_en = Column(Text, nullable=False)
    position = Column(Integer, nullable=False)

    unit = relationship("Unit", back_populates="lessons")


class PromptVersion(Base):
    __tablename__ = "prompt_versions"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(Text, nullable=False)
    mode = Column(Text, nullable=False)
    body = Column(Text, nullable=False)
    uses = Column(Integer, default=0, nullable=False)
    avg_reward = Column(Float, default=0.0, nullable=False)
    active = Column(Boolean, default=True, nullable=False)
