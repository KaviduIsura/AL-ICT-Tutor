import asyncio
import json
from typing import AsyncGenerator, List, Optional
import httpx

from app.core.config import get_settings
from app.core.logging import logger

settings = get_settings()


class LLMService:
    """Service communicating with LLMs with Server-Sent Events (SSE) token streaming."""

    def __init__(self):
        self.api_key = settings.LLM_API_KEY
        self.model_name = settings.LLM_MODEL

    async def stream_chat(
        self,
        system_prompt: str,
        user_prompt: str,
        temperature: float = 0.2,
    ) -> AsyncGenerator[str, None]:
        """Stream response tokens from LLM or fallback simulator."""
        if not self.api_key or self.api_key.startswith("your-") or settings.ENVIRONMENT == "test":
            logger.info("Using simulated LLM streaming response (test/development mode).")
            async for token in self._simulate_stream(system_prompt, user_prompt):
                yield token
            return

        # Gemini API streaming via direct REST API
        if "gemini" in self.model_name.lower():
            async for token in self._stream_gemini(system_prompt, user_prompt, temperature):
                yield token
        else:
            # Fallback to standard OpenAI-compatible streaming
            async for token in self._stream_openai_compatible(system_prompt, user_prompt, temperature):
                yield token

    async def _stream_gemini(
        self,
        system_prompt: str,
        user_prompt: str,
        temperature: float,
    ) -> AsyncGenerator[str, None]:
        """Stream tokens using Google Gemini REST endpoint with Server-Sent Events."""
        url = (
            f"https://generativelanguage.googleapis.com/v1beta/models/{self.model_name}:streamGenerateContent"
            f"?alt=sse&key={self.api_key}"
        )

        payload = {
            "system_instruction": {"parts": [{"text": system_prompt}]},
            "contents": [{"role": "user", "parts": [{"text": user_prompt}]}],
            "generationConfig": {
                "temperature": temperature,
                "maxOutputTokens": 1024,
            },
        }

        try:
            async with httpx.AsyncClient(timeout=45.0) as client:
                async with client.stream("POST", url, json=payload) as response:
                    if response.status_code != 200:
                        err_text = await response.aread()
                        logger.error("Gemini API error (%d): %s", response.status_code, err_text.decode("utf-8", errors="ignore"))
                        yield f"\n[AI Service Error: HTTP {response.status_code}]"
                        return

                    async for line in response.aiter_lines():
                        if line.startswith("data: "):
                            raw_json = line[6:].strip()
                            try:
                                chunk_data = json.loads(raw_json)
                                candidates = chunk_data.get("candidates", [])
                                if candidates:
                                    parts = candidates[0].get("content", {}).get("parts", [])
                                    for part in parts:
                                        text = part.get("text", "")
                                        if text:
                                            yield text
                            except json.JSONDecodeError:
                                continue
        except Exception as exc:
            logger.error("Failed during Gemini streaming: %s", str(exc))
            yield f"\n[Network Error contacting LLM: {str(exc)}]"

    async def _stream_openai_compatible(
        self,
        system_prompt: str,
        user_prompt: str,
        temperature: float,
    ) -> AsyncGenerator[str, None]:
        """Stream tokens using standard OpenAI-compatible chat completions endpoint."""
        url = "https://api.openai.com/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }
        payload = {
            "model": self.model_name,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            "temperature": temperature,
            "stream": True,
        }

        async with httpx.AsyncClient(timeout=45.0) as client:
            async with client.stream("POST", url, headers=headers, json=payload) as response:
                async for line in response.aiter_lines():
                    if line.startswith("data: ") and line != "data: [DONE]":
                        try:
                            data = json.loads(line[6:])
                            delta = data["choices"][0]["delta"].get("content", "")
                            if delta:
                                yield delta
                        except Exception:
                            continue

    async def _simulate_stream(
        self,
        system_prompt: str,
        user_prompt: str,
    ) -> AsyncGenerator[str, None]:
        """Deterministic streaming simulator for tests and offline development."""
        if "[No relevant syllabus material was found" in user_prompt:
            simulated_text = (
                "මෙම ප්‍රශ්නයට අදාළ තොරතුරු ඔබ තෝරාගත් විෂය නිර්දේශ සටහන් තුළ සොයාගත නොහැකි විය. "
                "(The answer to this question was not found in the selected syllabus material). "
                "කරුණාකර වෙනත් පාඩමක් හෝ සම්පූර්ණ විෂය නිර්දේශය (Whole Syllabus) තෝරා නැවත උත්සාහ කරන්න."
            )
        else:
            simulated_text = (
                "විෂය නිර්දේශයේ සඳහන් කරුණු අනුව [Unit 1]: පරිගණකයක මූලික ගෘහ නිර්මාණ ශිල්පය "
                "සැකසී ඇත්තේ මධ්‍ය සැකසුම් ඒකකය (CPU), ප්‍රධාන මතකය (Main Memory), සහ ආදාන/ප්‍රතිදාන "
                "උපාංග (I/O Devices) මගිනි. CPU තුළ ගණිතමය හා තාර්කික ඒකකය (ALU) මඟින් ගණනය කිරීම් සිදු කරයි."
            )

        # Yield in realistic token-sized words
        words = simulated_text.split(" ")
        for i, word in enumerate(words):
            separator = " " if i < len(words) - 1 else ""
            yield word + separator
            await asyncio.sleep(0.01)


llm_service = LLMService()
