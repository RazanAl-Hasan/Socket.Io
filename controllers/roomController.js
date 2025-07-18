const User = require('../models/userModel');
const Room = require('../models/roomModel');

exports.joinRoom = async (socket, io, { username, roomName }) => {
  try {
    console.log('joinRoom event triggered');

    const user = await User.findOne({ socketId: socket.id });
    if (!user) {
      console.log('User not found for socketId:', socket.id);
      return;
    }

    let room = await Room.findOne({ name: roomName });
    if (!room) {
      room = new Room({ name: roomName, users: [user._id] });
      await room.save();
      console.log(`Created new room: ${roomName}`);
    } else {
      if (!room.users.includes(user._id)) {
        room.users.push(user._id);
        await room.save();
        console.log(` Added ${username} to room: ${roomName}`);
      }
    }

    socket.join(roomName);
    console.log(` ${username} joined room: ${roomName}`);

    socket.to(roomName).emit('user-connected', username);

  } catch (err) {
    console.error('Error in joinRoom:', err);
  }
};

exports.sendMessage = async (socket, io, { roomName, message }) => {
  try {
    const user = await User.findOne({ socketId: socket.id });
    if (user) {
      io.to(roomName).emit('chat-message', {
        username: user.username,
        text: message
      });
      console.log(`${user.username} → [${roomName}]: ${message}`);
    }
  } catch (err) {
    console.error('Error sending message:', err);
  }
};
