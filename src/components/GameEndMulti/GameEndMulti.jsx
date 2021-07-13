import React from 'react'
import { Link } from 'react-router-dom'
import './GameEndMulti.css';
const GameEndMulti = (props) => {
    console.log(props)
    return (
        <div id="cardHeight" className="multiPlayerStart">
            <div>GAME OVER :(</div>
            <div className="scoreList">
                {
                    props.ranks.map((val,index) => <p>{index+1}. {val.name}</p>)
                }
            </div>
            <div class="game-end-options">
                <div onClick={props.replay} id="replay" className="option">Replay</div>
                <Link className="linkHome" to='/'><div className="option">Home</div></Link>
            </div>
        </div>
    )
}

export default GameEndMulti
