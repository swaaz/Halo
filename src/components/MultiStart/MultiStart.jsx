import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './MultiStart.css';
import { newGame } from '../Multiplayer/Multiplayer';

const MultiStart = () => {
    const [isJoin, setIsJoin] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const [isClicked, setIsClicked] = useState(true);
    const [playerData, setPlayerData] = useState({
        name : '',
        roomId : '',
    });
    console.log(playerData);
    const onClickHandler = (e) => {
        console.log(e.target.id)
        if(playerData.name.length !== 0){
            setIsClicked(false);
            if(e.target.id === "join") setIsJoin(true);
            else{
                setIsCreate(true);
                newGame(playerData.name);
            }
        }
        else{
            alert("Please enter your name!");
        }
    }

    return (
        <div className="multiPlayerStart">
            {
                isClicked && 
                <div className="multiroom">
                    <div id="title">
                        <h1 className="header">Halo </h1>
                    </div>
                    <div className="multi-items">
                        <div className="multi-item"><input value={playerData.name} onChange={(e) => setPlayerData(prev => ({...prev, name : e.target.value }))} type="text" placeholder="Enter Name"></input></div>
                        <div className="create multi-item" onClick={onClickHandler}><p id="create" >create room</p></div>
                        <div className="join multi-item" onClick={onClickHandler}><p id="join">join room</p></div>
                    </div>
                </div>

            }
            {
                isJoin?
                <div className="multi-items multi-card">
                    <div className="multi-item"><input value={playerData.roomId} onChange={(e) => setPlayerData(prev => ({...prev, roomId : e.target.value }))} className="inputRoom" type="text" placeholder="Enter Room ID"></input></div>
                    <Link to='/multi'> <div className="multi-item">JOIN!</div></Link>
                </div>
                :
                null
            }
            {
                isCreate?
                <div className="multi-items multi-card">
                    <div className="multi-item">Room ID</div>
                    <Link to='/multi'> <div className="multi-item">JOIN!</div></Link>
                </div>
                :
                null
            }

            
        </div>
    )
}

export default MultiStart
