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
                    <h1 className="header">Halo </h1>
                    <h4 className="header">Playing vs Bot </h4>
                    <div className="score">Score</div>
                    <div className="score">Player Turn : swaaz
                    </div>
                </div>
                <div className="GridContainer">
                    <div onClick={clickHandler} className="box" id="1"></div>
                    <div onClick={clickHandler} className="box" id="2"></div>
                    <div onClick={clickHandler} className="box" id="3"></div>
                    <div onClick={clickHandler} className="box" id="4"></div>
                    <div onClick={clickHandler} className="box" id="5"></div>
                    <div onClick={clickHandler} className="box" id="6"></div>
                    <div onClick={clickHandler} className="box" id="7"></div>
                    <div onClick={clickHandler} className="box" id="8"></div>
                    <div onClick={clickHandler} className="box" id="9"></div>
                    <div onClick={clickHandler} className="box" id="10"></div>
                    <div onClick={clickHandler} className="box" id="11"></div>
                    <div onClick={clickHandler} className="box" id="12"></div>
                    <div onClick={clickHandler} className="box" id="13"></div>
                    <div onClick={clickHandler} className="box" id="14"></div>
                    <div onClick={clickHandler} className="box" id="15"></div>
                    <div onClick={clickHandler} className="box" id="16"></div>
                    <div onClick={clickHandler} className="box" id="17"></div>
                    <div onClick={clickHandler} className="box" id="18"></div>
                    <div onClick={clickHandler} className="box" id="19"></div>
                    <div onClick={clickHandler} className="box" id="20"></div>
                    <div onClick={clickHandler} className="box" id="21"></div>
                    <div onClick={clickHandler} className="box" id="22"></div>
                    <div onClick={clickHandler} className="box" id="23"></div>
                    <div onClick={clickHandler} className="box" id="24"></div>
                    <div onClick={clickHandler} className="box" id="25"></div>
                </div>
                {/* {
                    isGameOver? <GameEnd /> : null
                } */}
            </div>
        </div>
    )
}

export default Multiplayer
