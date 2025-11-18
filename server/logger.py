import logging
from logging.handlers import RotatingFileHandler
import os

# DEBUG for CI environment 
LOG_LEVEL = os.getenv("LOG_LEVEL", "DEBUG")  

def setup_logger():
    logger = logging.getLogger("artist_app")
    logger.setLevel(LOG_LEVEL)

    # log file, that's currently rotated , keep now and than later upload to the cloud 
    handler = RotatingFileHandler("app.log", maxBytes=1_000_000, backupCount=3)
    
    formatter = logging.Formatter(
        "%(asctime)s | %(levelname)s | %(message)s"
    )

    handler.setFormatter(formatter)
    logger.addHandler(handler)
    return logger

logger = setup_logger()
