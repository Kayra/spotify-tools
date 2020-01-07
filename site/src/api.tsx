// import {request} from './react-request-hook';
import SpotifyWebApi from 'spotify-web-api-js';

let spotify = new SpotifyWebApi();

// export type Playlist = {
//     collaborative: boolean;
//     description: string;
//     external_urls: string;
// }


// const api = {
//     getPlaylists: (page: number = 1) => {
//         return request<[]>
//     }
// }


spotify.setAccessToken('BQCZ9kA5QKblZjhAm_chZkO8qxXc7HGJsjcyzY1K6yLNSphdLG4p0ZaCsjggjVBfGsvQdr4SnipUo3_gP4A');

function Api() {

}

export default Api;
// export {}
