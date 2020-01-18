import axios from "axios";
import SpotifyWebApi from 'spotify-web-api-js';

import { getConfig } from './config';


class Api {

    spotifyApi: SpotifyWebApi.SpotifyWebApiJs;
    init: Promise<void>;

    constructor() {
        this.spotifyApi = new SpotifyWebApi();
        this.init = this.initialise();
    }

    async initialise(): Promise<void> {
        const config = getConfig();
        const authToken = await this.getApiToken(config.spotifyClientId, config.spotifyClientSecret);
        this.spotifyApi.setAccessToken(authToken);
    }

    async getApiToken(clientID: string, clientSecret: string): Promise<string> {

        try {

            const authRequestToken = btoa(`${clientID}:${clientSecret}`)

            const { data } = await axios({
                method: 'POST',
                url: 'https://accounts.spotify.com/api/token',
                data: new URLSearchParams({grant_type: 'client_credentials'}),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": `Basic ${authRequestToken}`
                }
            })

            return data.access_token;

        } catch(error) {
            throw new Error(error);
        }
    }

    async getPlaylists(userName: string): Promise<string[]> {

        await this.init;

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

    async getPlaylistTracks(playlistId: string): Promise<string[]> {

        await this.init;

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