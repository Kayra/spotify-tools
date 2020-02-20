import os
from typing import Optional, Dict, Set
from urllib.parse import urlparse, parse_qs

import spotipy
from spotipy.oauth2 import SpotifyClientCredentials


class Spotify:

    def __init__(self):
        client_id = os.environ.get('SPOTIFY_CLIENT_ID')
        client_secret = os.environ.get('SPOTIFY_CLIENT_SECRET')
        self.client = spotipy.Spotify(auth_manager=SpotifyClientCredentials(client_id=client_id,
                                                                            client_secret=client_secret))

    @staticmethod
    def _response_track_to_local_track(response_track):

        local_track = {
            'added_at': response_track['added_at'],
            'added_by': response_track['added_by']['id'],
            'id': response_track['track']['id'],
            'name': response_track['track']['name'],
            'artist': ', '.join([artist['name'] for artist in response_track['track']['artists']]),
            'album': response_track['track']['album']['name'],
            'released_at': response_track['track']['album']['release_date']
        }

        return local_track

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
        tracks = [self._response_track_to_local_track(track) for track in response_tracks['items']]

        while response_tracks['next']:
            offset = parse_qs(urlparse(response_tracks['next']).query)['offset'][0]
            response_tracks = self.client.playlist_items(playlist_id, offset=offset)
            tracks.extend([self._response_track_to_local_track(track) for track in response_tracks['items']])

        return tracks

    def build_playlist_track_mapping(self, username):

        mapping = {}

        playlists = self.get_playlists(username)
        for playlist in playlists:
            mapping[playlist['name']] = self.get_playlist_tracks(playlist['id'])

        return mapping

    @staticmethod
    def find_playlists_containing_track(mapping: Dict, track_name: str = None, artist: str = None) -> Optional[Set[str]]:

        if not track_name and not artist:
            return None

        playlists = []

        for playlist, tracks in mapping.items():

            for playlist_track in tracks:
                if (track_name and track_name.lower() == playlist_track['name'].lower()) or (artist and artist.lower() in playlist_track['artist'].lower()):
                    playlists.append(playlist)

        return set(playlists)
