from pydantic import BaseModel, Field

from datetime import datetime
from typing import Dict, Optional


class User(BaseModel):
    username: str = Field(...)
    playlist_track_mapping: Optional[Dict]
    last_updated: Optional[datetime]
