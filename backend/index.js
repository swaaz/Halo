const PORT = 5000
var cors = require('cors')
const mongoose = require('mongoose')
const Score = require('./models/Score')
let { io } = require('./gameServer/server')

// Express App for Single Player Leaderboard
const express = require('express')

// Create express App
const app = express()

// Create new Sever for both Express and Socket.io
const server = require('http').createServer(app)

// Make socket.io listen to the new Server
io = io.listen(server);

// Connect to Mongodb database server for Leaderboards
mongoose.connect('mongodb://localhost/Halo', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to database'))

app.use(cors())
app.use(express.json())

// Options for Express CORS errors 
var corsOptions = {
	origin: 'http://127.0.0.1:3000',
	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

//Define Express API End-Points

app.get('/', (req, res) => res.send('Hey!! This is Halo API'))

app.get('/leaderboard', async (req, res) => {
	try {
		const scores = await Score.find().limit(10).sort({ score: -1 })
		res.json(scores)
	}
	catch (err) {
		res.status(500).json({ message: err.message })
	}
})

app.post('/add', async (req, res) => {


	// console.log("added name :)"
	const data = new Score({
		name: req.body.name,
		score: req.body.score
	});

	try {
		const newScore = await data.save()
		res.status(201).json(newScore)
	}
	catch (err) {
		res.status(400).json(err)
	}
})

// End API end-points

// Make server Listen to the PORT
server.listen(PORT, () => console.log(`Server is running at 5000...`))