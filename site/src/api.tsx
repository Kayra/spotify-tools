// import {request} from './react-request-hook';
import SpotifyWebApi from 'spotify-web-api-js';

let spotifyApi = new SpotifyWebApi();

function Api() {

    spotifyApi.setAccessToken('BQA75dt4j9eZV-Jw25C_QXYgn5X9E91-tiC0rOVJQfXnFP9b1SqRH3OVxJyE8M1Mxitx5emkz-QLTnoPECA');

    spotifyApi.getUserPlaylists('golzernurf')
      .then(function(data) {
        console.log('User playlists', data);
      }, function(err) {
        console.error(err);
      });
    
}

export default Api;
// export {}
