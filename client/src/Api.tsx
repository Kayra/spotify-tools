import axios from "axios";
import SpotifyWebApi from 'spotify-web-api-js';

import { getConfig } from './config';


interface PlayListTrackMapping {
    [playlistName: string]: SpotifyApi.PlaylistTrackObject[]
  }


class Api {

    apiHost = getConfig().apiHost;

    async createUser(userName: string): Promise<any> {

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

}

export default Api;