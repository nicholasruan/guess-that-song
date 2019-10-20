import React, { useState, useEffect } from 'react';
import SongDisplay from './SongDisplay';
import DotLoader from 'react-spinners/DotLoader';

function GameMode(props) {
  const playlistId = props.location.pathname.split("/")[3];
  const [playlistData, setPlaylistData] = useState([
    {'track':{'name':'', 'uri': '', 'artists': [''], 'album': {'images' :[{'url' : ''}]}}}
  ]);
  const [playlistPosition, setPlaylistPosition] = useState(0);
  const [idx1, setIdx1] = useState(0);
  const [idx2, setIdx2] = useState(0);
  const [loading, setLoad] = useState(true);

  useEffect(() => {
    props.playlistTracks(playlistId).then(data => setPlaylistData(shuffleArr(data.tracks.items).slice(0, 30)));
    twoRandomIdx(playlistPosition);
    setLoad(false);
  }, [props, playlistId]);

  const shuffleArr = (array) => {
    for(let i = array.length - 1; i >= 0; i--){ //2
      const j = Math.floor(Math.random() * (i + 1))
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
    return array;
  }

  const twoRandomIdx = (songIdx) => {
    let vals = [];
    for (let i = 0; i < 30; i++) {
      vals.push(i);
    }
    vals.splice(songIdx, 1);
    let pos1 = Math.floor(Math.random() * vals.length);
    let idx1 = vals[pos1];
    vals.splice(pos1, 1);
    let pos2 = Math.floor(Math.random() * vals.length);
    let idx2 = vals[pos2];
    vals.splice(pos2, 1);
    setIdx1(idx1);
    setIdx2(idx2);
  }

  const nextSong = () => {
    setPlaylistPosition(playlistPosition + 1);
    twoRandomIdx(playlistPosition + 1);
  }

  let songIdx = [idx1, idx2, playlistPosition];
  shuffleArr(songIdx);
  const renderSongDisplay = songIdx.map((idx) => {
    if (idx == playlistPosition) {
      return (
        <SongDisplay
            idx={idx}
            playlist={playlistData}
            correctSong={true}
            next={nextSong}
          />
      )
    } else {
      return (
        <SongDisplay
            idx={idx}
            playlist={playlistData}
            correctSong={false}
            next={nextSong}
          />
      )
    }
  });

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
		);
	} else {
		return (
	    <div className="game-display-container">
        {props.playSong(playlistData[playlistPosition].track.uri)}
        {renderSongDisplay}
        {console.log(songIdx)}
	    </div>
	  );
	}
}

export default GameMode;
