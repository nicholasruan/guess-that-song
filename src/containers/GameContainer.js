import React from 'react';
import '../App.css';
import { Switch, Route } from 'react-router-dom';
import GameMenu from '../components/GameMenu';
import Genres from '../components/Genres';
import GameMode from '../components/GameMode';
import Playlists from '../components/Playlists';
import DotLoader from 'react-spinners/DotLoader';

class GameContainer extends React.Component {
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
			loading: true,
			userPlaylist: null
		};

		this.playSong = this.playSong.bind(this);
		this.getUserPlaylists = this.getUserPlaylists.bind(this);
		this.playlistTracks = this.playlistTracks.bind(this);
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
			this.getUserPlaylists();
			this.setState({
				loading: false,
			})
			await this.setState({ deviceId: device_id });
		});
	}

	playSong(uri) {
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
				"uris": [uri],
				"position_ms" : 55000
			}),
		});
	}

	getUserPlaylists() {
		const { token } = this.state;
		fetch("https://api.spotify.com/v1/me/playlists?limit=10", {
			method: "GET",
			headers: {
				authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			}
		})
		.then((resp) => resp.json()) // Transform the data into json
  	.then((data) => {
    	this.setState({
				userPlaylist: data.items
			})
    })
	}

	async playlistTracks(playlistId) {
		const { token } = this.state;
		// https://api.spotify.com/v1/browse/categories
		let response = await fetch("https://api.spotify.com/v1/playlists/" + playlistId, {
			method: "GET",
			headers: {
				authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			}
		})
		let data = await response.json();
		return data;
		// .then((resp) => resp.json()) // Transform the data into json
		// .then((data) => {
		// 	return data;
		// })
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
					<Switch>
						<Route
							exact path="/gamestart"
							render={(routerProps) => <GameMenu {...routerProps}
							/>}/>
						<Route
							path="/gamestart/genremenu"
							render={(routerProps) => <Genres {...routerProps}
							/>}/>
						<Route
							path="/gamestart/playlistmenu"
							render={(routerProps) => <Playlists {...routerProps}
							getPlaylists={this.state.userPlaylist}
							/>}/>
						<Route
							path="/gamestart/gamemode/:playlistId"
							render={(routerProps) => <GameMode {...routerProps}
							playSong={this.playSong}
							playlistTracks={this.playlistTracks}
							/>}/>
					</Switch>
					<p id="footer">© Copyright 2019</p>
					<div className="bg-overlay"></div>
					<div className="bg-image"></div>
	      </div>
	    )
		}
  }
}

export default GameContainer;
