// import {request} from './react-request-hook';
import SpotifyWebApi from 'spotify-web-api-js';

let spotifyApi = new SpotifyWebApi();

class Api {

    constructor() {
        spotifyApi.setAccessToken('BQDmn9Fn_ILiiC4vYOzc2YcHRXOTOXtW4TeHzT7jkenfwt6doSl4eHTQkV_tlhxsZn_3z_fGmuhUXlX66eY');
    }

    getPlaylists(userName: string): Promise<void | string[]> {

        function queryPlaylists(offset = 0): Promise<void | string[]> {

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
                });
        }

        // queryPlaylists().then(data => console.log(data))

        return queryPlaylists();

    }
    
}

export default Api;
// export {}
