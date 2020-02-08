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

        response_playlists = self.client.user_playlists(username)
        playlists = response_playlists['items']

        while response_playlists['next']:
            offset = parse_qs(urlparse(response_playlists['next']).query)['offset'][0]
            response_playlists = self.client.user_playlists(username, offset=offset)
            playlists.extend(response_playlists['items'])

        return playlists

    def get_playlist_tracks(self, playlist_id):

        response_tracks = self.client.playlist_items(playlist_id)
        tracks = response_tracks['items']

        while response_tracks['next']:
            offset = parse_qs(urlparse(response_tracks['next']).query)['offset'][0]
            response_tracks = self.client.playlist_items(playlist_id, offset=offset)
            tracks.extend(response_tracks['items'])

        return tracks
