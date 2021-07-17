import React, { useState } from 'react'
import GameEnd from '../GameEnd/GameEnd';
import './SinglePlayer.css';
import Sound from 'react-sound';
import bgMusic from '../../assets/audio/bg.mp3';
import useSound from 'use-sound';
import SinglePlayerStart from '../SinglePlayerStart/SinglePlayerStart'
import clickSound from '../../assets/audio/click.mp3';
import deathSound from '../../assets/audio/DeathSound.mp3';
import axios from 'axios';
const { REACT_APP_APIS } = process.env;
const SinglePlayer = () => {
    const [clickPlay] = useSound(clickSound);
    const [deathPlay] = useSound(deathSound);

    const [path, setPath] = useState([]);
    const [currPath, setCurrPath] = useState([]);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [counter, setCounter] = useState(0);
    const [tempCounter, setTempCounter] = useState(counter);
    const [isMusicPlaying, setIsMusicPlaying] = useState(true);
    const [playerName, setPlayerName] = useState('');
    // function to click after delay
    const delayClickFunction = (element) => {
        setTimeout(botClick(element), 50000);
    }
    // function to clear color after delay
    const delayClearFunction = () => {
        setTimeout(clearScreen, 500);
    }
    // function to pass player's turn to bot after delay
    const delayBotFunction = (lastElement) => {
        setTimeout(botTurn(lastElement), 999999);
    }
    // function to clear grid
    const clearScreen = () => {
        for(let i=1; i<= 25; ++i){
            document.getElementById(i.toString()).style.backgroundColor = 'white'
        }
    }
    // function to click on the box
    const botClick = (item) => {
       const col = document.getElementById(item.toString()).style.backgroundColor;
            const colorArray = col.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/i)
            console.log(colorArray)
            if(colorArray === null) document.getElementById(item.toString()).style.backgroundColor = 'rgb(0,255,0,0.9 )';
            else{
                // document.getElementById(item.toString()).style.backgroundColor = `rgb(${parseInt(colorArray[1]) + 100}, 255, ${parseInt(colorArray[3]) + 100} )`;
                document.getElementById(item.toString()).style.backgroundColor = 'yellow';
            }
    }
    // function perform bot's turn
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

    //function to capture the click of the user
    const clickHandler = (e) => {
        if(isPlaying && !isGameOver && isGameStarted){
            // const backgroundStyle = window.getComputedStyle(e.target, null).getPropertyValue("background-color");
            const col = document.getElementById(e.target.id).style.backgroundColor;
            const colorArray = col.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/i)
            console.log(colorArray)
            if(colorArray === null) document.getElementById(e.target.id).style.backgroundColor = 'rgb(0, 255, 0)';
            else{
                // document.getElementById(e.target.id).style.backgroundColor = `rgb(${parseInt(colorArray[1]) + 100}, 255, ${parseInt(colorArray[3]) + 100} )`;
                document.getElementById(e.target.id).style.backgroundColor = 'yellow';
            }


            clickPlay();
            
            if(tempCounter > 1){
                if(path[currPath.length] !== parseInt(e.target.id) && tempCounter !== 1) {
                    deathPlay();
                    document.getElementById(e.target.id).style.backgroundColor = '#f00';
                    setIsGameOver(true);
                    axios.post(`${REACT_APP_APIS}/add`, {
                        name: playerName,
                        score: counter*10,
                    })
                    .then((res) => console.log(res))
                    .catch((err) => console.log(err));
                }
                setTempCounter(prev => prev - 1);
                setCurrPath((prev) => [...prev, parseInt(e.target.id)]);
            }
            else{
                clearScreen();
                setPath(prev => [...prev, parseInt(e.target.id)]);
                setCurrPath([]);
                setCounter(prev => prev + 1);
                setTempCounter(counter + 3);
                delayBotFunction(parseInt(e.target.id));
            }

        }
    }

    const onStart = (playerName) => {
        setIsGameStarted(true)
        setPlayerName(playerName);
    };

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
            <Sound url={bgMusic} playStatus={isMusicPlaying? Sound.status.PLAYING : Sound.status.STOPPED} loop={true} />
            <div className="single-gameContainer">
                <div className="single-speaker">
                    {
                        isMusicPlaying?
                        <img className="single-speakerIcon" src={require("../../assets/icons/unmute.png").default} alt="speaker" onClick={() => setIsMusicPlaying(false)} />
                        :
                        <img className="single-speakerIcon" src={require("../../assets/icons/mute.png").default} alt="speaker" onClick={() => setIsMusicPlaying(true)} />

                    }
                </div>
                <div className="single-gameInfo">
                    <h1 className="single-headerhalo">Halo </h1>
                    <h4 className="playervs-header header">Playing vs Bot </h4>
                    <h4 className="name-header">Name: {playerName} </h4>
                    <div className="single-score">Score : {counter*10}</div>
                    <div className="score">Player Turn :
                        {
                            isPlaying? 'You' : 'Bot'
                        }
                    </div>
                </div>
                <div className="single-gridContainer">
                    {
                        [...Array(25)].map((x, i) => <div key={i} onClick={clickHandler} className="single-box" id={(i+1).toString()} /> )
                    }
                </div>
                {
                    isGameStarted? null : <SinglePlayerStart  onStart={onStart} />
                }
                {
                    isGameOver? <GameEnd score={counter * 10} /> : null
                }
            </div>
        </div>
    )
}

export default SinglePlayer
