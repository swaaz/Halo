const { initGame, gameLoop } = require('./game');
const { makeid } = require('./utils')

const io = require('socket.io')({
	cors: {
		origin: "http://127.0.0.1:3000",
		credentials: true,
		methods: ["GET", "POST"]
	}
});


const state = {};
const clientRooms = {};

io.on('connection', client => {
	client.on("turnComplete", (state) => {
		console.log("Turn processing...\n", state);
		let [win, gameState] = gameLoop(state);

		console.log(win, gameState);

		if (win) {
			io.to(gameState.roomId).emit("updateState", gameState);
		}
		else {
			io.to(gameState.roomId).emit("stop", gameState);
		}
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


	const handleJoinGame = (roomName) => {
		// test()

		const room = io.sockets.adapter.rooms.get(roomName);
		let numClients = room.size ? room.size : 1;
		console.log(room.size + 1);
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
		client.emit('init', client.number);
		client.emit("updateState", state[roomName])
		// test()

	}

	const handleNewGame = () => {
		let roomName = makeid(5);
		clientRooms[client.id] = roomName;
		client.emit('gameCode', roomName);

		state[roomName] = initGame();
		state[roomName].roomId = roomName;

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

io.listen(process.env.PORT || 5000);