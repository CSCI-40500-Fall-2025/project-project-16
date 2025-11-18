import requests
import random
import string
from logger import logger

DEEZER_SEARCH_URL = "https://api.deezer.com/search/artist"

def get_random_artists(count=20):
    """Fetch random artists using random letters."""

    logger.info(f"Fetching {count} random artists from Deezer")
    collected = []

    try: 
        while len(collected) < count:
            letter = random.choice(string.ascii_lowercase)
            res = requests.get(DEEZER_SEARCH_URL, params={"q": letter})

            if res.status_code != 200:
                logger.warning(f"Deezer API returned status {res.status_code} for letter '{letter}'")
                continue

            items = res.json().get("data", [])
            logger.debug(f"Received {len(items)} items for letter '{letter}'")


            if not items:
                logger.debug(f"No results found for letter '{letter}'")
                continue

            for item in items:
                collected.append({
                    "name": item["name"],
                    "image_url": item.get("picture_big")
                })

                logger.debug(
                    f"Collected: {item['name']} "
                    f"(total so far: {len(collected)}/{count})"
                )

                if len(collected) >= count:
                    break

        logger.info(f"Successfully fetched {len(collected)} random artists")
        
        return collected

    except Exception as e:
        logger.error(f"Error fetching artists from Deezer: {e}", exc_info=True)
        raise
    
