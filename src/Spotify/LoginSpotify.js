export default {
  logInWithSpotify: (() => {
    let {
      REACT_APP_SPOTIFY_CLIENT_ID,
      REACT_APP_SPOTIFY_CALLBACK_URL,
      REACT_APP_SPOTIFY_SCOPES,
    } = process.env;

    window.location = [
      "https://accounts.spotify.com/authorize",
      `?client_id=${REACT_APP_SPOTIFY_CLIENT_ID}`,
      `&redirect_uri=${REACT_APP_SPOTIFY_CALLBACK_URL}`,
      `&scope=${REACT_APP_SPOTIFY_SCOPES}`,
      "&response_type=token",
      "&show_dialog=true"
    ].join('');
  })
};
