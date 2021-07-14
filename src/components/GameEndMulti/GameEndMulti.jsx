import React from 'react'
import { Link } from 'react-router-dom'
import './GameEndMulti.css';
const GameEndMulti = (props) => {
    console.log(props)
    return (
        <div id="cardHeight" className="multiend-container">
            <div className="multiend">
            <div className="multiend-over">GAME OVER :(</div>
            <div className="scoreList">
                {
                    props.ranks.map((val,index) => <p>{index+1}. {val.name}</p>)
                }
            </div>
            <div class="multiend-options">
                <div onClick={props.replay} id="replay" className="multiend-option multiend-option1">Replay</div>
                <Link className="multiend-linkHome" to='/'><div className="multiend-option multiend-option2">Home</div></Link>
            </div>
            </div>
        </div>
    )
}

export default GameEndMulti
