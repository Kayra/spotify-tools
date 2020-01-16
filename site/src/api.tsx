import SpotifyWebApi from 'spotify-web-api-js';
import { getConfig } from './config';

class Api {

    spotifyApi: SpotifyWebApi.SpotifyWebApiJs;

    constructor() {
        this.spotifyApi = new SpotifyWebApi();
        this.spotifyApi.setAccessToken('BQDGMSe-KHCQgrcBd3_ksE-Rt6tqI7oZJoh-xc7qUeu-xwCUIlEh5yFrg5F-SlIUaNPe9k7GH-jKPcbngjk');
    }

    getPlaylists = (userName: string): Promise<string[]> => {

        let queryPlaylists = (offset = 0): Promise<string[]> => {

            return this.spotifyApi.getUserPlaylists(userName, { limit: 50, offset: offset })
                .then(function(data) {
                    
                    if (data.next) {
                        const nextUrl = new URL(data.next);
                        const nextOffset = Number(nextUrl.searchParams.get('offset'));
                        return queryPlaylists(nextOffset);
                    } else {
                        return data.items.map(playlist => playlist['id']);
                    }
                    
                }, function(err) {
                    console.error(err);
                    return [];
                });
        }

        return queryPlaylists();

    }

    getPlaylistTracks = (playlistId: string): Promise<string[]> => {

        let queryPlaylistTracks = (playlistId: string, offset = 0): Promise<string[]> => {

            return this.spotifyApi.getPlaylistTracks(playlistId, { limit: 50, offset: offset })
                .then(function(data) {

                    if (data.next) {
                        const nextUrl = new URL(data.next);
                        const nextOffset = Number(nextUrl.searchParams.get('offset'));
                        return queryPlaylistTracks(playlistId, nextOffset);
                    } else {
                        return data.items.map(trackObject => trackObject['track']['id']);
                    }

                }, function(err) {
                    console.error(err);
                    return [];
                });

        }

        return queryPlaylistTracks(playlistId);

    }
    
}

export default Api;
