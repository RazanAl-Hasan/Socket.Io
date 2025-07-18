const { io } = require('socket.io-client');
const socket = io('http://localhost:3000', {
  transports: ['websocket']
});

const username ='Razan';
const roomName ='room1';

socket.on('connect', () => {
  console.log('Connected as:', socket.id);
  socket.emit('new-user', username);
  socket.emit('join-room', { username, roomName });
  setTimeout(() => {
    socket.emit('send-chat-message', {
      roomName,
      message: `Hello from ${username}`
    });
  }, 2000);
});

socket.on('chat-message', (data) => {
  console.log(`${data.username}: ${data.text}`);
});

socket.on('user-connected', (username) => {
  console.log(`${username} joined`);
});

socket.on('user-disconnected', (username) => {
  console.log(`${username} left`);
});

setTimeout(() => {
  console.log('Disconnecting...');
  socket.disconnect();
}, 10000);
