import React from 'react'
import { useState } from 'react'
import './SinglePlayerStart.css'
const SinglePlayerStart = (props) => {
    const [playerName, setPlayerName] = useState("");

    return (
        <div className="single-start">
            <div className="singlestart-inputdiv"><input type="text" value={playerName} placeholder="Enter Name" onChange={(e) => setPlayerName(e.target.value)}></input></div>
            <div onClick={() => {
                if(playerName !== "")
                    props.onStart(playerName)
                }} 
                className="singlestart-btn">
                    START GAME
            </div>
        </div>

    )
}

export default SinglePlayerStart
