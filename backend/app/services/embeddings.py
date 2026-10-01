import hashlib
import math
from typing import List, Optional
from app.core.config import get_settings
from app.core.logging import logger

settings = get_settings()


class EmbeddingsService:
    """Service generating multilingual 1024-dimensional embeddings (BGE-M3 standard)."""

    def __init__(self, model_name: Optional[str] = None):
        self.model_name = model_name or settings.EMBEDDING_MODEL
        self.dimension = 1024
        self._model = None
        self._is_mock = False

        self._initialize_model()

    def _initialize_model(self) -> None:
        """Attempt to load sentence-transformers BGE-M3 model if installed; otherwise use deterministic fallback."""
        try:
            from sentence_transformers import SentenceTransformer
            logger.info("Loading embedding model '%s'...", self.model_name)
            self._model = SentenceTransformer(self.model_name)
            self._is_mock = False
            logger.info("Successfully loaded embedding model '%s'.", self.model_name)
        except (ImportError, Exception) as exc:
            logger.warning(
                "SentenceTransformer not available (%s). Using deterministic 1024-dim fallback embeddings.",
                str(exc),
            )
            self._is_mock = True

    def _generate_fallback_vector(self, text: str) -> List[float]:
        """Generate a deterministic, unit-normalized 1024-dimensional vector from text."""
        seed_bytes = hashlib.sha256(text.encode("utf-8")).digest()
        
        # Expand seed to 1024 floats
        raw_values = []
        for i in range(self.dimension):
            idx = (i * 7) % len(seed_bytes)
            val = ((seed_bytes[idx] ^ (i & 0xFF)) / 128.0) - 1.0
            raw_values.append(val)

        # Normalize to unit length (L2 norm) for cosine similarity
        norm = math.sqrt(sum(x * x for x in raw_values)) or 1.0
        return [round(x / norm, 6) for x in raw_values]

    def embed_text(self, text: str) -> List[float]:
        """Generate a single 1024-dimensional embedding for query or text."""
        if not text or not text.strip():
            return [0.0] * self.dimension

        if self._model and not self._is_mock:
            vector = self._model.encode(text, normalize_embeddings=True)
            return vector.tolist()

        return self._generate_fallback_vector(text)

    def embed_documents(self, texts: List[str]) -> List[List[float]]:
        """Generate 1024-dimensional embeddings for a batch of documents."""
        if not texts:
            return []

        if self._model and not self._is_mock:
            vectors = self._model.encode(texts, normalize_embeddings=True, show_progress_bar=False)
            return [v.tolist() for v in vectors]

        return [self._generate_fallback_vector(t) for t in texts]


# Default singleton instance
embeddings_service = EmbeddingsService()
