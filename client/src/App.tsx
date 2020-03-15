import React, { Component } from 'react';

import './App.css';
import Api from './Api';
import logo from './logo.svg';


class App extends Component {

  async componentDidMount() {

    const api = new Api();


    const testInput = "happyface, alaskalaska";

    const song = testInput.split(',')[0].trim();
    const artist = testInput.split(',')[1].trim();

    console.log(api.createUser('golzernurf'));
  

  }


  render() {
    return <div className="App">
      <header className="App-header">

        <h1>Spotify Toolset</h1>

        <p>A set of tools to facilitate interaction with a large amount of playlists.</p>

        <p>Current features:</p>
        <ul>
          <li>Song duplicate check</li>
          <li>Song timeline</li>
          <li>Library playlist backup</li>
        </ul>

        <p>Be sure to <a href="https://twitter.com/kayraalat" target="_blank" rel="noreferrer">tweet at me</a> or <a href="https://github.com/Kayra/spotify-tools/issues" target="_blank" rel="noreferrer">create a Github issue</a> if there's a feature you'd like to see.</p>

        <hr></hr>

        <div>
          <h2>Song Duplicate Check</h2>
        </div>

        <div>
          <h2>Song Timeline</h2>
        </div>

        <div>
          <h2>Library Playlist Backup</h2>
        </div>

      </header>
    </div>
  }
}

export default App;
