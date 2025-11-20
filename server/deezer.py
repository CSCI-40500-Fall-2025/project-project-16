import requests
import random
import string
import time
from logger import logger

DEEZER_SEARCH_URL = "https://api.deezer.com/search/artist"
DEEZER_ALBUM_SEARCH_URL = "https://api.deezer.com/search/album"

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
    
def get_random_albums(count=20):
    """Fetch random albums using random letters."""

    logger.info(f"Fetching {count} random albums from Deezer")
    collected = []

    try:
        while len(collected) < count:
            letter = random.choice(string.ascii_lowercase)
            logger.debug(f"Searching albums with letter '{letter}'")

            # Call Deezer album search
            start = time.time()
            res = requests.get(DEEZER_ALBUM_SEARCH_URL, params={"q": letter})
            elapsed = (time.time() - start) * 1000

            logger.info(
                f"Deezer album API search for letter '{letter}' completed in {elapsed:.2f} ms"
            )

            if res.status_code != 200:
                logger.warning(
                    f"Deezer API returned status {res.status_code} for letter '{letter}'"
                )
                continue

            items = res.json().get("data", [])

            logger.debug(f"Received {len(items)} albums for letter '{letter}'")

            if not items:
                logger.debug(f"No album results found for letter '{letter}'")
                continue

            # Collect album items
            for item in items:
                album_title = item.get("title")
                cover_url = item.get("cover_big")
                artist_name = item.get("artist", {}).get("name")

                collected.append({
                    "title": album_title,
                    "cover_url": cover_url,
                    "artist": artist_name,
                    "album_id": item.get("id")
                })

                logger.debug(
                    f"Collected album '{album_title}' by {artist_name} "
                    f"(total so far: {len(collected)}/{count})"
                )

                if len(collected) >= count:
                    break

        logger.info(f"Successfully fetched {len(collected)} random albums")
        return collected

    except Exception as e:
        logger.error(f"Error fetching albums from Deezer: {e}", exc_info=True)
        raise