const { io } = require('socket.io-client');
const socket = io('http://localhost:3000', {
  transports: ['websocket']
});

socket.on('connect', () => {
  console.log('Connected as:', socket.id);
  socket.emit('new-user', 'Razan');
  setTimeout(() => {
    socket.emit('send-chat-message', 'Hello from Razan');
  }, 2000);
});

socket.on('chat-message', (data) => {
  console.log(`[${data.username}]: ${data.text}`);
});

socket.on('user-connected', (username) => {
  console.log(`${username} joined`);
});

socket.on('user-disconnected', (username) => {
  console.log(`${username} left`);
});

setTimeout(() => {
console.log('disconnecting');
socket.disconnect();
}, 10000);
