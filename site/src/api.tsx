import axios from "axios";
import SpotifyWebApi from 'spotify-web-api-js';

import { getConfig } from './config';


interface PlayListTrackMapping {
    [playlistName: string]: SpotifyApi.PlaylistTrackObject[]
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

        let queryPlaylistTracks = async (playlistId: string, offset = 0, tracks: SpotifyApi.PlaylistTrackObject[] = []): Promise<SpotifyApi.PlaylistTrackObject[]> => {

            const playlistTracks: SpotifyApi.PlaylistTrackResponse = await this.spotifyApi.getPlaylistTracks(playlistId, { limit: 50, offset: offset });

            tracks.push(...playlistTracks.items);

            if (playlistTracks.next) {
                const nextUrl = new URL(playlistTracks.next);
                const nextOffset = Number(nextUrl.searchParams.get('offset'));
                return queryPlaylistTracks(playlistId, nextOffset, tracks);
            } else {
                return tracks;
            }
        }

        return queryPlaylistTracks(playlistId);

    }

    async buildPlaylistTrackMapping(userName: string): Promise<PlayListTrackMapping> {

        var playListTrackMapping: PlayListTrackMapping = {};

        const playlists = await this.getPlaylists(userName);

        let updatePlaylistTrackMapping = async (pl: SpotifyApi.PlaylistObjectSimplified, plMapping: PlayListTrackMapping): Promise<PlayListTrackMapping> => {

            const playlistName = pl.name;
            const playListTracks = await this.getPlaylistTracks(pl);
    
            if (playlistName in playListTrackMapping) {
                plMapping[playlistName].push(...playListTracks);
            } else {
                plMapping[playlistName] = playListTracks;
            }

            return plMapping;

        }
        
        for (const playlist of playlists) {
    
            try {
                playListTrackMapping = await updatePlaylistTrackMapping(playlist, playListTrackMapping);
            } catch(error) {
                if (error instanceof XMLHttpRequest && error.response.includes('429')) {
                    setTimeout(async () => {
                        playListTrackMapping = await updatePlaylistTrackMapping(playlist, playListTrackMapping);
                    }, 2000)
                } else {
                    throw new Error(error);
                }
            }
        }
        
        return playListTrackMapping

    }
    
}

export default Api;