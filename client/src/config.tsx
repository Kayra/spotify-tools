interface Configuration {
    env: string;
    apiHost: string
}

export function getConfig(): Configuration {

    let config: Configuration = {
        'env': process.env.REACT_APP_NODE_ENV || 'dev',
        'apiHost': process.env.REACT_APP_API_HOST || ''
    };

    console.log("HIT", process.env.REACT_APP_API_HOST);

    return config;

}
