from fastapi import FastAPI

from spotify_wrapper import Spotify


app = FastAPI()
spotify = Spotify()


@app.get('/')
async def root():
    print(spotify.get_playlists('golzernurf'))
    return {'message': 'Hello world.'}
