const User = require('../models/userModel');

exports.newUser = async (socket, io, username) => {
  try {
    const user = new User({ username, socketId: socket.id });
    await user.save();
    console.log(`New user connected: ${username}`);
  } catch (err) {
    console.error('Error creating user:', err);
  }};
exports.disconnect = async (socket, io) => {
  try {
    const user = await User.findOneAndDelete({ socketId: socket.id });
    if (user) {
      console.log(`${user.username} disconnected`);
      io.emit('user-disconnected', user.username);
    }
  } catch (err) {
    console.error('Error in disconnect:', err);
  }
};
