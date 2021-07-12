import React from "react";
import { useState } from "react";
import "./Multiplayer.css";
import openSocket from "socket.io-client";

const socket = openSocket("http://127.0.0.1:5000", {
  withCredentials: true,
});

const Multiplayer = () => {
  const [state, setState] = useState({});
  const [playerId, setPlayerId] = useState(0);
  const [gameCode, setGameCode] = useState(0);

  //function to click on box after some time
  const delayClickFunction = (element) => {
    setTimeout(botClick(element), 50000);
  };

  // function to click on box
  const botClick = (item) => {
    document.getElementById(item.toString()).style.backgroundColor = "green";
  };

  // to clean after some time
  const delayClearFunction = () => {
    setTimeout(clearScreen, 500);
  };
  //to clean immediatly
  const clearScreen = () => {
    for (let i = 1; i <= 25; ++i) {
      document.getElementById(i.toString()).style.backgroundColor = "white";
    }
  };
  const clickHandler = (e) => {
    console.log(e.target.id);
    const value = e.target.id;
    if (state.gameTurn === playerId) {
      if (state.gameRound > state.newPatternList.length) {
        state.newPatternList.push(value);
        document.getElementById(value).style.backgroundColor = "lightgreen";
        // clickCount += 1;
        console.log(state.newPatternList);
        socket.emit("click", state);
      }
      if (state.gameRound === state.newPatternList.length) {
        socket.emit("turnComplete", state);

        console.log("Next person's turn (" + (state.gameTurn + 1) + ")");
        // clickCount = 0;
        delayClearFunction();
        socket.emit("cleanGrid", state.roomId);
      }
    } else {
      alert("Not your turn!");
      console.log("Not your turn!");
    }
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setGameCode(e.target.value);
  };

  const newGame = () => {
    console.log("new game started");
    socket.emit("newGame");
  };

  //   const joinGame = () => {
  //     const code = gameCodeInput.value;
  //     console.log("gameCodeInput: " + gameCode);
  //     socket.emit("joinGame", gameCode);
  //   };

  const handleInit = (number) => {
    setPlayerId(number);
  };

  const handleGameCode = (gameCodeValue) => {
    // gameCodeDisplay.innerText = gameCode;
    setGameCode(gameCodeValue);
    console.log(gameCodeValue);
  };

  const handleUnknownCode = () => {
    console.log("Unknown Code!");
  };

  const handleTooManyPlayers = () => {
    console.log("Too Many players!");
  };

  const handleUpdateState = (newState) => {
    setState(newState);
    console.log(state);
  };

  const handleSubmit = () => {
    socket.emit("joinGame", gameCode);
  };

  const handleStop = (state) => {
    console.log("Player " + state.gameTurn + " made a wrong move!");
  };

  socket.on("delayClick", delayClickFunction);
  socket.on("init", handleInit);
  socket.on("unknownCode", handleUnknownCode);
  socket.on("tooManyPlayers", handleTooManyPlayers);
  socket.on("gameCode", handleGameCode);
  socket.on("updateState", handleUpdateState);
  socket.on("stop", handleStop);
  socket.on("cleanGrid", delayClearFunction);

  return (
    <div>
      <div className="gameContainer">
        <div className="gameInfo">
          <h1 className="header">Halo </h1>
          <h4 className="header">Player Number: {playerId} </h4>
          <button className="score" id="newGameButton" onClick={newGame}>
            new game
          </button>
          <input
            id="gameCodeInput"
            type="text"
            value={gameCode}
            onChange={handleChange}
          />
          <button className="score" id="joinGameButton" onClick={handleSubmit}>
            join game
          </button>
          <div className="score">Game code: {gameCode} </div>
          <div className="score">Player Turn : swaaz</div>
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
        {/* {
                    isGameOver? <GameEnd /> : null
                } */}
      </div>
    </div>
  );
};

export default Multiplayer;
