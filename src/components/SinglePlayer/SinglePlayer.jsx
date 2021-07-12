import React, { useState } from 'react'
import GameEnd from '../GameEnd/GameEnd';
import './SinglePlayer.css';
import Sound from 'react-sound';
import bgMusic from '../../audio/bg.mp3';
import useSound from 'use-sound';
import SinglePlayerStart from '../SinglePlayerStart/SinglePlayerStart'
const SinglePlayer = () => {

    const [path, setPath] = useState([]);
    const [currPath, setCurrPath] = useState([]);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [counter, setCounter] = useState(0);
    const [tempCounter, setTempCounter] = useState(counter);

    const delayClickFunction = (element) => {
        setTimeout(botClick(element), 50000);
    }
    const delayClearFunction = () => {
        setTimeout(clearScreen, 500);
    }
    const delayBotFunction = (lastElement) => {
        setTimeout(botTurn(lastElement), 999999);
    }
    const clearScreen = () => {
        for(let i=1; i<= 25; ++i){
            document.getElementById(i.toString()).style.backgroundColor = 'white'
        }
    }
    const botClick = (item) => {
       document.getElementById(item.toString()).style.backgroundColor = 'green';
    }
    const botTurn = (lastElement) => {
        const randomVal =  Math.floor(Math.random() * 25) + 1 ;
        // console.log('bot');
        // console.log(path);
        setPath(prev => [...prev, randomVal]);
        setCounter(prev => prev + 1);
        setTempCounter(counter + 3);
        path.forEach(item => delayClickFunction(item));
        delayClickFunction(lastElement);
        delayClickFunction(randomVal);
        setIsPlaying(true);
        delayClearFunction();
    }

    const clickHandler = (e) => {
        if(isPlaying && !isGameOver && isGameStarted){
            document.getElementById(e.target.id).style.backgroundColor = 'green';

            if(tempCounter > 1){
                if(path[currPath.length] !== parseInt(e.target.id) && tempCounter !== 1) {
                    document.getElementById(e.target.id).style.backgroundColor = '#f00';
                    setIsGameOver(true);
                }
                setTempCounter(prev => prev - 1);
                setCurrPath((prev) => [...prev, parseInt(e.target.id)]);
            }
            else{
                // console.log(e.target.id);
                clearScreen();
                setPath(prev => [...prev, parseInt(e.target.id)]);
                setCurrPath([]);
                setCounter(prev => prev + 1);
                setTempCounter(counter + 3);
                delayBotFunction(parseInt(e.target.id));
            }

        }
    }

    const onStart = () => setIsGameStarted(true);

    // console.log('path');
    // console.log(path);
    // console.log('currpath');
    // console.log(currPath);
    // console.log('counter');
    // console.log(counter);
    // console.log(' temp');
    // console.log(tempCounter);
    return (
        <div>
            <Sound url={bgMusic} playStatus={Sound.status.PLAYING} loop={true} />
            <div className="gameContainer">
                <div className="gameInfo">
                    <h1 className="header headerhalo">Halo </h1>
                    <h4 className="header">Playing vs Bot </h4>
                    <div className="score">Score : {counter*10}</div>
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
                {
                    isGameStarted? null : <SinglePlayerStart onStart={onStart} />
                }
                {
                    isGameOver? <GameEnd score={counter * 10} /> : null
                }
            </div>
        </div>
    )
}

export default SinglePlayer
