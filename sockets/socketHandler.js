const userController = require('../controllers/userController');

module.exports = (socket, io) => {
socket.on('new-user', (username) => {
    userController.newUser(socket, io, username);
});

socket.on('send-chat-message', (message) => {
    userController.sendMessage(socket, io, message);
});

socket.on('disconnect', () => {
    userController.disconnect(socket, io);
});
};
