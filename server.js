const express = require('express');

const accountsRouter = require('./accounts/accountsRouter.js'); 

const server = express();

server.use(express.json());

server.use('/api/accounts', accountsRouter);

server.get('/', (req, res) => {
    res.send('<h2>✨ DB Node Project 1 ✨</h2>');
});

module.exports = server;