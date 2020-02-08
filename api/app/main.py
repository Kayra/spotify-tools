from fastapi import FastAPI

from spotify_wrapper import Spotify


app = FastAPI()
spotify = Spotify()


@app.get('/')
async def root():

    playlists = spotify.get_playlists('golzernurf')
    tracks = spotify.get_playlist_tracks(playlists[0]['id'])
    # return {'message': 'Hello world.'}
    # return playlists[0]
    return tracks