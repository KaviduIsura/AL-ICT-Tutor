import json
import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_ask_endpoint_stream(async_client: AsyncClient):
    """Verify that POST /ask returns a valid SSE event stream with metadata and tokens."""
    payload = {
        "question": "What is the function of the ALU in a computer?",
        "scope": "all",
        "mode": "ask",
        "language": "en",
    }

    response = await async_client.post("/ask", json=payload)
    assert response.status_code == 200
    assert "text/event-stream" in response.headers["content-type"]

    # Parse SSE stream chunks
    lines = response.text.split("\n")
    events = [line for line in lines if line.startswith("event:")]
    data_lines = [line for line in lines if line.startswith("data:")]

    assert len(events) >= 3
    assert any("metadata" in e for e in events)
    assert any("token" in e for e in events)
    assert any("done" in e for e in events)

    # Validate metadata JSON
    meta_line = next(d for i, d in enumerate(data_lines) if "metadata" in events[i])
    meta_json = json.loads(meta_line.replace("data: ", ""))
    assert "interaction_id" in meta_json
    assert "confidence" in meta_json
    assert "prompt_version" in meta_json
    assert meta_json["language"] == "en"


@pytest.mark.asyncio
async def test_ask_with_unit_scope_and_sinhala(async_client: AsyncClient):
    """Verify unit-scoped query in Sinhala language."""
    payload = {
        "question": "පරිගණකයක මතක ධුරාවලිය යනු කුමක්ද?",
        "scope": "unit",
        "unit_id": 2,
        "mode": "ask",
        "language": "si",
    }

    response = await async_client.post("/ask", json=payload)
    assert response.status_code == 200

    lines = response.text.split("\n")
    meta_line = next(l for l in lines if l.startswith("data: ") and "interaction_id" in l)
    meta_json = json.loads(meta_line.replace("data: ", ""))

    assert meta_json["language"] == "si"
    assert "interaction_id" in meta_json


@pytest.mark.asyncio
async def test_ask_validation_error(async_client: AsyncClient):
    """Verify short or invalid queries are rejected with 422 Unprocessable Entity."""
    response = await async_client.post("/ask", json={"question": "a"})
    assert response.status_code == 422
