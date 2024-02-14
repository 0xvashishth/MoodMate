let io = null;

const getIO = (server) => {
  if (io == null) {
    io = require("socket.io")(server);
    return io;
  } else {
    return io;
  }
};

module.exports = getIO;
