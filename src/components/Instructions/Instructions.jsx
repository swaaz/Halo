import React from "react";
import "./Instructions.css";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="instructions">
      <h1>Halo </h1>
      <h2>Instructions </h2>
      <div className="table">
        <div className="column">
          <div>
            <h3>Single-Player Mode</h3>
            <p>
              You are commander of the ship, your assistant bot has gone rogue
              and you need to try and follow the pattern made by the bot to
              create your highest score and steer the ship!
            </p>
            <ul>
              <li>
                Click on a random square, the bot will give the next square
                location that will highlight in Green
              </li>
              <li>Follow the order in which the squares were clicked</li>
              <li>
                Sometimes the bot may click on already clicked square, it will
                highlight in Yellow
              </li>
            </ul>
          </div>

          <div className="image-border">
            <img
              src={require("../../assets/gifs/sp_halo.gif").default}
              alt="Single Player Mode gameplay"
            />
          </div>
        </div>

        <div className="column">
          <div>
            <h3>Multi-Player Mode</h3>
            <p>
              Play with friends, follow your friend's pattern while he tries to
              remember your pattern!
              <ul>
                <li>
                  This game is better played with friends on a discord call.
                </li>
                <li>Upto 4 players can join a single room!</li>
                <li>The person who created the room can start the game</li>
              </ul>
            </p>

            <p>
              Here's a 1v1 game play, the one who fails to remember the pattern
              loses.
            </p>
            <br></br>
          </div>

          <div className="image-border">
            <img
              src={require("../../assets/gifs/mp_halo.gif").default}
              alt="Multi Player Mode gameplay"
            />
          </div>
        </div>
      </div>
      <div id="home-button" className="item">
        <Link className="home-link button" to="/">
          Home
        </Link>
        <br />
      </div>
    </div>
  );
};

export default Home;
