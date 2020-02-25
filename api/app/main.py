from pymongo import MongoClient
from fastapi import FastAPI, HTTPException

from spotify_wrapper import Spotify
from views.user_views import router as user_views_router


app = FastAPI()
spotify = Spotify()
client = MongoClient()
db = client.spotify


@app.get('/')
async def root():
    return {'message': 'Hello world.'}


@app.get('/spotify/find')
async def find_track_playlists(username: str, track: str = None, artist: str = None):

    user = db.users.find_one({'username': username})
    if not user:
        raise HTTPException(status_code=404, detail=f'User {username} does not exist.')

    if not track and not artist:
        raise HTTPException(status_code=422, detail="Please add a 'track' or 'artist' url param (or both).")

    playlist_track_mapping = user['playlist_track_mapping']
    track_playlists = spotify.find_playlists_containing_track(playlist_track_mapping, track, artist)

    if track_playlists:
        return {'playlists': track_playlists}
    else:
        raise HTTPException(status_code=404, detail=f'No playlists found for track: {track}, artist: {artist}, user: {username}')


@app.get('/spotify/backup')
async def create_playlist_map_backup(username: str, simple=False):

    user = db.users.find_one({'username': username})
    if not user:
        raise HTTPException(status_code=404, detail=f'User {username} does not exist.')

    playlist_track_mapping = user['playlist_track_mapping']

    if simple:
        playlist_track_mapping = spotify.simplify_playlist_track_mapping(playlist_track_mapping)

    return {'backup': playlist_track_mapping}


@app.get('/spotify/timeline')
async def create_playlist_track_timeline(username: str):

    user = db.users.find_one({'username': username})
    if not user:
        raise HTTPException(status_code=404, detail=f'User {username} does not exist.')

    playlist_track_mapping = user['playlist_track_mapping']
    playlist_track_timeline = spotify.build_track_timeline(playlist_track_mapping)

    return {'timeline': playlist_track_timeline}


app.include_router(user_views_router)
