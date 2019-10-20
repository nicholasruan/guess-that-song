import React, { useState, useEffect } from 'react';

function SongDisplay(props) {
		const nextQuestion = () => {
			if (props.correctSong) {
				alert("correct");
			} else {
				alert("wrong");
			}
			props.next();
		}

		if (props.playlist[props.idx] === undefined) {
			return(
				<div id='test'>

				</div>
			)
		} else {
			let trackName = props.playlist[props.idx].track.name;

			if (trackName.length >= 32){
				trackName = trackName.substring(0, 32) + '...';
			}

			/* TODO:
			Change color to green when correct answer is picked
			Change color to red when wrong answer is picked
			Show score at the end of quiz
			*/

			return(
				<div className='song-container' onClick={() => {nextQuestion()}}>
					<img className='album-img' src={props.playlist[props.idx].track.album.images[0].url} width='150px' height='150px'></img>
					<div className="trackname-artist">
					<h2 className="album-details">{trackName}</h2> <h2 className="album-details" id="artist">{props.playlist[props.idx].track.artists[0].name}</h2>
					</div>
				</div>
			)
		}

}

export default SongDisplay;
