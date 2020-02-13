from fastapi import FastAPI, Response, status

from spotify_wrapper import Spotify
from models import db, User

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
    added_user = db.users.insert_one(user.dict())
    return {'user': str(added_user.inserted_id)}


@app.get('/users')
async def find_user():

    users = []
    for user in db.users.find():
        users.append(User(**user))

    return {'users': users}
