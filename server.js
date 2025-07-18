require('dotenv').config();
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const connectToDB=require('./utils/db');
const socketHandler = require('./sockets/socketHandler');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
cors: { origin: '*' }
});

connectToDB();

io.on('connection', (socket) => {
console.log('New client:', socket.id);
socketHandler(socket, io);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
