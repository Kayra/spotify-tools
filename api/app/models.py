from pydantic import BaseModel
from pymongo import MongoClient

from datetime import datetime
from typing import Dict


client = MongoClient()
db = client.spotify


class User(BaseModel):

    username: str
    playlist_track_mapping: Dict
    last_updated: datetime
