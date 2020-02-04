interface Configuration {
    env: string;
    spotifyClientId: string
    spotifyClientSecret: string
}

export function getConfig(): Configuration {

    let config: Configuration = {
        'env': process.env.NODE_ENV || 'default',
        'spotifyClientId': process.env.REACT_APP_SPOTIFY_CLIENT_ID || '',
        'spotifyClientSecret': process.env.REACT_APP_SPOTIFY_CLIENT_SECRET || ''
    };

    return config;

}
