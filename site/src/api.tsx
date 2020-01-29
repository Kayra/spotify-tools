import axios from "axios";
import SpotifyWebApi from 'spotify-web-api-js';

import { getConfig } from './config';


interface PlayListTrackMapping {
    [playlistName: string]: Object[]
  }

  
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

    async getPlaylists(userName: string): Promise<SpotifyApi.PlaylistObjectSimplified[]> {

        await this.init;

        let queryPlaylists = async (offset = 0, playlists: SpotifyApi.PlaylistObjectSimplified[] = []): Promise<SpotifyApi.PlaylistObjectSimplified[]> => {

            const responsePlaylists = await this.spotifyApi.getUserPlaylists(userName, { limit: 50, offset: offset });
            playlists.push(...responsePlaylists.items);

            if (responsePlaylists.next) {
                const nextUrl = new URL(responsePlaylists.next);
                const nextOffset = Number(nextUrl.searchParams.get('offset'));
                return queryPlaylists(nextOffset, playlists);
            } else {
                return playlists;
            }

        }

        return queryPlaylists();

    }

    async getPlaylistTracks(playlist: SpotifyApi.PlaylistObjectSimplified): Promise<SpotifyApi.PlaylistTrackObject[]> {

        await this.init;

        const playlistId = playlist.id

        let queryPlaylistTracks = async (playlistId: string, offset = 0): Promise<SpotifyApi.PlaylistTrackObject[]> => {

            const playlistTracks = await this.spotifyApi.getPlaylistTracks(playlistId, { limit: 50, offset: offset });

            if (playlistTracks.next) {
                const nextUrl = new URL(playlistTracks.next);
                const nextOffset = Number(nextUrl.searchParams.get('offset'));
                return queryPlaylistTracks(playlistId, nextOffset);
            } else {
                return playlistTracks.items;
                // return playlistTracks.items.map(trackObject => trackObject['track']['name']);
            }

        }

        return queryPlaylistTracks(playlistId);

    }

    async buildPlaylistTrackMapping(userName: string) {

        var playListTrackMapping: PlayListTrackMapping = {};

        const playlists = await this.getPlaylists('golzernurf');
        
        for (const playlist of playlists) {
    
            const playlistName = playlist.name;
            const playListTracks = await this.getPlaylistTracks(playlist);
    
            if (playlistName in playListTrackMapping) {
                playListTrackMapping[playlistName].push(...playListTracks);
            } else {
                playListTrackMapping[playlistName] = playListTracks;
            }
    
        }
        
        return playListTrackMapping

    }
    
}

export default Api;