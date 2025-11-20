from deezer import get_random_artists
import logging

def test_logging():
    # This will produce logs inside CI
    get_random_artists(2)
    logging.info("Test completed")
