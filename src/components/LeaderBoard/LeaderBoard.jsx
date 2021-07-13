import React, { useState } from 'react'
import './LeaderBoard.css'
const LeaderBoard = () =>{
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
                    <div className="info">
                        <div className="no">1.</div>
                        <div className="name">Swaaz</div>
                        <div className="score">20</div>
                    </div>
                    <div className="info">
                        <div className="no">2.</div>
                        <div className="name">Suhan</div>
                        <div className="score">20</div>
                    </div>
                    <div className="info">
                        <div className="no">3.</div>
                        <div className="name">Rachitha</div>
                        <div className="score">100</div>
                    </div>
                    <div className="info">
                        <div className="no">4.</div>
                        <div className="name">Swaaz</div>
                        <div className="score">0</div>
                    </div>
                    <div className="info">
                        <div className="no">5.</div>
                        <div className="name">Swaaz</div>
                        <div className="score">0</div>
                    </div>
                    <div className="info">
                        <div className="no">6.</div>
                        <div className="name">Swaaz</div>
                        <div className="score">0</div>
                    </div>
                    <div className="info">
                        <div className="no">7.</div>
                        <div className="name">Swaaz</div>
                        <div className="score">0</div>
                    </div>
                    <div className="info">
                        <div className="no">8.</div>
                        <div className="name">Swaaz</div>
                        <div className="score">0</div>
                    </div>
                    <div className="info">
                        <div className="no">9.</div>
                        <div className="name">Swaaz</div>
                        <div className="score">0</div>
                    </div>
                    <div className="info">
                        <div className="no">10.</div>
                        <div className="name">Swaaz</div>
                        <div className="score">0</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeaderBoard