import os

from pymongo import MongoClient
from fastapi import FastAPI

from spotify_wrapper import Spotify
from views.user_views import router as user_views_router
from views.spotify_views import router as spotify_views_router


app = FastAPI()
spotify = Spotify()


mongo_host = os.environ.get('MONGO_HOST')
mongo_port = os.environ.get('MONGO_PORT')
mongo_user = os.environ.get('MONGO_USER')
mongo_password = os.environ.get('MONGO_PASSWORD')
mongo_db = os.environ.get('MONGO_DB')
client = MongoClient(f'mongodb://{mongo_user}:{mongo_password}@{mongo_host}:{mongo_port}/{mongo_db}')
db = client.spotify


@app.get('/')
async def root():
    return {'message': 'Hello world.'}


app.include_router(user_views_router)
app.include_router(spotify_views_router)
