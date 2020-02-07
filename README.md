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
* Fastapi
* Typescript
* React
* [Spotify API](https://developer.spotify.com/documentation/web-api/)
* [Spotify API wrapper](https://github.com/JMPerez/spotify-web-api-js)

## Set up

### Server

Create a venv and install the requirements:

```bash
cd api/app
python3 -m venv venv
pip install -r requirements.txt
```

Start the server:

```bash
cd api/app
uvicorn main:app --reload
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

