const express = require('express');
const path = require('path');

const app = express();
app.set('view engine', 'pug');

app.get('/', (req , res) => {
    res.render('index');
})
app.get('/mulroom', (req , res) => {
    res.render('mulroom');
})
app.get('/joinroom', (req , res) => {
    res.render('joinroom');
})

app.get('/chat', (req, res) => {
    res.render('chat');
})

app.get('/grid', (req, res) => {
    res.render('grid');
})



app.listen('5000', () => console.log('Server is running in port 5000..'))