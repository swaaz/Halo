import React, { useState } from 'react'
import {  useHistory } from 'react-router-dom';
import './MultiStart.css';

const MultiStart = () => {

    const history = useHistory();
    const [isJoin, setIsJoin] = useState(false);
    const [isClicked, setIsClicked] = useState(true);
    const [playerData, setPlayerData] = useState({
        name : '',
        roomId : '',
    });
    console.log(playerData);

    const onCreateHandler = () => {
        if(playerData.name.length){
            history.push({
                pathname: '/multi',
                state: {
                    playerData: playerData,
                }
            })
        }
        else{
            alert('Please enter your name');;
        }
    }
    const onJoinHandler = () => {
        if(playerData.name.length && playerData.roomId.length){
            history.push({
                pathname: '/multi',
                state: {
                    playerData: playerData,
                }
            })
        }
    }
    const onClickHandler = (e) => {
        if(playerData.name.length){
            setIsClicked(false);
            if(e.target.id === "join") setIsJoin(true);
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
                        <div className="create multi-item" onClick={onCreateHandler} ><p id="create" >create room</p></div>
                        <div className="join multi-item" onClick={onClickHandler}><p id="join">join room</p></div>
                    </div>
                </div>

            }
            {
                isJoin?
                <div className="multi-items multi-card">
                    <div className="multi-item"><input value={playerData.roomId} onChange={(e) => setPlayerData(prev => ({...prev, roomId : e.target.value }))} className="inputRoom" type="text" placeholder="Enter Room ID"></input></div>
                    <div onClick={onJoinHandler} className="multi-item">JOIN!</div>
                </div>
                :
                null
            }


            
        </div>
    )
}

export default MultiStart
