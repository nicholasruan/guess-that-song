import React from 'react';
import '../App.css';
import DotLoader from 'react-spinners/DotLoader';

class GameStart extends React.Component {
	constructor(props) {
		super(props);
		const hash = window.location.hash
		.substring(1)
		.split('&')
		.reduce(function (initial, item) {
			if (item) {
				var parts = item.split('=');
				initial[parts[0]] = decodeURIComponent(parts[1]);
			}
			return initial;
		}, {});

		this.state = {
			token: hash.access_token,
			deviceId: "",
			loading: true
		};
	}

	componentDidMount() {
		if (this.state.token) {
		 // change the loggedIn variable, then start checking for the window.Spotify variable
		 this.setState({ loggedIn: true });
		 this.playerCheckInterval = setInterval(() => this.checkForPlayer() , 1000);
		}
	}

	checkForPlayer() {
		const { token } = this.state;
		// if the Spotify SDK has loaded
		if (window.Spotify !== null) {
			// cancel the interval
			clearInterval(this.playerCheckInterval);
			// create a new player
			this.player = new window.Spotify.Player({
				name: "Guess That Song",
				getOAuthToken: cb => { cb(token); },
			});
			// set up the player's event handlers
			this.createEventHandlers();
			// finally, connect!
			this.player.connect();
			this.setState({
				loading: false,
			})
		}
	}

	createEventHandlers() {
		// problem setting up the player
		this.player.on('initialization_error', e => { console.error(e); });
		// problem authenticating the user.
		// either the token was invalid in the first place,
		// or it expired (it lasts one hour)
		this.player.on('authentication_error', e => {
			console.error(e);
			this.setState({ loggedIn: false });
		});
		// currently only premium accounts can use the API
		this.player.on('account_error', e => { console.error(e); });
		// loading/playing the track failed for some reason
		this.player.on('playback_error', e => { console.error(e); });
		// Playback status updates
		// Ready
		this.player.on('ready', async data => {
			let { device_id } = data;
			console.log("Let the music play on!");
			// set the deviceId variable, then let's try
			// to swap music playback to *our* player!
			await this.setState({ deviceId: device_id });
		});
	}

	playSong() {
		console.log(this.state);
		const { deviceId, token } = this.state;
		// https://beta.developer.spotify.com/documentation/web-api/reference/player/transfer-a-users-playback/
		fetch("https://api.spotify.com/v1/me/player/play?device_id=" + deviceId, {
			method: "PUT",
			headers: {
				authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				// true: start playing music if it was paused on the other device
				// false: paused if paused on other device, start playing music otherwise
				"uris": ["spotify:track:6dGnYIeXmHdcikdzNNDMm2"],
				"position_ms" : 15000
			}),
		});
	}

	tester() {
		const { token } = this.state;
		fetch("https://api.spotify.com/v1/me/playlists", {
			method: "GET",
			headers: {
				authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			}
		})
		.then(function(response) {
			if (response.status !== 200) {
				console.log('Looks like there was a problem. Status Code: ' +
					response.status);
				return;
			}

			response.json().then(function(data) {
				console.log(data);
			});
		})
	}

  render() {
		if (this.state.loading) {
			return (
				<div className="App">
				<div className="loader">
					<DotLoader
						sizeUnit={"px"}
						size={190}
						color={'white'}
						loading={this.state.loading}
					/>
				</div>
					<div className="bg-overlay"></div>
					<div className="bg-image"></div>
				</div>
			)
		} else {
	    return (
	      <div className="App">
				<p>Logged In!</p>
				<button onClick={() => this.playSong()}>press me</button>
				<button onClick={() => this.tester()}>get user's playlists</button>
				<div className="bg-overlay"></div>
				<div className="bg-image"></div>
	      </div>
	    )
		}
  }
}

export default GameStart;
