import React from 'react'
import './SinglePlayerStart.css'
const SinglePlayerStart = (props) => {
    return (
        <div className="single-start">
            <div className="start">Start Game?</div>
            <div onClick={props.onStart} className="start-btn">YES</div>
        </div>
    )
}

export default SinglePlayerStart
