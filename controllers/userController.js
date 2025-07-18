const User = require('../models/userModel');

exports.newUser = async (socket, io, username) => {
    const user = new User({ username, socketId: socket.id });
    await user.save();
    socket.broadcast.emit('user-connected', username);
};

exports.sendMessage = async (socket, io, message) => {
    const user = await User.findOne({ socketId: socket.id });
    if (user) {
      socket.broadcast.emit('chat-message', {
        username: user.username,
        text: message
      });
    }
  };

exports.disconnect = async (socket, io) => {
  try {
    const user = await User.findOneAndDelete({ socketId: socket.id });
    if (user) {
      socket.broadcast.emit('user-disconnected', user.username);
    }
  } catch (err) {
    console.error('❌ Error in disconnect:', err);
  }
};
