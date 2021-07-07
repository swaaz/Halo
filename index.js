const express = require('express');
const path = require('path');

const app = express();
app.set('view engine', 'pug');

app.get('/', (req , res) => {
    res.render('index');
})

app.listen('5000', () => console.log('Server is running..'))