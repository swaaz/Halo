const { initGame, gameLoop } = require('./game');
const { makeid } = require('./utils')

let io = require('socket.io')({
	cors: {
		origin: `http://127.0.0.1:3000`,
		credentials: true,
		// methods: ["GET", "POST"]
		methods: ["*"]
	}
});


const state = {};
const clientRooms = {};

io.on('connection', client => {
	client.on("turnComplete", (state) => {
		console.log("Turn processing...\n", state);
		let [gameOver, playerLost, gameState] = gameLoop(state);

		console.log(gameState);
		if (gameOver) {
			io.to(gameState.roomId).emit("gameOver", gameState);
		}
		else {
			if (playerLost) {
				client.emit("playerLost");
			}

			io.to(gameState.roomId).emit("updateState", gameState);
		}

		io.to(gameState.roomId).emit("lobbyActive");

	})

	client.on("click", (state) => {
		console.log("Player " + state.gameTurn + " clicked " + state.newPatternList[state.newPatternList.length - 1]);
		io.to(state.roomId).emit("delayClick", state.newPatternList[state.newPatternList.length - 1]);
	})

	function test() {
		console.log("connection!")
		console.log(state)
		console.log(clientRooms)
	}


	const handleJoinGame = ({ playerName, roomName }) => {
		// test()
		console.log(playerName, roomName)

		const room = io.sockets.adapter.rooms.get(roomName);
		let numClients = room ? room.size : 0;
		console.log(numClients);
		// console.log(io.sockets.adapter.rooms)
		// let allUsers;
		// if (room) {
		// 	allUsers = room;
		// }

		// let numClients = 0;
		// if (allUsers) {
		// 	numClients = Object.keys(allUsers).length;
		// }

		if (numClients === 0) {
			client.emit('unknownCode');
			return;
		} else if (numClients >= 4) {
			client.emit('tooManyPlayers');
			return;
		}

		clientRooms[client.id] = roomName;

		client.join(roomName);
		client.number = numClients;
		let playerL = state[roomName].playerList;
		playerL.push(playerName)
		state[roomName].playerList = playerL;
		console.log(state[roomName]);
		client.emit('init', client.number);
		io.to(roomName).emit("updateState", state[roomName])

		io.to(roomName).emit("lobbyActive");
		// test()

	}

	const handleNewGame = ({ playerName }) => {
		let roomName = makeid(5);
		clientRooms[client.id] = roomName;
		client.emit('gameCode', roomName);

		state[roomName] = initGame();
		state[roomName].roomId = roomName;
		let playerL = state[roomName].playerList;
		playerL.push(playerName)
		state[roomName].playerList = playerL;

		client.join(roomName);
		client.number = 0;
		client.emit('init', client.number);
		client.emit("updateState", state[roomName])
		// test()

	}

	const handleClean = (roomId) => {
		client.to(roomId).emit("cleanGrid")
	}

	client.on('newGame', handleNewGame);
	client.on('joinGame', handleJoinGame);
	client.on('cleanGrid', handleClean);
})


// io.listen(process.env.PORT || 5000);

module.exports = io;