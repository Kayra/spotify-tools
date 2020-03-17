import axios from "axios";
import SpotifyWebApi from 'spotify-web-api-js';

import { getConfig } from './config';


interface PlayListTrackMapping {
    [playlistName: string]: SpotifyApi.PlaylistTrackObject[]
  }


class Api {

    apiHost = getConfig().apiHost;

    async createUser(userName: string): Promise<any> {

        const response = await axios({
            method: 'POST',
            url: `${this.apiHost}/users`,
            data: {username: userName}
        }).catch(error => {
            if (error.message.includes('409')) {
                console.log(error.response.data);
            }
        });

        return response;

    }

    // async getApiToken(clientID: string, clientSecret: string): Promise<string> {

    //     try {

    //         const authRequestToken = btoa(`${clientID}:${clientSecret}`)

    //         const { data } = await axios({
    //             method: 'POST',
    //             url: 'https://accounts.spotify.com/api/token',
    //             data: new URLSearchParams({grant_type: 'client_credentials'}),
    //             headers: {
    //                 "Content-Type": "application/x-www-form-urlencoded",
    //                 "Authorization": `Basic ${authRequestToken}`
    //             }
    //         })

    //         return data.access_token;

    //     } catch(error) {
    //         throw new Error(error);
    //     }
    // }

    // async getPlaylists(userName: string): Promise<SpotifyApi.PlaylistObjectSimplified[]> {

    //     await this.init;

    //     let queryPlaylists = async (offset = 0, playlists: SpotifyApi.PlaylistObjectSimplified[] = []): Promise<SpotifyApi.PlaylistObjectSimplified[]> => {

    //         let responsePlaylists: any = [];
    //         responsePlaylists = await this.spotifyApi.getUserPlaylists(userName, { limit: 50, offset: offset });

    //         // try {
    //         //     responsePlaylists = await this.spotifyApi.getUserPlaylists(userName, { limit: 50, offset: offset });
    //         // } catch(error) {
    //         //     if (error instanceof XMLHttpRequest && error.response.includes('429')) {
    //         //         setTimeout(async () => {
    //         //             responsePlaylists = await this.spotifyApi.getUserPlaylists(userName, { limit: 50, offset: offset });
    //         //         }, 2000)
    //         //     } else {
    //         //         throw new Error(error);
    //         //     }
    //         // }

    //         playlists.push(...responsePlaylists.items);

    //         if (responsePlaylists.next) {
    //             const nextUrl = new URL(responsePlaylists.next);
    //             const nextOffset = Number(nextUrl.searchParams.get('offset'));
    //             return queryPlaylists(nextOffset, playlists);
    //         } else {
    //             return playlists;
    //         }

    //     }

    //     return queryPlaylists();

    // }

    // async getPlaylistTracks(playlist: SpotifyApi.PlaylistObjectSimplified): Promise<SpotifyApi.PlaylistTrackObject[]> {

    //     await this.init;

    //     const playlistId = playlist.id

    //     let queryPlaylistTracks = async (playlistId: string, offset = 0, tracks: SpotifyApi.PlaylistTrackObject[] = []): Promise<SpotifyApi.PlaylistTrackObject[]> => {

    //         let playlistTracks: any = [];
    //         playlistTracks = await this.spotifyApi.getPlaylistTracks(playlistId, { limit: 50, offset: offset });

    //         // try {
    //         //     playlistTracks = await this.spotifyApi.getPlaylistTracks(playlistId, { limit: 50, offset: offset });
    //         // } catch(error) {
    //         //     console.log('HIT')
    //         //     if (error instanceof XMLHttpRequest && error.response.includes('429')) {
    //         //         await setTimeout(async () => {
    //         //             console.log('HIT')
    //         //             playlistTracks = await this.spotifyApi.getPlaylistTracks(playlistId, { limit: 50, offset: offset });
    //         //             console.log(playlistTracks);
    //         //         }, 2000)
    //         //     } else {
    //         //         throw new Error(error);
    //         //     }
    //         // }

    //         tracks.push(...playlistTracks.items);

    //         if (playlistTracks.next) {
    //             const nextUrl = new URL(playlistTracks.next);
    //             const nextOffset = Number(nextUrl.searchParams.get('offset'));
    //             return queryPlaylistTracks(playlistId, nextOffset, tracks);
    //         } else {
    //             return tracks;
    //         }
    //     }

    //     return queryPlaylistTracks(playlistId);

    // }

    // async buildPlaylistTrackMapping(userName: string): Promise<PlayListTrackMapping> {

    //     const cachedPlaylistTrackMapping = localStorage.getItem(userName);
    //     if (cachedPlaylistTrackMapping != null) {
    //         return JSON.parse(cachedPlaylistTrackMapping);
    //     }

    //     var playListTrackMapping: PlayListTrackMapping = {};

    //     const playlists = await this.getPlaylists(userName);
        
    //     for (const playlist of playlists) {
    
    //         const playlistName = playlist.name;
    //         const playListTracks = await this.getPlaylistTracks(playlist);
    
    //         if (playlistName in playListTrackMapping) {
    //             playListTrackMapping[playlistName].push(...playListTracks);
    //         } else {
    //             playListTrackMapping[playlistName] = playListTracks;
    //         }

    //     }
       
    //     localStorage.setItem(userName, JSON.stringify(playListTrackMapping));

    //     return playListTrackMapping;

    // }

    // findPlaylistsWithTrack(artist: string, song: string, playListTrackMapping: PlayListTrackMapping): string[] {

    //     console.log(artist);
    //     console.log(song);
    //     console.log(playListTrackMapping);
        
    //     return []
    // }
    
}

export default Api;