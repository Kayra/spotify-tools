import React from 'react';
import Api from '../Api';

interface IProps {
    api: Api;
    userName: string;
}

interface IState {
  track: string;
  artist: string;
  duplicatePlaylists: Array<string>;
}

export default class Duplicate extends React.Component<IProps, IState> {

    state: IState;

    constructor(props: IProps) {
        super(props);
        this.handleTrackChange = this.handleTrackChange.bind(this);
        this.handleArtistChange = this.handleArtistChange.bind(this);
        this.handleDuplicateSubmit = this.handleDuplicateSubmit.bind(this);
        this.state = {
            track: '',
            artist: '',
            duplicatePlaylists: []
        };
    }

    handleTrackChange(event: any): void {
        this.setState({track: event.target.value});
    }

    handleArtistChange(event: any): void {
        this.setState({artist: event.target.value});
    }

    async handleDuplicateSubmit(event: any): Promise<void> {
        event.preventDefault();
        const response = await this.props.api.spotifyFind(this.props.userName, this.state.track, this.state.artist);
        this.setState({duplicatePlaylists: response.data['playlists']});
    }

    render() {
        return (
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
        )
    }

}