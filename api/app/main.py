from fastapi import FastAPI, Response, HTTPException, status

from spotify_wrapper import Spotify
from models import db, User

from datetime import datetime

app = FastAPI()
spotify = Spotify()


@app.get('/')
async def root():
    return {'message': 'Hello world.'}


@app.get('/find')
async def find_track_playlist(response: Response, track: str = None, artist: str = None):

    if not track and not artist:
        response.status_code = status.HTTP_422_UNPROCESSABLE_ENTITY
        return {'message': "Please add a 'track' or 'artist' url param."}

    return {'message': 'Hello world.'}


@app.post('/users')
async def add_user(user: User):

    user.playlist_track_mapping = {}
    user.last_updated = datetime.now()

    if db.users.find({'username': user.username}).count():
        raise HTTPException(status_code=409, detail=f'User {user.username} already exists.')

    added_user = db.users.insert_one(user.dict())

    if added_user.acknowledged:
        return {'user': user}
    else:
        raise HTTPException(status_code=500, detail=f'Unable to add User {user.username}.')


@app.get('/users')
async def find_user():

    users = []
    for user in db.users.find():
        users.append(User(**user))

    return {'users': users}
