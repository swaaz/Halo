const express = require('express');
const path = require('path');

const app = express();
app.set('view engine', 'pug');

app.get('/', (req , res) => {
    res.render('index');
})

app.get('/chat', (req, res) => {
    res.render('chat');
})




app.listen('5000', () => console.log('Server is running in port 5000..'))