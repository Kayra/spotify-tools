import React from 'react';
import Api from '../Api';

interface IProps {
    api: Api;
    userName: string;
}

interface IState {
    backup: object;
}

export default class Backup extends React.Component<IProps, IState> {

    state: IState;

    constructor(props: IProps) {
        super(props);
        this.state = {
            backup: {}
        };
        this.handleBackupSubmit = this.handleBackupSubmit.bind(this);
    }

    async handleBackupSubmit(event:any): Promise<void> {
        event.preventDefault();
        const response = await this.props.api.spotifyBackup(this.props.userName, true);
        this.setState({backup: response.data['backup']});
      }

    render() {
        return (
            <div>
                <h2>Library Playlist Backup</h2>
                <form onSubmit={this.handleBackupSubmit}>
                <input type="submit" value="Prepare backup" />
                </form>

                {
                Object.values(this.state.backup).length ?
                    <a 
                        href={encodeURI("data:text/plain;utf-8," + JSON.stringify(this.state.backup).replace(/#/g, '%23'))} 
                        target="_blank" 
                        rel="noreferrer" 
                        download="spotify_backup.json"
                    >
                        Download back up
                    </a>
                : ""
                }
            </div>
        );
    }
}