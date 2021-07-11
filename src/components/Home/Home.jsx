import React from 'react'
import './Home.css';
import { Link } from "react-router-dom";
const Home = () => {
    return (
        <div>
            <div className="container">
                <div id="title">
                    <h1 className="header">Halo </h1>
                </div>
                <div className="items">
                    <div className="item"> <Link to="/single">Single Player</Link></div>
                    <div className="item"> <Link to='/multi'>MultiPlayer </Link></div>
                    <div className="itemlast">
                        <div className="iteml item1">Settings</div>
                        <div className="iteml item2">Exit</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
