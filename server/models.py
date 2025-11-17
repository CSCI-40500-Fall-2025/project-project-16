from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import declarative_base
from sqlalchemy.sql import func

Base = declarative_base()

class Artist(Base):
    __tablename__ = "artists"

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, index=True)
    image_url = Column(String)
    elo = Column(Float, default=1000.0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Vote(Base):
    __tablename__ = "votes"

    id = Column(Integer, primary_key=True)
    winner_id = Column(Integer, ForeignKey("artists.id"))
    loser_id = Column(Integer, ForeignKey("artists.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
