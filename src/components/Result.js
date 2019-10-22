import React from 'react';
import { Link } from 'react-router-dom'

function Result(props) {
	return (
		<div>
			<h1 id="title">Your Score:</h1>
			<h1 id="score">{localStorage.getItem('result')}/10</h1>
			<p><Link to="/gamestart" className="link">Replay</Link></p>
		</div>
	);
}

export default Result;
