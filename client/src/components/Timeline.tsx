import React from 'react';
import Api from '../Api';
import TimelineHandler from './TimelineHandler';

interface IProps {
    api: Api;
    userName: string;
}

interface IState {
    dates: object;
}

export default class Timeline extends React.Component<IProps, IState> {

    state: IState;

    constructor(props: IProps) {
        super(props);
        this.state = {
            dates: {}
        };
        this.handleTimelineSubmit = this.handleTimelineSubmit.bind(this);
    }

    async handleTimelineSubmit(event:any): Promise<void> {
    
        event.preventDefault();
        const response = await this.props.api.spotifyTimeline(this.props.userName);
        const datedTracks = response.data['timeline'];
    
        const dates: object[] = [];
        
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
            <div>
                <h2>Song Timeline</h2>
                <form onSubmit={this.handleTimelineSubmit}>
                    <input type="submit" value="Get timeline" />
                </form>
                {
                Object.values(this.state.dates).length ?
                <TimelineHandler dates={this.state.dates}/>
                : ""
                }
            </div>
        );
    }
}