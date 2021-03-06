import React from "react";
import { useState } from "react";
import "./Multiplayer.css";
import openSocket from "socket.io-client";
import GameEndMulti from "../GameEndMulti/GameEndMulti";
import useSound from "use-sound";
import clickSound from "../../assets/audio/click.mp3";
import Sound from "react-sound";
import bgMusic from "../../assets/audio/bg.mp3";
const { REACT_APP_API } = process.env;


const socket = openSocket(`${REACT_APP_API}/`, {
  withCredentials: true,
});

const Multiplayer = (props) => {
  const [clickPlay] = useSound(clickSound);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);

  const [playerData, setPlayerData] = useState({
    name: "",
    roomId: "",
  });
  const [isEnded, setIsEnded] = useState(false);
  const [isJoin, setIsJoin] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [isClicked, setIsClicked] = useState(true);
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
  const [ranks, setRanks] = useState([]);

  // function to check whether the name is empty and open next popup
  const onClickHandler = (e) => {
    if (playerData.name.length) {
      setIsClicked(false);
      if (e.target.id === "join") setIsJoin(true);
      else {
        setIsCreate(true);
        newGame();
      }
    } else {
      alert("Please enter your name!");
    }
  };

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

  //to clean immediately
  const clearScreen = () => {
    for (let i = 1; i <= 25; ++i) {
      document.getElementById(i.toString()).style.backgroundColor = "white";
    }
  };

  // to handle when someone clicks on the grid
  const clickHandler = (e) => {
    if (!state.loserList.includes(playerId)) {
      // console.log(e.target.id);
      const value = e.target.id;
      if (state.gameTurn === playerId) {
        clickPlay();
        if (state.gameRound > state.newPatternList.length) {
          let newPatList = state.newPatternList;
          newPatList.push(value);
          setState({ ...state, newPatternList: newPatList });
          // state.newPatternList.push(value);
          const col = document.getElementById(value).style.backgroundColor;
          const colorArray = col.match(
            /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/i
          );
          // console.log(colorArray);
          if (colorArray === null)
            document.getElementById(value).style.backgroundColor =
              "rgb(0,255,0,0.9 )";
          else {
            // document.getElementById(value).style.backgroundColor = `rgb(${
            //   parseInt(colorArray[1]) + 100
            // }, 255, ${parseInt(colorArray[3]) + 100} )`;
            document.getElementById(value).style.backgroundColor = 'yellow';
          }
          // clickCount += 1;
          // console.log(state.newPatternList);
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
        // console.log("Not your turn!");
      }
    }
  };

  // to create new game
  const newGame = () => {
    // console.log("new game started");
    socket.emit("newGame", { playerName: playerData.name });
  };

  // To Join new Game with a roomId
  const handleSubmit = () => {
    if (playerData.roomId.length) {
      setIsJoin(false);

      socket.emit("joinGame", {
        playerName: playerData.name,
        roomName: playerData.roomId.toUpperCase(),
      });
      setGameCode(playerData.roomId.toUpperCase());
    } else {
      alert("enter room id");
    }
  };

  // const handleChange = (e) => {
  //   console.log(e.target.value);
  //   setGameCode(e.target.value);
  // };

  // const handleNameChange = (e) => {
  //   setPlayerName(e.target.value);
  // };

  //   const joinGame = () => {
  //     const code = gameCodeInput.value;
  //     console.log("gameCodeInput: " + gameCode);
  //     socket.emit("joinGame", gameCode);
  //   };

  // To assign playerId sent by the server
  const handleInit = (number) => {
    setPlayerId(number);
  };

  // To assign the GameCode sent by the server
  const handleGameCode = (gameCodeValue) => {
    // gameCodeDisplay.innerText = gameCode;
    setGameCode(gameCodeValue);
    // console.log(gameCodeValue);
  };

  // In case of unknown gameCode
  const handleUnknownCode = () => {
    // console.log("Unknown Code!");
  };

  // In case the room has 4 players already
  const handleTooManyPlayers = () => {
    // console.log("Too Many players!");
  };

  // To update the state after every turn
  const handleUpdateState = (newState) => {
    setState(newState);
    console.clear();
    if (state.playerList.length !== 0) itemActive();
    // console.log(state);
  };

  const handleStop = (state) => {
    // console.log("Player " + state.gameTurn + " made a wrong move!");
  };

  // End Game condition where 3 of 4 players lose
  const handleGameOver = (state) => {
    setIsEnded(true);
    // playerList = ["suhan", "swaaz", "rachita"]
    // loserList = [2, 0]
    // rank = [{name: 'swaaz', playerId: 1},{name: 'suhan', playerId: 0},{name: 'rachita', playerId: 2}]

    const rankList = [];

    state.loserList.map((id) => {
      rankList.push({ name: state.playerList[id], playerId: id });
      return 0;
    });

    rankList.push({
      name: state.playerList[state.gameTurn],
      playerId: state.gameTurn,
    });
    rankList.reverse();
    // console.log(rankList);
    setRanks(rankList);
    // console.log("Game Over! " + state.playerList[state.gameTurn] + " WON!");
  };

  const itemActive = () => {
    for (let i = 0; i < 4; i++) {
      let item = document.getElementById("lobby-item" + i);
      if (item) {
        item.style.background = "transparent";
        item.style.color = "white";
      }
    }

    let item = document.getElementById(
      "lobby-item" + state.gameTurn.toString()
    );
    if (item) {
      item.style.background = "white";
      item.style.color = "black";
    }
  };

  const replay = () => {
    setIsEnded(false);
    setState({
      roomId: state.roomId,
      gameRound: 1,
      patternList: [],
      newPatternList: [],
      playerList: state.playerList,
      gameTurn: 0,
      loserList: [],
    });
    itemActive();
  };

  // const playerLost = () => {
  //   console.log("You lost!");
  //   alert("You lost! :( :(");
  // };

  // Just a function to alert if it is the client's turn
  // const checkTurn = () => {
  //   if (state.gameTurn === playerId) {
  //     return "Your Turn!";
  //   } else {
  //     return "";
  //   }
  // };
  // console.log(gameCode);

  // Server's Event Listeners
  socket.on("delayClick", delayClickFunction);
  socket.on("init", handleInit);
  socket.on("unknownCode", handleUnknownCode);
  socket.on("tooManyPlayers", handleTooManyPlayers);
  socket.on("gameCode", handleGameCode);
  socket.on("updateState", handleUpdateState);
  socket.on("stop", handleStop);
  socket.on("cleanGrid", delayClearFunction);
  socket.on("gameOver", handleGameOver);
  socket.on("lobbyActive", itemActive);
  //   socket.on("playerLost", playerLost);

  return (
    <div>
      <Sound url={bgMusic} playStatus={isMusicPlaying? Sound.status.PLAYING : Sound.status.STOPPED} loop={true} />
      <div className="multi-gameContainer">
        <div className="multi-speaker">
                    {
                        isMusicPlaying?
                        <img className="multi-speakerIcon" src={require("../../assets/icons/unmute.png").default} alt="speaker" onClick={() => setIsMusicPlaying(false)} />
                        :
                        <img className="multi-speakerIcon" src={require("../../assets/icons/mute.png").default} alt="speaker" onClick={() => setIsMusicPlaying(true)} />

                    }
                </div>
        <div className="multi-gameInfo">
          <h1 className="multi-headerhalo">Halo </h1>
          <div className="gamecode">Game code: {gameCode} </div>
        </div>

        
        <div className="multi-gridContainer">
          {[...Array(25)].map((x, i) => (
            <div
              key={i}
              onClick={clickHandler}
              className="multi-box"
              id={(i + 1).toString()}
            />
          ))}
        </div>
        {/* </div> */}

        <div className="lobbycontainer">
          <h3 id="lobby-header">In-Lobby:</h3>
          <div className="lobbyitems">
            {state
              ? state.playerList.map((playerName, index) => {
                  return <div className="lobbyitem" id={"lobby-item"+index} >{playerName}</div>;

                })
              : ""}
          </div>
        </div>
      </div>

      {isClicked && (
        <div className="multistart-container">
          <div className="multi-start">
            <div className="multistart-inputdiv">
              <input
                value={playerData.name}
                onChange={(e) =>
                  setPlayerData((prev) => ({ ...prev, name: e.target.value }))
                }
                type="text"
                placeholder="Enter Name"
              ></input>
            </div>
            <div className="multistart-btn" onClick={onClickHandler}>
              <p id="create">create room</p>
            </div>
            <div className="multistart-btn" onClick={onClickHandler}>
              <p id="join">join room</p>
            </div>
          </div>
        </div>
      )}
      {isJoin ? (
        <div className="multistart-container">
          <div className="multi-joinstart">
            <div className="multistart-inputdiv">
              <input
                value={playerData.roomId}
                onChange={(e) =>
                  setPlayerData((prev) => ({ ...prev, roomId: e.target.value }))
                }
                className="inputRoom"
                type="text"
                placeholder="Enter Game Code"
              ></input>
            </div>
            <div onClick={handleSubmit} className="multistart-btn">
              JOIN!
            </div>
          </div>
        </div>
      ) : null}
      {isCreate ? (
        <div className="multistart-container">
          <div className="multi-createstart">
            <div className="multistart-item">{gameCode}</div>
            <div
              onClick={() => setIsCreate(false)}
              className="multistart-createbtn multistart-item"
            >
              JOIN!
            </div>
          </div>
        </div>
      ) : null}
      {isEnded ? <GameEndMulti ranks={ranks} replay={replay} /> : null}
    </div>
  );
};

export default Multiplayer;
