import axios from "axios";

import { getConfig } from './config';


class Api {

    apiHost = getConfig().apiHost;

    async userCreate(userName: string): Promise<any> {

        const expectedErrors = ['409', '500']

        const response = await axios({
            method: 'POST',
            url: `${this.apiHost}/users`,
            data: {username: userName}
        }).catch(error => {
            if (expectedErrors.some(expectedError => error.message.includes(expectedError))) {
                console.log(error.response.data);
            }
        });

        return response;

    }

    async spotifyFind(userName: string, track?: string, artist?: string): Promise<any> {

        const expectedErrors = ['404', '422']

        const response = await axios({
            method: 'GET',
            url: `${this.apiHost}/spotify/find`,
            params: {
                username: userName,
                track: track,
                artist: artist
            }
        }).catch(error => {
            if (expectedErrors.some(expectedError => error.message.includes(expectedError))) {
                console.log(error.response.data);
            }
        });

        return response;

    }

    async spotifyBackup(userName: string): Promise<any> {

    } 

    async spotifyTimeline(userName: string): Promise<any> {

    }

}

export default Api;