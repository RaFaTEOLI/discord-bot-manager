import axios from 'axios';

const scopes = 'user-read-private playlist-read-private';
const redirect_uri = process.env.REDIRECT_URI;

interface ICode {
  code: string;
}

class SpotifyController {
  private async login(): Promise<ICode> {
    const login = await axios.get(
      'https://accounts.spotify.com/api/token' +
        '?response_type=code' +
        '&client_id=' +
        process.env.SPOTIFY_CLIENT_ID +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' +
        encodeURIComponent(redirect_uri)
    );
    return login.data;
  }

  private async getToken(): Promise<string> {
    const logged = await this.login();
    const code = logged.code;
    const apiToken = await axios.post(
      `https://accounts.spotify.com/api/token`,
      {
        grant_type: 'authorization_code',
        code,
        redirect_uri,
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_SECRET_ID,
      }
    );
    return apiToken.data.access_token;
  }

  public async getItem(songName: string, bandName: string) {
    const spotifyToken = await this.getToken();

    const itemResponse = await axios.get(
      `https://api.spotify.com/v1/search?q=${songName}&type=track&market=US`,
      { headers: { Authorization: `Bearer ${spotifyToken}` } }
    );

    const spotifyItem = itemResponse.data.tracks.items.map((item: any) => {
      if (item.artists[0].name == bandName) {
        return {
          id: item.id,
          name: item.name,
          artist: item.artists[0].name,
        };
      }
    });

    return spotifyItem[0];
  }

  public async getTrack(trackId: string) {
    const spotifyToken = await this.getToken();

    const trackResponse = await axios.get(
      `https://api.spotify.com/v1/tracks/${trackId}`,
      { headers: { Authorization: `Bearer ${spotifyToken}` } }
    );
    return trackResponse.data.album.images[0].url;
  }
}

export default SpotifyController;
