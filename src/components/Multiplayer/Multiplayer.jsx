import React from "react";
import { useState } from "react";
import "./Multiplayer.css";
import openSocket from "socket.io-client";

const socket = openSocket("http://127.0.0.1:5000", {
  withCredentials: true,
});

export const newGame = (playerName) => {
    console.log("new game started");
    socket.emit("newGame", { playerName });
  };

const Multiplayer = (props) => {
  // const [playerName, setPlayerName] = useState("");

  const [state, setState] = useState({
    roomId: "",
    gameRound: 1,
    patternList: [],
    newPatternList: [],
    playerList: [],
    gameTurn: 0,
    loserList: [],
  });
  const [playerId, setPlayerId] = useState(0);
  const [gameCode, setGameCode] = useState("");

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
    if (!state.loserList.includes(playerId)) {
      console.log(e.target.id);
      const value = e.target.id;
      if (state.gameTurn === playerId) {
        if (state.gameRound > state.newPatternList.length) {
          let newPatList = state.newPatternList;
          newPatList.push(value);
          setState({ ...state, newPatternList: newPatList });
          // state.newPatternList.push(value);
          document.getElementById(value).style.backgroundColor = "lightgreen";
          // clickCount += 1;
          console.log(state.newPatternList);
          socket.emit("click", state);
        }
        if (state.gameRound === state.newPatternList.length) {
          socket.emit("turnComplete", state);
          // clickCount = 0;
          delayClearFunction();
          socket.emit("cleanGrid", state.roomId);
        }
      } else {
        alert("Not your turn!");
        console.log("Not your turn!");
      }
    }
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setGameCode(e.target.value);
  };

  // const handleNameChange = (e) => {
  //   setPlayerName(e.target.value);
  // };

  

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
    console.clear();
    console.log(state);
  };

  const handleSubmit = (playerName) => {
    socket.emit("joinGame", { playerName: playerName, roomName: gameCode });
  };

  const handleStop = (state) => {
    console.log("Player " + state.gameTurn + " made a wrong move!");
  };

  const checkTurn = () => {
    if (state.gameTurn === playerId) {
      return "Your Turn!";
    } else {
      return "";
    }
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
          <h4 className="header">{checkTurn()}</h4>
          <h4 className="header">
            Player Turn: {state.gameTurn >= 0 ? state.gameTurn : ""}
          </h4>
          <button className="header" id="newGameButton" onClick={newGame}>
            new game
          </button>
          {/* <input
            className="score"
            id="playerName"
            type="text"
            value={playerName}
            onChange={handleNameChange}
          />
          <input
            className="score"
            id="gameCodeInput"
            type="text"
            value={gameCode}
            onChange={handleChange}
          /> */}
          <button className="score" id="joinGameButton" onClick={handleSubmit}>
            join game
          </button>
          <div className="score">Game code: {gameCode} </div>
        </div>
        
            <div className="gameContainer">
                {/* <div className="gameInfo">
                    <h1 className="header headerhalo">Halo </h1>
                    <h4 className="header">Playing vs Bot </h4>
                    <div className="score">Score</div>
                    <div className="score">Player Turn : swaaz
                    </div>
                </div> */}
                <div className="GridContainer">
                    {
                        [...Array(25)].map((x, i) => <div onClick={clickHandler} className="box" id={(i+1).toString()} /> )
                    }
                </div>
            </div>
                
        <div>
          <h3>In-Lobby:</h3>
          <div className="items">
            {state
              ? state.playerList.map((playerName) => {
                  return <div className="item">{playerName}</div>;
                })
              : ""}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Multiplayer

