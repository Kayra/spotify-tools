from fastapi import FastAPI, Response, HTTPException, status

from spotify_wrapper import Spotify
from models import db, User

from datetime import datetime

app = FastAPI()
spotify = Spotify()


@app.get('/')
async def root():
    return {'message': 'Hello world.'}


@app.get('/spotify/find')
async def find_track_playlists(username: str, track: str = None, artist: str = None):

    if track and artist:
        pass

    if track:
        pass

    if artist:
        pass

    raise HTTPException(status_code=422, detail="Please add a 'track' or 'artist' url param.")


@app.post('/users')
async def add_user(user: User):

    if db.users.find({'username': user.username}).count():
        raise HTTPException(status_code=409, detail=f'User {user.username} already exists.')

    user.playlist_track_mapping = spotify.build_playlist_track_mapping(user.username)
    user.last_updated = datetime.now()

    db.users._insert(user.dict(), check_keys=False)

    added_user = db.users.find({'username': user.username})
    if added_user.count() > 0:
        return {'user': user}
    else:
        raise HTTPException(status_code=500, detail=f'Unable to add User {user.username}.')


@app.get('/users')
async def find_users():

    users = []
    for user in db.users.find():
        users.append(User(**user))

    return {'users': users}


@app.get('/users/{username}')
async def find_user(username: str):

    user = db.users.find_one({'username': username})

    if user:
        del user['_id']
        return {'user': user}
    else:
        raise HTTPException(status_code=404, detail=f'User {username} does not exist.')
