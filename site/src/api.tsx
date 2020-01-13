import SpotifyWebApi from 'spotify-web-api-js';

let spotifyApi = new SpotifyWebApi();

class Api {

    constructor() {
        spotifyApi.setAccessToken('BQDmn9Fn_ILiiC4vYOzc2YcHRXOTOXtW4TeHzT7jkenfwt6doSl4eHTQkV_tlhxsZn_3z_fGmuhUXlX66eY');
    }

    getPlaylists(userName: string): Promise<string[]> {

        function queryPlaylists(offset = 0): Promise<string[]> {

            return spotifyApi.getUserPlaylists(userName, { limit: 50, offset: offset })
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

    getPlaylistTracks(playlistId: string): Promise<string[]> {

        function queryPlaylistTracks(playlistId: string, offset = 0): Promise<string[]> {

            return spotifyApi.getPlaylistTracks(playlistId, { limit: 50, offset: offset })
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
