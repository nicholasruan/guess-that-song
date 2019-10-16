import React, { useState, useEffect } from 'react';

function GameMode(props) {
  const playlistId = props.location.pathname.split("/")[3];
  const [playlistData, setPlaylistData] = useState([{'track':1}]);


  useEffect(() => {
    props.playlistTracks(playlistId).then(data => setPlaylistData(data.tracks.items));
  }, [props, playlistId]);

  // console.log(playlistData[0].track.uri);
  return (
    <div>
      {props.playSong(playlistData[0].track.uri)}
    </div>
  )
}

export default GameMode;
