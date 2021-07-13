import React from 'react'
import './SinglePlayerStart.css'
const SinglePlayerStart = (props) => {
    return (
        <div className="single-start">
            <div className="start-btn start"><input type="text" placeholder="Enter Name"></input></div>
            <div onClick={props.onStart} className="start-btn btn">START GAME</div>
        </div>
    )
}

export default SinglePlayerStart
