import React from 'react'
import './GameEnd.css';
const GameEnd = (props) => {
    return (
        <div className="game-end">
            <p>Game Ended bruh : sadly :(</p>
            <p>your score : {props.score}</p>
        </div>
    )
}

export default GameEnd
