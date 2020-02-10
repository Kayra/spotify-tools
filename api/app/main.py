from fastapi import FastAPI, Response, status

from spotify_wrapper import Spotify


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
