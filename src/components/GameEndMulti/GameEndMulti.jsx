import React from 'react'
import { Link } from 'react-router-dom'

const GameEndMulti = (props) => {
    console.log(props)
    return (
        <div className="game-end">
            <div className="game-end-item1">GAME OVER :(</div>
            <div className="game-end-item2">your score : {props.score}</div>
            <div className="scoreList">
                {
                    props.ranks.map((val,index) => <p>{index+1}. {val.name}</p>)
                }
            </div>
            <div class="game-end-options">
                <div onClick={props.replay} className="option">Replay</div>
                <Link className="linkHome" to='/'><div className="option">Home</div></Link>
            </div>
        </div>
    )
}

export default GameEndMulti
