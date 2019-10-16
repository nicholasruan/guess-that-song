import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import DotLoader from 'react-spinners/DotLoader';

function Playlists(props) {

	const [playlists, setPlaylists] = useState([]);
	const [loading, setLoad] = useState(true);

	useEffect(() => {
		setLoad(false);
		setPlaylists(props.getPlaylists);
	}, [playlists, loading])


	const playlistsRender = playlists.map((playlist) =>
		<Link to={{ pathname: '/gamestart/gamemode/' + playlist.id}} key={playlist.name}><img className="playlist-img" src={playlist.images[0].url} width="175px"></img></Link>
	);

	if (loading) {
		return(
			<div className="loader">
				<DotLoader
					sizeUnit={"px"}
					size={190}
					color={'white'}
					loading={loading}
				/>
			</div>
		)
	} else {
		return (
	    <div>
	      <h1 id="playlists-title">Playlists</h1>
				<div className="container">
					{playlistsRender}
				</div>
	    </div>
	  );
	}
}

export default Playlists;
