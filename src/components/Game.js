import React from 'react';
import { Link } from 'react-router-dom'

function Game(props) {
  return (
    <div>
      <h1 id="title">Choose One</h1>
      <h2 className="game-choices"><Link to="/gamestart/genremenu" className="link">Genres</Link></h2>
      <h2 className="game-choices"><Link to="/gamestart/playlistmenu" className="link">Playlists</Link></h2>
    </div>
  );
}

export default Game;
