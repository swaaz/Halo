const  express = require('express')
const app = express()
const PORT = 5000
const mongoose = require('mongoose')
const Score = require('./models/Score')

mongoose.connect('mongodb://localhost/Halo', { useNewUrlParser: true,  useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to database'))

app.use(express.json())

app.get('/', (req, res) => res.send('Hey!! This is Halo API'))

app.get('/leaderboard', async(req, res) => {
    try{
        const scores = await Score.find().limit(10).sort({ score: -1 })
        res.json(scores)
    }
    catch(err){
        res.status(500).json({ message : err.message })
    }
})
app.post('/add', async(req, res) => {

    const data = new Score({
        name: req.body.name,
        score: req.body.score
    });

    try {
        const newScore = await data.save()
        res.status(201).json(newScore)
    }
    catch(err) {
        res.status(400).json(err)
    }
})

app.listen(PORT, () => console.log(`Server is running at 5000...`))