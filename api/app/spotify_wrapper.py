import os
from urllib.parse import urlparse, parse_qs

import spotipy
from spotipy.oauth2 import SpotifyClientCredentials


class Spotify:

    def __init__(self):
        client_id = os.environ.get('SPOTIFY_CLIENT_ID')
        client_secret = os.environ.get('SPOTIFY_CLIENT_SECRET')
        self.client = spotipy.Spotify(auth_manager=SpotifyClientCredentials(client_id=client_id,
                                                                            client_secret=client_secret))

    def get_playlists(self, username):

        spotify_playlists = self.client.user_playlists(username)
        user_playlists = spotify_playlists['items']

        while spotify_playlists['next']:
            offset = parse_qs(urlparse(spotify_playlists['next']).query)['offset'][0]
            spotify_playlists = self.client.user_playlists(username, offset=offset)
            user_playlists.extend(spotify_playlists['items'])

        return user_playlists

    # def get_playlist_tracks(self, playlist):
    #
    #     playlist_tracks = []
    #
    #     while True:
    #         tracks = self.client.playlist_items(playlist[''])

