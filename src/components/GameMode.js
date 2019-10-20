import React, { useState, useEffect } from 'react';
import SongDisplay from './SongDisplay';
import DotLoader from 'react-spinners/DotLoader';

function GameMode(props) {
  const playlistId = props.location.pathname.split("/")[3];
  const [playlistData, setPlaylistData] = useState([
    {'track':{'name':'', 'artists': [''], 'album': {'images' :[{'url' : ''}]}}}
  ]);
  const [playlistPosition, setPlaylistPosition] = useState(0);
  const [idx1, setIdx1] = useState(0);
  const [idx2, setIdx2] = useState(0);
  const [loading, setLoad] = useState(true);

  useEffect(() => {
    props.playlistTracks(playlistId).then(data => setPlaylistData(shuffleArr(data.tracks.items).slice(0, 15)));
    twoRandomIdx(playlistPosition);
    setLoad(false);
  }, [props, playlistId]);

  const shuffleArr = (array) => {
    for(let i = array.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * i)
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
    return array;
  }

  const twoRandomIdx = (songIdx) => {
    let vals = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
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
        <SongDisplay
          idx={idx1}
          playlist={playlistData}
        />
        <SongDisplay
          idx={idx2}
          playlist={playlistData}
        />
        <SongDisplay
          idx={playlistPosition}
          playlist={playlistData}
        />
	    </div>
	  );
	}
}

export default GameMode;
