from flask import Flask, request, jsonify
from flask_cors import CORS

from db import SessionLocal, engine
from models import Base, Artist, Vote
from deezer import get_random_artists
from elo import update_elo

Base.metadata.create_all(bind=engine)

app = Flask(__name__)
CORS(app)

# Utility: ensures artist exists
def get_or_create_artist(db, name, image_url):
    artist = db.query(Artist).filter(Artist.name == name).first()
    if artist:
        return artist

    new_artist = Artist(name=name, image_url=image_url)
    db.add(new_artist)
    db.commit()
    db.refresh(new_artist)
    return new_artist


#ROUTE 1: get 20 random artistis out of deezer
@app.route("/artists/random", methods=["GET"])
def get_random():
    count = int(request.args.get("count", 20))
    db = SessionLocal()

    fetched = get_random_artists(count)

    result = []
    for item in fetched:
        artist = get_or_create_artist(db, item["name"], item["image_url"])
        result.append({
            "id": artist.id,
            "name": artist.name,
            "image_url": artist.image_url,
            "elo": artist.elo
        })

    db.close()
    return jsonify(result)


# ROUTE 2: send a vote, the client sends two data, a winner and loser id and than elo is calculated 

@app.route("/vote", methods=["POST"])
def vote():
    data = request.get_json()

    winner_id = data["winner_id"]
    loser_id = data["loser_id"]

    db = SessionLocal()

    winner = db.query(Artist).filter(Artist.id == winner_id).first()
    loser = db.query(Artist).filter(Artist.id == loser_id).first()

    new_winner_elo, new_loser_elo = update_elo(winner.elo, loser.elo)

    winner.elo = new_winner_elo
    loser.elo = new_loser_elo

    vote = Vote(winner_id=winner_id, loser_id=loser_id)
    db.add(vote)

    db.commit()
    db.close()

    return jsonify({
        "winner_new_elo": new_winner_elo,
        "loser_new_elo": new_loser_elo
    })



# ROUTE 3: get the top artisits based of elo  (note for sudiptto -> maybe can use top k frequent elemts)
@app.route("/artists/top", methods=["GET"])
def top_artists():
    limit = int(request.args.get("limit", 25))
    db = SessionLocal()

    artists = (
        db.query(Artist)
          .order_by(Artist.elo.desc())
          .limit(limit)
          .all()
    )

    result = [{
        "id": a.id,
        "name": a.name,
        "image_url": a.image_url,
        "elo": a.elo
    } for a in artists]

    db.close()
    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)
