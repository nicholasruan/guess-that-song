import React from 'react';
import '../App.css';
import Login from "../Spotify/LoginSpotify.js";

class LandingPage extends React.Component {
	state = {

	}

	loginClick() {
    Login.logInWithSpotify();
	}

	render() {
		return(
			<div className="App">
				<h1 id="title">GUESS THAT SONG</h1>
				<p id="landing-text">How well do you know your music? Test your music knowledge across multiple genres and tracks. Choose from either your own personal Spotify playlists or Spotify's premade genre playlists. To play, first make sure your volume is turned on. On each question, select the choice that matches the song that is playing. Good luck and have fun!</p>
				<p id="pre-login">You must have a Spotify Premium account to play.</p>
				<img id="spotify-login" src={require("../image-asset.png")} alt="spotify-login" width="275" onClick={() => this.loginClick()}></img>
				<p id="footer">© Copyright 2019</p>
			<div className="bg-overlay"></div>
			<div className="bg-image"></div>
			</div>
		)
	}
}

export default LandingPage;
