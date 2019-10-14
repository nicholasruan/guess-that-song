import React from 'react';

function Genre(props) {
  return (
    <div>
      <h1 id="title">Genres</h1>
			<button onClick={props.playSong}>
        Click Me!
      </button>
    </div>
  );
}

export default Genre;
