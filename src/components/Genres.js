import React, { useState, useEffect } from "react";
import DotLoader from 'react-spinners/DotLoader';

function Genre(props) {
	const [loading, setLoad] = useState(true);
	const [genreList, setGenres] = useState([
		'https://t.scdn.co/media/derived/toplists_11160599e6a04ac5d6f2757f5511778f_0_0_275_275.jpg',
		'https://t.scdn.co/images/26a60378-a374-4cd7-b894-28efa5e154cb.jpg',
		'https://t.scdn.co/media/derived/pop-274x274_447148649685019f5e2a03a39e78ba52_0_0_274_274.jpg',
		'https://t.scdn.co/media/derived/rock_9ce79e0a4ef901bbd10494f5b855d3cc_0_0_274_274.jpg',
		'https://t.scdn.co/media/original/hip-274_0a661854d61e29eace5fe63f73495e68_274x274.jpg',
		'https://t.scdn.co/media/derived/edm-274x274_0ef612604200a9c14995432994455a6d_0_0_274_274.jpg',
		'https://t.scdn.co/media/derived/decades_9ad8e458242b2ac8b184e79ef336c455_0_0_274_274.jpg',
		'https://t.scdn.co/media/derived/classical-274x274_abf78251ff3d90d2ceaf029253ca7cb4_0_0_274_274.jpg',
		'https://t.scdn.co/media/derived/r-b-274x274_fd56efa72f4f63764b011b68121581d8_0_0_274_274.jpg',
		'https://t.scdn.co/images/f4f0987fcab446fcaa7173acb5e25701.jpeg'
	])

	useEffect(() => {
		setLoad(false);
	}, [loading])

	const genreRender = genreList.map((genre) =>
		<img className="playlist-img" src={genre} key={genre} width="175px"></img>
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
