import requests
import random
import string

DEEZER_SEARCH_URL = "https://api.deezer.com/search/artist"

def get_random_artists(count=20):
    """Fetch random artists using random letters."""
    collected = []

    while len(collected) < count:
        letter = random.choice(string.ascii_lowercase)
        res = requests.get(DEEZER_SEARCH_URL, params={"q": letter})

        if res.status_code != 200:
            continue

        items = res.json().get("data", [])
        if not items:
            continue

        for item in items:
            collected.append({
                "name": item["name"],
                "image_url": item.get("picture_big")
            })

            if len(collected) >= count:
                break

    return collected
