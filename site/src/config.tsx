interface Configuration {
    env: string;
    spotify_token: string
}

export function getConfig(): Configuration {

    let config: Configuration = {
        'env': process.env.NODE_ENV || 'default',
        'spotify_token': process.env.REACT_APP_SPOTIFY_TOKEN || ''
    };

    return config;

}
