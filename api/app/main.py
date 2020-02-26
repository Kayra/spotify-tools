from pymongo import MongoClient
from fastapi import FastAPI

from spotify_wrapper import Spotify
from views.user_views import router as user_views_router
from views.spotify_views import router as spotify_views_router


app = FastAPI()
spotify = Spotify()
client = MongoClient()
db = client.spotify


@app.get('/')
async def root():
    return {'message': 'Hello world.'}


app.include_router(user_views_router)
app.include_router(spotify_views_router)
