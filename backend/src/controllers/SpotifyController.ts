import axios from 'axios';

const scopes = 'user-read-private playlist-read-private';

interface ICode {
  code: string;
}

class SpotifyController {
  private async login(): Promise<ICode> {
    try {
      const login = await axios.get(
        `https://accounts.spotify.com/authorize?response_type=code&client_id=${
          process.env.SPOTIFY_CLIENT_ID
        }${
          scopes ? '&scope=' + encodeURIComponent(scopes) : ''
        }&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}`,
      );

      return login.data;
    } catch (err) {
      console.log(`Login | ${err}`);
    }
  }

  private async getToken(): Promise<string> {
    try {
      const logged = await this.login();
      const code = logged.code;
      const apiToken = await axios.post(
        `https://accounts.spotify.com/api/token`,
        {
          grant_type: 'authorization_code',
          code,
          redirect_uri: process.env.REDIRECT_URI,
          client_id: process.env.SPOTIFY_CLIENT_ID,
          client_secret: process.env.SPOTIFY_SECRET_ID,
        },
      );

      return apiToken.data.access_token;
    } catch (err) {
      console.log(`GetToken | ${err}`);
    }
  }

  public async getItem(songName: string, bandName: string) {
    try {
      const spotifyToken = await this.getToken();

      const itemResponse = await axios.get(
        `https://api.spotify.com/v1/search?q=${songName}&type=track&market=US`,
        { headers: { Authorization: `Bearer ${spotifyToken}` } },
      );

      const spotifyItem = itemResponse.data.tracks.items.map((item: any) => {
        if (item?.artists[0].name == bandName) {
          return {
            id: item?.id,
            name: item?.name,
            artist: item?.artists[0].name,
          };
        }
      });

      return spotifyItem[0];
    } catch (err) {
      console.log(`GetItem | ${err}`);
    }
  }

  public async getTrack(trackId: string) {
    try {
      const spotifyToken = await this.getToken();

      const trackResponse = await axios.get(
        `https://api.spotify.com/v1/tracks/${trackId}`,
        { headers: { Authorization: `Bearer ${spotifyToken}` } },
      );
      return trackResponse.data.album.images[0].url;
    } catch (err) {
      console.log(`GetItem | ${err}`);
    }
  }
}

export default SpotifyController;
