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
const playlists = api.getPlaylists('golzernurf');
console.log(playlists);

