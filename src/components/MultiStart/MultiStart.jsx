import React, { useState } from 'react'
import { Link } from 'react-router-dom';

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
            <p>Halo</p>
            {
                isClicked && 
                <div>
                    <p>start</p>
                    <input type="text" />
                    <div id="create" onClick={onClickHandler}>create room</div>
                    <div id="join" onClick={onClickHandler}>join room</div>
                </div>

            }
            {
                isJoin?
                <div>
                    <p>join div</p>
                    <Link to='/multi'> <div>next</div></Link>
                </div>
                :
                null
            }
            {
                isCreate?
                <div>
                    <p>create div</p>
                    <Link to='/multi'> <div>next</div></Link>
                </div>
                :
                null
            }

            
        </div>
    )
}

export default MultiStart
