from pydantic import BaseModel, Field
from pymongo import MongoClient

from datetime import datetime
from typing import Dict, Optional


client = MongoClient()
db = client.spotify


class User(BaseModel):
    username: str = Field(...)
    playlist_track_mapping: Optional[Dict]
    last_updated: Optional[datetime]
