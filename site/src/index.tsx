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
    const tracks = api.getPlaylistTracks(playlists[0]);
    console.log(tracks);
  });
// console.log(playlists);

