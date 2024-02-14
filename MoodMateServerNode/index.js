const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
const startChatApp = require("./chat");

app.use(cors());
app.use(express.json());

let users = [];

const server = app.listen(port, { cors: { origin: "localhost:5173" } }, () => {
  console.log(`Server running on port ${port}`);
});

startChatApp(server);

// const io = getIO(server);

// io.on("connection", (socket) => {
//   users.push(socket.id);
//   io.emit("userList", users);
//   socket.on("sendMessage", (message) => {
//     io.emit("message", message);
//   });

//   socket.on("disconnect", () => {
//     users = users.filter((item) => {
//       return item !== socket.id;
//     });
//     io.emit("userList", users);
//     console.log(`Socket ${socket.id} disconnected`);
//   });
// });

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
