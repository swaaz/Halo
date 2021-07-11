import React, { useState } from 'react'
import './SinglePlayer.css';
const SinglePlayer = () => {

    
    const [path, setPath] = useState([]);
    const [currPath, setCurrPath] = useState([]);
    const [isPlaying, setIsPlaying] = useState(true);
    const [counter, setCounter] = useState(0);
    const [tempCounter, setTempCounter] = useState(counter);

    const clearScreen = () => {
        for(let i=1; i<= 25; ++i){
            document.getElementById(i.toString()).style.backgroundColor = 'white'
        }
    }
    const botTurn = () => {
        const randomVal =  Math.floor(Math.random() * 25) + 1 ;
        console.log('bot');
        setIsPlaying(true);
        setPath(prev => [...prev, randomVal]);
        setCounter(prev => prev + 1);
        setTempCounter(counter + 3);
    }

    const clickHandler = (e) => {
        if(isPlaying){
            document.getElementById(e.target.id).style.backgroundColor = 'green';

            if(tempCounter > 1){
                if(path[currPath.length] !== parseInt(e.target.id) && tempCounter !== 1) {
                    document.getElementById(e.target.id).style.backgroundColor = '#f00';
                    alert('You lost bruh!! Oops!!');
                }
                setTempCounter(prev => prev - 1);
                setCurrPath((prev) => [...prev, parseInt(e.target.id)]);
            }
            else{
                console.log(e.target.id);
                setPath(prev => [...prev, parseInt(e.target.id)]);
                clearScreen();
                setCurrPath([]);
                setCounter(prev => prev + 1);
                setTempCounter(counter + 3);
                botTurn();
            }

        }
    }

    console.log('path');
    console.log(path);
    console.log('currpath');
    console.log(currPath);
    console.log('counter');
    console.log(counter);
    console.log(' temp');
    console.log(tempCounter);
    return (
        <div>
            <div className="gameContainer">
                <div className="gameInfo">
                    <h1 className="header">Halo </h1>
                    <h4 className="header">Playing vs Bot </h4>
                    <div className="score">Score</div>
                    <div className="score">Player Turn :
                        {
                            isPlaying? 'You' : 'Bot'
                        }
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
            </div>
        </div>
    )
}

export default SinglePlayer
