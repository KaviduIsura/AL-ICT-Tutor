import re
from typing import Literal

LanguageCode = Literal["si", "en", "mixed"]


def detect_language(text: str) -> LanguageCode:
    """Detect whether text is predominantly Sinhala ('si'), English ('en'), or 'mixed'.
    
    A/L ICT materials frequently combine Sinhala explanations with English technical terms.
    """
    if not text or not text.strip():
        return "si"

    # Count Sinhala script Unicode points (\u0D80 to \u0DFF)
    sinhala_letters = len(re.findall(r"[\u0D80-\u0DFF]", text))
    # Count Latin/English alphabetic characters
    english_letters = len(re.findall(r"[a-zA-Z]", text))

    total_letters = sinhala_letters + english_letters

    if total_letters == 0:
        return "en"

    sinhala_ratio = sinhala_letters / total_letters

    if sinhala_ratio >= 0.80:
        return "si"
    elif sinhala_ratio <= 0.20:
        return "en"
    else:
        return "mixed"
