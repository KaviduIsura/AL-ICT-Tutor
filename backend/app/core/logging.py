import logging
import sys


def setup_logging(log_level: str = "INFO") -> None:
    """Configure root logger for structured, consistent console output."""
    level = getattr(logging, log_level.upper(), logging.INFO)
    logging.basicConfig(
        level=level,
        format="%(asctime)s | %(levelname)-7s | %(name)s:%(funcName)s:%(lineno)d - %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
        handlers=[logging.StreamHandler(sys.stdout)],
        force=True,
    )


logger = logging.getLogger("al_ict_tutor")
