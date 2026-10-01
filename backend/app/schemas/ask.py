from typing import List, Literal, Optional
from pydantic import BaseModel, Field


class AskRequest(BaseModel):
    """Payload sent by student to query the AI tutor in Ask or Discuss mode."""

    question: str = Field(..., min_length=2, max_length=2000, description="Student's query in Sinhala, English, or mixed")
    scope: Literal["unit", "all"] = Field(default="all", description="Scope: 'unit' (filtered) or 'all' (whole syllabus)")
    unit_id: Optional[int] = Field(default=None, description="Target unit ID if scope is 'unit'")
    lesson_id: Optional[int] = Field(default=None, description="Optional target lesson ID")
    mode: Literal["ask", "discuss"] = Field(default="ask", description="Mode: 'ask' (quick cited) or 'discuss' (step-by-step)")
    language: Optional[Literal["si", "en", "mixed"]] = Field(
        default=None, description="Preferred language for answer ('si', 'en', 'mixed'). Auto-detected if omitted."
    )
    conversation_id: Optional[str] = Field(default=None, description="Conversation session ID for discuss history")


class SourceChunk(BaseModel):
    """Metadata for a retrieved syllabus chunk used to ground the tutor's answer."""

    id: str
    unit_id: Optional[int] = None
    lesson_id: Optional[int] = None
    similarity: float
    citation: str
    snippet: str


class AskMetadata(BaseModel):
    """Metadata emitted at the start of the streamed answer or in full responses."""

    interaction_id: str
    sources: List[SourceChunk]
    confidence: float
    confidence_warning: bool
    prompt_version: str
    language: str


class AskResponse(BaseModel):
    """Complete non-streaming response structure for testing or REST clients."""

    answer: str
    metadata: AskMetadata
