import React from 'react'
import './Multiplayer.css'
const Multiplayer = () => {
    const clickHandler = (e) => {
        console.log(e);
    }
    return (
        <div>
            <div className="gameContainer">
                <div className="gameInfo">
                    <h1 className="header headerhalo">Halo </h1>
                    <h4 className="header">Playing vs Bot </h4>
                    <div className="score">Score</div>
                    <div className="score">Player Turn : swaaz
                    </div>
                </div>
                <div className="GridContainer">
                    {
                        [...Array(25)].map((x, i) => <div onClick={clickHandler} className="box" id={(i+1).toString()} /> )
                    }
                </div>
                {/* {
                    isGameOver? <GameEnd /> : null
                } */}
            </div>
        </div>
    )
}

export default Multiplayer
