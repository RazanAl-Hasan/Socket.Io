const Room = require('../models/roomModel');
const User = require('../models/userModel');

exports.joinRoom = async (socket, io, { username, roomName }) => {
  let user = await User.findOne({ socketId: socket.id });
  if (!user) {
    user = await User.create({ username, socketId: socket.id });
  }
  let room = await Room.findOne({ name: roomName });
  if (!room) {
    room = await Room.create({ name: roomName, users: [user._id] });
  } else {
    room.users.push(user._id);
    await room.save();
  }
  socket.join(roomName);
  socket.to(roomName).emit('user-connected', username);
};
