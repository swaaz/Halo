import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './MultiStart.css';

const MultiStart = () => {
    const [isJoin, setIsJoin] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const [isClicked, setIsClicked] = useState(true);
    const onClickHandler = (e) => {
        setIsClicked(false);
        if(e.target.id === "join") setIsJoin(true);
        else setIsCreate(true);
    }
    return (
        <div>
            {
                isClicked && 
                <div className="multiroom">
                    <div id="title">
                        <h1 className="header">Halo </h1>
                    </div>
                    <div className="multi-items">
                        <div className="multi-item"><input type="text" placeholder="Enter Name"></input></div>
                        <div className="create multi-item" onClick={onClickHandler}><p>create room</p></div>
                        <div className="join multi-item" onClick={onClickHandler}><p>join room</p></div>
                    </div>
                </div>

            }
            {
                isJoin?
                <div className="multi-items multi-card">
                    <div className="multi-item"><input type="text" placeholder="Enter Room ID"></input></div>
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
