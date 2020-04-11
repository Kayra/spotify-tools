import React, { Component } from 'react';

import './App.css';
import Api from './Api';
import Timeline from './Timeline';
import Duplicate from './components/Duplicate';


interface IProps {
}

interface IState {
  userName: string;
  validUser: boolean;
  backup: object;
  dates: object;
}

class App extends Component<IProps, IState> {

  api: Api;

  constructor(props: any) {

    super(props);

    this.api = new Api();
    this.state = {
      userName: '',
      validUser: false,
      backup: {},
      dates: {}
    };
  
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleUsernameSubmit = this.handleUsernameSubmit.bind(this);

    this.handleBackupSubmit = this.handleBackupSubmit.bind(this);

    this.handleTimelineSubmit = this.handleTimelineSubmit.bind(this);

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

  async handleBackupSubmit(event:any): Promise<void> {
    
    event.preventDefault();
    const response = await this.api.spotifyBackup(this.state.userName, true);
    this.setState({backup: response.data['backup']});

  }

  async handleTimelineSubmit(event:any): Promise<void> {
    
    event.preventDefault();
    const response = await this.api.spotifyTimeline(this.state.userName);
    const datedTracks = response.data['timeline'];

    const dates: any[] = [];
    
    Object.keys(datedTracks).forEach((_date) => {

      const date = _date as keyof typeof datedTracks;
      const tracks = datedTracks[date];

      for (const track of tracks) {
        dates.push({
          data: date,
          status: "status",
          statusB: `${JSON.stringify(track['name'])} - ${track['artist']}`,
          statusE: ""
        });
        break;
      }

      this.setState({dates: dates});

    });

  }

  render() {
    return (
    <div className="App">
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

              <Duplicate api={this.api} userName={this.state.userName}/>

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
                <form onSubmit={this.handleTimelineSubmit}>
                  <input type="submit" value="Get timeline" />
                </form>
                {
                  Object.values(this.state.dates).length ?
                  <Timeline dates={this.state.dates}/>
                  : ""
                }

              </div>

            </div>
          : ""
        }

      </header>
    </div>
    )
  }
}

export default App;
