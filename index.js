const { Socket } = require('dgram');
const express = require('express');
const path = require('path');
const { Server }  = require('socket.io');
const http = require('http');
const app = express();
const server = http.createServer(app);
app.set('view engine', 'pug');
const io = new Server(server);

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

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
      });
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
});


app.listen('5000', () => console.log('Server is running in port 5000..'))