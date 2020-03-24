import React, { Component } from 'react';

import './App.css';
import Api from './Api';
// import logo from './logo.svg';


interface IProps {
}

interface IState {
  userName: string;
  validUser: boolean;
  track: string;
  artist: string;
  duplicatePlaylists: Array<string>;
  backup: object;
}

class App extends Component<IProps, IState> {

  api: Api;

  constructor(props: any) {

    super(props);

    this.api = new Api();
    this.state = {
      userName: '',
      validUser: false,
      track: '',
      artist: '',
      duplicatePlaylists: [],
      backup: {}
    };
  
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleUsernameSubmit = this.handleUsernameSubmit.bind(this);

    this.handleTrackChange = this.handleTrackChange.bind(this);
    this.handleArtistChange = this.handleArtistChange.bind(this);
    this.handleDuplicateSubmit = this.handleDuplicateSubmit.bind(this);

    this.handleBackupSubmit = this.handleBackupSubmit.bind(this);

  }

  handleUsernameChange(event: any): void {
    this.setState({userName: event.target.value});
  }

  async handleUsernameSubmit(event: any): Promise<void> {

    event.preventDefault();
    const response = await this.api.userCreate(this.state.userName);

    if (response.status === 200 || response.status === 409) {
      this.setState({validUser: true});
    } else {
      alert(response.data);
    }

  }

  handleTrackChange(event: any): void {
    this.setState({track: event.target.value});
  }

  handleArtistChange(event: any): void {
    this.setState({artist: event.target.value});
  }

  async handleDuplicateSubmit(event: any): Promise<void> {
    
    event.preventDefault();
    const response = await this.api.spotifyFind(this.state.userName, this.state.track, this.state.artist);
    this.setState({duplicatePlaylists: response.data['playlists']});

  }

  async handleBackupSubmit(event:any): Promise<void> {
    
    event.preventDefault();
    const response = await this.api.spotifyBackup(this.state.userName, true);
    this.setState({backup: response.data['backup']});

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

        <div className="user">
          <h2>Register your username to get started</h2>
          <form onSubmit={this.handleUsernameSubmit}>
            <label>
              Name: <input type="text" value={this.state.userName} onChange={this.handleUsernameChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>

        {
          this.state.validUser ?
            <div className="features">

              <div>
                <h2>Song Duplicate Check</h2>
                <form onSubmit={this.handleDuplicateSubmit}>
                  <label>
                    Track: <input type="text" value={this.state.track} onChange={this.handleTrackChange} />
                    Artist: <input type="text" value={this.state.artist} onChange={this.handleArtistChange} />
                  </label>
                  <input type="submit" value="Submit" />
                </form>

                {
                  this.state.duplicatePlaylists ?
                    <ul>
                      {this.state.duplicatePlaylists.map(playList => <li key={playList}>{playList}</li>)}
                    </ul>
                  : ""
                }

              </div>

              <div>
                <h2>Library Playlist Backup</h2>
                <form onSubmit={this.handleBackupSubmit}>
                  <input type="submit" value="Prepare backup" />
                </form>

                {
                  Object.values(this.state.backup).length ?
                    <a href={encodeURI("data:text/plain;utf-8," + JSON.stringify(this.state.backup).replace(/#/g, '%23'))} target="_blank" download="spotify_backup.txt">Download back up</a>
                  : ""
                }                

              </div>

              <div>
                <h2>Song Timeline</h2>
              </div>

            </div>
          : ""
        }

      </header>
    </div>
  }
}

export default App;
