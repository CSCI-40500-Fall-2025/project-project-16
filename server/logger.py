import logging
import os
from logtail import LogtailHandler
from dotenv import load_dotenv

load_dotenv()

SOURCE_TOKEN = os.getenv("BETTERSTACK_SOURCE_TOKEN")
INGEST_HOST = os.getenv("BETTERSTACK_INGEST_HOST", "in.logs.betterstack.com")

# Better Stack / Logtail handler
logtail_handler = LogtailHandler(
    source_token=SOURCE_TOKEN,
    host=f"https://{INGEST_HOST}"
)

# Create logger
logger = logging.getLogger("artist-api")
logger.setLevel(logging.DEBUG)  

# Clear default handlers
logger.handlers = []

# Add console handler
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.DEBUG)
console_formatter = logging.Formatter("[%(asctime)s] %(levelname)s - %(message)s")
console_handler.setFormatter(console_formatter)

# Add Logtail handler
logger.addHandler(console_handler)
logger.addHandler(logtail_handler)
