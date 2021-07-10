import React, { useState } from 'react'
import './SinglePlayer.css';
const SinglePlayer = () => {

    const [color, setColor] = useState([
        {
            isActive : false
        },
        {
            isActive : false
        },
        {
            isActive : false
        },
        {
            isActive : false
        },
        {
            isActive : false
        },
        {
            isActive : false
        },
    ]);
    const [path, setPath] = useState([]);
    const [currPath, setCurrPath] = useState([]);
    const [isPlaying, setIsPlaying] = useState(true);
    const [counter, setCounter] = useState(0);
    const [tempCounter, setTempCounter] = useState(counter);

    const botTurn = () => {
        const randomVal =  Math.floor(Math.random() * 25) + 1 ;
        console.log('bot');
        setPath(prev => [...prev, randomVal]);
        setIsPlaying(true);
        setCounter(prev => prev + 1);
        setTempCounter(counter + 3);
    }

    const clickHandler = (e) => {
        if(isPlaying){
            if(tempCounter > 1){
                // console.log(path[currPath.length]);
                if(path[currPath.length] !== parseInt(e.target.id) && tempCounter !== 1) alert('You lost bruh!! Oops!!');
                setTempCounter(prev => prev - 1);
                setCurrPath((prev) => [...prev, parseInt(e.target.id)]);
            }
            else{

                console.log(e.target.id);
                setPath(prev => [...prev, parseInt(e.target.id)]);
                setCurrPath([]);
                setCounter(prev => prev + 1);
                setTempCounter(counter + 3);
                // const backgroundStyle = window.getComputedStyle(e.target, null).getPropertyValue("background-color");
                // console.log(backgroundStyle);
                // setCounter(prev => prev + 1);
                // setIsPlaying(false);
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
    // console.log(color[1].isActive);
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
