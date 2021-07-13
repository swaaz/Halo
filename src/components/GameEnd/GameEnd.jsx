import React from 'react'
import './GameEnd.css';
import { Link } from "react-router-dom";
const GameEnd = (props) => {
    return (
        <div className="game-end">
            <div className="game-end-item1">GAME OVER :(</div>
            <div className="game-end-item2">your score : {props.score}</div>
            <div class="game-end-options">
                <a className="link" href='/single'><div className="option">Replay</div></a>
                <Link className="linkHome" to='/'><div className="option">Home</div></Link>
            </div>
        </div>
    )
}

export default GameEnd
