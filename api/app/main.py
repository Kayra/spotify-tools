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
