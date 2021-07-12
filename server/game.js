
const createGameState = () => {
	return {
		roomId: "",
		gameRound: 1,
		patternList: [],
		newPatternList: [],
		playerList: [],
		gameTurn: 0,
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

	if (checkArrayEqual(state.patternList, state.newPatternList.slice(0, -1))) {
		state.patternList = state.newPatternList
		state.newPatternList = []
		state.gameRound += 1
		state.gameTurn = (state.gameTurn + 1) % 4;
		return [true, state];
	}
	else {
		console.log("Player " + state.gameTurn + " made a wrong move!")
		return [false, state];
	}
}

const checkArrayEqual = (arr1, arr2) => {
	for (let i = 0; i < arr1.length; i++) {
		if (arr1[i] != arr2[i])
			return false
	}
	return true
}

module.exports = {
	initGame,
	gameLoop
}