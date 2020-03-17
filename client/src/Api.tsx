import axios from "axios";

import { getConfig } from './config';


// interface PlayListTrackMapping {
//     [playlistName: string]: SpotifyApi.PlaylistTrackObject[]
//   }


class Api {

    apiHost = getConfig().apiHost;

    async userCreate(userName: string): Promise<any> {

        const response = await axios({
            method: 'POST',
            url: `${this.apiHost}/users`,
            data: {username: userName}
        }).catch(error => {
            if (error.message.includes('409')) {
                console.log(error.response.data);
            }
        });

        return response;

    }

    async spotifyFind(userName: string, track?: string, artist?: string): Promise<any> {

    }

    async spotifyBackup(userName: string): Promise<any> {

    } 

    async spotifyTimeline(userName: string): Promise<any> {
        
    }

}

export default Api;