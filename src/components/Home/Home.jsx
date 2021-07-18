import React from 'react'
import './Home.css';
import { Link } from "react-router-dom";
const Home = () => {
    return (
            <div className="container">
                <div id="title">
                    <h1 className="home-header">Halo </h1>
                </div>
                <div className="items">
                    <div className="item"> <Link className="home-link" to="/single">Single Player</Link></div>
                    <div className="item"> <Link className="home-link" to='/multi'>MultiPlayer </Link></div>
                    <div className="item"> <Link className="home-link" to="/instructions">Instructions </Link></div>
                    <div className="itemlast">
                        <div className="iteml item1"> <Link to="/leader">LeaderBoard</Link> </div>
                        <div className="iteml item2"><Link to="/leader"> About</Link></div>
                    </div>
                </div>
            </div>
    )
}

export default Home
