import React, { useEffect, useState } from 'react'
import './LeaderBoard.css'
import axios from 'axios';

const LeaderBoard = () =>{
    const [scoreData, setScoreData] = useState([]);
    useEffect(() => {
        axios.get('https://60eff1e4327251dddb9a4ed6--determined-blackwell-c4c8cc.netlify.app//leaderboard')
        .then((res)=> setScoreData(res.data))
        .catch((err)=> console.log(err))
    }, [])

    return(
        <div>
            <div className="leader-container">
                <div id="title">
                    <h1 className="header-leader">Halo</h1>
                </div>
                <div>
                    <h2>Leader Board</h2>
                </div>
                <div className="players">
                    {
                        scoreData.map((player, index) => (
                            <div key={index} className="info">
                                <div className="no">{index+1}.</div>
                                <div className="name">{player.name}</div>
                                <div className="score">{player.score}</div>
                            </div>
                        ))
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default LeaderBoard