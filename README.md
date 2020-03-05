# Spotify Tools

A web application that offers concise set of tools designed to help users interact with Spotify. 

Built from personal needs based on how I use Spotify. Feel free to request features in the [project issues](https://github.com/Kayra/spotify-tools/issues).

## Design

![UI design](docs/ui_design.png)

### Feature ideas:
* Find playlists that contain provided song
* Back up playlists as text file
* Song timeline
* Playlist analysis
  - Top 5 genres (with %s)
  - Top artists

### Technologies used:
* [Fastapi](https://fastapi.tiangolo.com)
* [Python Spotify Wrapper (Spotipy)](https://github.com/plamere/spotipy)
* [Typescript](https://www.typescriptlang.org)
* [React](https://reactjs.org)
* [Spotify API](https://developer.spotify.com/documentation/web-api/)

## Development Installation and Use

### Server

Install the application:

```bash
make install
```

Start the application (after installation):

```bash
make start
```

Connect to the api Docker container bash (while the application is running):

```bash
make api-shell
```

Connect to the api Mongo client (while the application is running):

```bash
make mongo-shell
```

#### Client

Install node modules:

```bash
cd client
npm i
```

Start the react app client :

```bash
cd client
npm run start
```

