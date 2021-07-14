import React from 'react'
import './GameEnd.css';
import { Link } from "react-router-dom";
const GameEnd = (props) => {
    return (
        <div className="gameend-container">
            <div className="gameend-over">GAME OVER :(</div>
            <div className="gameend-score">your score : {props.score}</div>
            <div class="gameend-options">
                <a className="gameend-link" href='/single'><div className="gameend-option gameend-option1">Replay</div></a>
                <Link className="gameend-linkHome" to='/'><div className="gameend-option gameend-option2">Home</div></Link>
            </div>
        </div>
    )
}

export default GameEnd
