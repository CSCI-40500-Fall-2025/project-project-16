from flask import Flask, request, jsonify
from flask_cors import CORS
import time
from db import SessionLocal, engine
from models import Base, Artist, Vote
from deezer import get_random_artists
from elo import update_elo
from logger import logger

Base.metadata.create_all(bind=engine)

app = Flask(__name__)
CORS(app)

# helper to ensures artist exists
def get_or_create_artist(db, name, image_url):
    logger.debug(f"Checking if artist '{name}' exists in DB")
    artist = db.query(Artist).filter(Artist.name == name).first()

    if artist:
        logger.debug(f"Artist found in DB: {artist.id} - {artist.name}")
        return artist

    logger.info(f"Artist '{name}' not found. Creating new record.")

    new_artist = Artist(name=name, image_url=image_url)
    db.add(new_artist)
    db.commit()
    db.refresh(new_artist)

    logger.debug(f"Created new artist ID={new_artist.id}")
    return new_artist


#ROUTE 1: get 20 random artistis out of deezer
@app.route("/artists/random", methods=["GET"])
def get_random():
    count = int(request.args.get("count", 20))
    logger.info(f"Request received: GET /artists/random (count={count})")
    db = SessionLocal()

    try: 
        start = time.time()
        fetched = get_random_artists(count)
        elapsed = (time.time() - start) * 1000  # ms
        logger.debug(f"Fetched {len(fetched)} artists from Deezer API in {elapsed:.2f} ms")

        result = []
        for item in fetched:
            artist = get_or_create_artist(db, item["name"], item["image_url"])
            result.append({
                "id": artist.id,
                "name": artist.name,
                "image_url": artist.image_url,
                "elo": artist.elo
            })

        logger.info(f"Returning {len(result)} artists to client")
        return jsonify(result)
    
    except Exception as e:
        logger.error(f"Error in /artists/random: {e}", exc_info=True)
        return jsonify({"error": "Server error"}), 500

    finally:
        db.close()


# ROUTE 2: send a vote, the client sends two data, a winner and loser id and than elo is calculated 

@app.route("/vote", methods=["POST"])
def vote():
    logger.info("Request received: POST /vote")
    data = request.get_json()

    if "winner_id" not in data or "loser_id" not in data:
        logger.warning("Invalid vote payload received")
        return jsonify({"error": "Missing winner_id or loser_id"}), 400

    winner_id = data["winner_id"]
    loser_id = data["loser_id"]

    logger.debug(f"Vote received → winner={winner_id}, loser={loser_id}")

    db = SessionLocal()


    try:
        winner = db.query(Artist).filter(Artist.id == winner_id).first()
        loser = db.query(Artist).filter(Artist.id == loser_id).first()

        if not winner or not loser:
            logger.warning("Vote contains invalid artist IDs")
            return jsonify({"error": "Invalid artist ID"}), 400

        logger.debug(
            f"Before ELO → winner({winner_id})={winner.elo}, "
            f"loser({loser_id})={loser.elo}"
        )

        new_winner_elo, new_loser_elo = update_elo(winner.elo, loser.elo)

        winner.elo = new_winner_elo
        loser.elo = new_loser_elo

        logger.info(
            f"Updated ELO: winner={winner_id}→{new_winner_elo}, "
            f"loser={loser_id}→{new_loser_elo}"
        )

        vote = Vote(winner_id=winner_id, loser_id=loser_id)
        db.add(vote)
        db.commit()

        logger.debug("Vote successfully saved to database")

        return jsonify({
            "winner_new_elo": new_winner_elo,
            "loser_new_elo": new_loser_elo
        })

    except Exception as e:
        logger.error(f"Error in /vote: {e}", exc_info=True)
        return jsonify({"error": "Server error"}), 500

    finally:
        db.close()



# ROUTE 3: get the top artisits based of elo  (note for sudiptto -> maybe can use top k frequent elemts)
@app.route("/artists/top", methods=["GET"])
def top_artists():
    limit = int(request.args.get("limit", 25))
    logger.info(f"Request received: GET /artists/top (limit={limit})")

    db = SessionLocal()

    try:
        artists = (
            db.query(Artist)
            .order_by(Artist.elo.desc())
            .limit(limit)
            .all()
        )

        logger.debug(f"Fetched {len(artists)} top artists sorted by ELO")

        result = [{
            "id": a.id,
            "name": a.name,
            "image_url": a.image_url,
            "elo": a.elo
        } for a in artists]

        logger.info("Returning top artists list to client")
        return jsonify(result)

    except Exception as e:
        logger.error(f"Error in /artists/top: {e}", exc_info=True)
        return jsonify({"error": "Server error"}), 500

    finally:
        db.close()


if __name__ == "__main__":
    app.run(debug=True)
