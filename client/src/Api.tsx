import axios from "axios";

import { getConfig } from './config';


class Api {

    apiHost = getConfig().apiHost;

    isExpectedError(errorMessage: string, expectedErrors: Array<string>): boolean {
        return expectedErrors.some(expectedError => errorMessage.includes(expectedError));
    }

    async userCreate(userName: string): Promise<any> {

        const expectedErrors = ['409', '500']

        const response = await axios({
            method: 'POST',
            url: `${this.apiHost}/users`,
            data: {username: userName}
        }).catch(error => {
            if (this.isExpectedError(error.message, expectedErrors)) {
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
            if (this.isExpectedError(error.message, expectedErrors)) {
                console.log(error.response.data);
            }
        });

        return response;

    }

    async spotifyBackup(userName: string, simple?: boolean): Promise<any> {

        const expectedErrors = ['404', '422']

        const response = await axios({
            method: 'GET',
            url: `${this.apiHost}/spotify/backup`,
            params: {
                username: userName,
                simple: simple
            }
        }).catch(error => {
            if (this.isExpectedError(error.message, expectedErrors)) {
                console.log(error.response.data);
            }
        });

        return response;

    } 

    async spotifyTimeline(userName: string): Promise<any> {

    }

}

export default Api;