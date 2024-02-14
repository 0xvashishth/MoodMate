const getIO = require("./getIO");
const User = require("./models/user");

let users = [];

const startChatApp = (server) => {
  const io = getIO(server);
  io.on("connection", (socket) => {
    socket.on("JoinRoom", ({ name, userIs, userWant }) => {
      const user = users.find(
        (user) =>
          user.isAvailable && user.userIs == userWant && user.userWant == userIs
      );
      const connectionUser = new User(name, userIs, userWant, socket.id);
      io.sockets
        .in(connectionUser.room)
        .emit("UsersInRoom", { connectionUser: connectionUser });
      if (user) {
        connectionUser.isAvailable = false;
        user.isAvailable = false;
        connectionUser.room = user.room;
        users.push(connectionUser);
        socket.leave(connectionUser.room);
        socket.join(user.room);
        io.sockets.in(connectionUser.room).emit("ReceiveMessage", {
          name: "MoodMate",
          message: `Wow, ${name} has joined 🎉\n Same mood, same room. 😉`,
        });
        io.sockets
          .in(connectionUser.room)
          .emit("UsersInRoom", { user: user, connectionUser: connectionUser });
      } else {
        users.push(connectionUser);
        socket.join(connectionUser.room);
        io.sockets
          .in(connectionUser.room)
          .emit("UsersInRoom", { connectionUser: connectionUser });
      }
    });

    socket.on("SendMessage", (message) => {
      const { name, room } = users.find((user) => user.socketId == socket.id);
      io.sockets.in(room).emit("ReceiveMessage", { name, message });
    });

    socket.on("CheckAvailable", (message) => {
      const connectionUser = users.find((user) => user.socketId == socket.id);
      const user = users.find(
        (user) =>
          user.isAvailable &&
          user.userIs == connectionUser.userWant &&
          user.userWant == connectionUser.userIs &&
          user.socketId != socket.id
      );
      if (user) {
        connectionUser.isAvailable = false;
        user.isAvailable = false;
        connectionUser.room = user.room;
        socket.join(connectionUser.room);
        io.sockets.in(connectionUser.room).emit("ReceiveMessage", {
          name: "MoodMate",
          message: `Wow, ${connectionUser.name} has joined 🎉\n Same mood, same room. 😉`,
        });
        io.sockets
          .in(connectionUser.room)
          .emit("UsersInRoom", { user: user, connectionUser: connectionUser });
      }
    });

    socket.on("disconnect", () => {
      const disconnectedUserInd = users.findIndex(
        (user) => user.socketId == socket.id
      );
      const disconnectedUser = users[disconnectedUserInd];
      if (disconnectedUser) {
        const room = disconnectedUser.room;
        const moodMate = users.find(
          (user) => user.room == room && user.name != disconnectedUser.name
        );
        if (moodMate) {
          moodMate.isAvailable = true;
        }
        io.sockets.in(disconnectedUser.room).emit("ReceiveMessage", {
          name: "MoodMate",
          message: `${disconnectedUser.name} has Left. 🥲`,
        });
        io.sockets.in(room).emit("UsersInRoom", { connectionUser: moodMate });
        users.splice(disconnectedUserInd, 1);
      }
    });
  });
};

module.exports = startChatApp;

// socket.emit('message', "this is a test"); //sending to sender-client only

// socket.broadcast.emit('message', "this is a test"); //sending to all clients except sender

// socket.broadcast.to('game').emit('message', 'nice game'); //sending to all clients in 'game' room(channel) except sender

// socket.to('game').emit('message', 'enjoy the game'); //sending to sender client, only if they are in 'game' room(channel)

// socket.broadcast.to(socketid).emit('message', 'for your eyes only'); //sending to individual socketid

// io.emit('message', "this is a test"); //sending to all clients, include sender

// io.in('game').emit('message', 'cool game'); //sending to all clients in 'game' room(channel), include sender

// io.of('myNamespace').emit('message', 'gg'); //sending to all clients in namespace 'myNamespace', include sender

// socket.emit(); //send to all connected clients

// socket.broadcast.emit(); //send to all connected clients except the one that sent the message

// socket.on(); //event listener, can be called on client to execute on server

// io.sockets.socket(); //for emiting to specific clients

// io.sockets.emit(); //send to all connected clients (same as socket.emit)

// io.sockets.on() ; //initial connection from a client.
