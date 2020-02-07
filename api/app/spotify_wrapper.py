import os

import spotipy
from spotipy.oauth2 import SpotifyClientCredentials


class Spotify:

    def __init__(self):
        client_id = os.environ.get('SPOTIFY_CLIENT_ID')
        client_secret = os.environ.get('SPOTIFY_CLIENT_SECRET')
        self.client = spotipy.Spotify(auth_manager=SpotifyClientCredentials(client_id=client_id,
                                                                            client_secret=client_secret))

    def get_playlists(self, username):
        return self.client.user_playlists(username)
