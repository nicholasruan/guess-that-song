import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import DotLoader from 'react-spinners/DotLoader';

function Genre(props) {
	const [loading, setLoad] = useState(true);
	const [genreList, setGenres] = useState([
		['https://t.scdn.co/images/26a60378-a374-4cd7-b894-28efa5e154cb.jpg','37i9dQZF1DX10zKzsJ2jva'],
		['https://t.scdn.co/media/derived/pop-274x274_447148649685019f5e2a03a39e78ba52_0_0_274_274.jpg','37i9dQZF1DXcBWIGoYBM5M'],
		[ 'https://t.scdn.co/media/derived/rock_9ce79e0a4ef901bbd10494f5b855d3cc_0_0_274_274.jpg','37i9dQZF1DWXRqgorJj26U'],
		['https://t.scdn.co/media/original/hip-274_0a661854d61e29eace5fe63f73495e68_274x274.jpg','37i9dQZF1DX0XUsuxWHRQd'],
		['https://t.scdn.co/media/derived/edm-274x274_0ef612604200a9c14995432994455a6d_0_0_274_274.jpg','37i9dQZF1DX4dyzvuaRJ0n'],
		['https://t.scdn.co/media/derived/classical-274x274_abf78251ff3d90d2ceaf029253ca7cb4_0_0_274_274.jpg','37i9dQZF1DWWEJlAGA9gs0'],
		['https://t.scdn.co/media/derived/r-b-274x274_fd56efa72f4f63764b011b68121581d8_0_0_274_274.jpg','37i9dQZF1DX4SBhb3fqCJd'],
		['https://t.scdn.co/images/69c728f3bd9643a5ab0f4ef5a79919f1.jpeg','37i9dQZF1DX9tPFwDMOaN1'],
		['https://t.scdn.co/media/derived/jazz-274x274_d6f407453a1f43d3163c55cca624a764_0_0_274_274.jpg', '37i9dQZF1DXbITWG1ZJKYt'],
		 ['https://t.scdn.co/images/f4f0987fcab446fcaa7173acb5e25701.jpeg', '37i9dQZF1DX1MUPbVKMgJE']
	])

	useEffect(() => {
		setLoad(false);
	}, [loading])

	const genreRender = genreList.map((genre) =>
		<Link to={{ pathname: '/gamestart/gamemode/' + genre[1]}} key={genre[1]}><img className="playlist-img" src={genre[0]} width="175px"></img></Link>
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
	      <h1 id="playlists-title">Genres</h1>
				<div className="container">
					{genreRender}
				</div>
	    </div>
	  );
	}
}

export default Genre;
