import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import Api from './Api';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

const api = new Api();

api.getPlaylists('golzernurf')
  .then(function(playlists) {

    let tracks: string[] = [];

    for (const playlist of playlists) {
      api.getPlaylistTracks(playlist)
        .then(function(playlistTracks) {
          tracks.push(...playlistTracks);
        });
    }
    console.log(tracks);
  });
