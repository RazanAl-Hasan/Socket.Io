const userController = require('../controllers/userController');
const roomController=require('../controllers/roomController')
module.exports = (socket, io) => {
socket.on('new-user', (username) => {
    userController.newUser(socket, io, username);
});

socket.on('join-room', (data) => {
roomController.joinRoom(socket, io, data);
});

socket.on('send-chat-message', (data) => {
userController.sendMessage(socket, io, data);
});


socket.on('disconnect', () => {
    userController.disconnect(socket, io);
});
};
