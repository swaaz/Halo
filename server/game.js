
const createGameState = () => {
	return {
		roomId: "",
		gameRound: 1,
		patternList: [],
		newPatternList: [],
		playerList: [],
		gameTurn: 0,
		loserList: [],
	};
}

const initGame = () => {
	const state = createGameState()
	return state;
}

const gameLoop = (state) => {
	if (!state) {
		return;
	}

	if(state.loserList.length === (state.playerList.length - 1))
	{
		return [true, state]
	}

	if (checkArrayEqual(state.patternList, state.newPatternList.slice(0, -1))) {
		state.patternList = state.newPatternList
		state.newPatternList = []
		state.gameRound += 1
		state.gameTurn = (state.gameTurn + 1) % 4;
		while (state.loserList.includes(state.gameTurn))
			state.gameTurn = (state.gameTurn + 1) % 4;
		return state;
	}
	else {
		console.log("Player " + state.gameTurn + " made a wrong move!")
		state.newPatternList = []
		state.loserList.push(state.gameTurn);
		state.gameTurn = (state.gameTurn + 1) % 4;
		while (state.loserList.includes(state.gameTurn))
			state.gameTurn = (state.gameTurn + 1) % 4;

		return state;
	}
}

const checkArrayEqual = (arr1, arr2) => {
	for (let i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i])
			return false
	}
	return true
}

module.exports = {
	initGame,
	gameLoop
}