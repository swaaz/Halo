import React from 'react'
import './SinglePlayerStart.css'
const SinglePlayerStart = (props) => {
    return (
        <div className="single-start">
            <p>start?</p>
            <div onClick={props.onStart} className="start-btn">yess</div>
        </div>
    )
}

export default SinglePlayerStart
