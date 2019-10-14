import React from 'react';

function Game(props) {


  return (
    <div>
      Hello from Game!
      <button onClick={props.playSong}>
        Click Me!
      </button>
    </div>
  );
}

export default Game;
