import re
import unicodedata


def clean_sinhala_text(text: str) -> str:
    """Normalize and clean Sinhala and English text extracted from PDFs or OCR."""
    if not text:
        return ""

    # Normalize Unicode to NFC canonical composition
    text = unicodedata.normalize("NFC", text)

    # Normalize various non-standard space characters to standard ASCII space
    text = re.sub(r"[\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]", " ", text)

    # Remove zero-width spaces / byte order marks, but keep ZWJ (\u200D) which is vital for Sinhala touching/conjunct letters
    text = text.replace("\uFEFF", "").replace("\u200B", "").replace("\u200C", "")

    # Replace literal tab characters with space
    text = text.replace("\t", " ")

    # Normalize carriage returns
    text = text.replace("\r\n", "\n").replace("\r", "\n")

    # Replace 3 or more spaces on a line with a single space
    text = re.sub(r"[ ]{2,}", " ", text)

    # Replace 3 or more newlines with double newline (paragraph break)
    text = re.sub(r"\n{3,}", "\n\n", text)

    # Strip leading and trailing whitespace
    return text.strip()


def estimate_token_count(text: str) -> int:
    """Estimate token count for mixed Sinhala/English text.
    
    Sinhala script uses complex conjuncts and diacritics, resulting in 
    approximately 2.0 to 2.5 characters per token in BGE-M3 / multilingual tokenizers.
    English averages around 3.5 to 4.0 characters per token.
    """
    if not text:
        return 0

    sinhala_chars = len(re.findall(r"[\u0D80-\u0DFF]", text))
    other_chars = len(text) - sinhala_chars

    # Weighted estimate based on script density
    estimated = int((sinhala_chars / 2.2) + (other_chars / 3.8))
    return max(1, estimated)
