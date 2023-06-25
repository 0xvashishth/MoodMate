import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./Pages/Profile";
import Chat from "./Pages/Chat";
import { useState } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
// require('dotenv').config()
import toast, { Toaster } from "react-hot-toast";

function App() {
  var toastId;
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const joinRoom = async (user, UserWant, UserIs) => {
    toastId = toast.loading("Please wait 😉");
    try {
      const connection = new HubConnectionBuilder()
        .withUrl(process.env["REACT_APP_BASE_URL"])
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReceiveMessage", (user, message) => {
        setMessages((messages) => [...messages, { user, message }]);
      });

      connection.on("UsersInRoom", (users) => {
        setUsers(users);
      });

      connection.onclose((e) => {
        setConnection();
        setMessages([]);
        setUsers([]);
      });
      toast.loading("Crunching your moodMate 😋", {
        id: toastId,
      });
      await connection.start();
      await connection.invoke("JoinRoom", {
        user,
        room: "yes",
        isAvailable: false,
        UserIs,
        UserWant,
        connectionId: "567232",
      });
      toast.success("Room Is Created 😁", {
        id: toastId,
      });
      setConnection(connection);
    } catch (e) {
      toast.error("Something Went Wrong 😣, Please Try Again!", {
        id: toastId,
      });
      console.log(e);
    }
  };

  const sendMessage = async (message) => {
    try {
      await connection.invoke("SendMessage", message);
    } catch (e) {
      console.log(e);
    }
  };

  const closeConnection = async () => {
    try {
      await connection.stop();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="App">
      <Toaster position="top-center" reverseOrder={false} />
      {!connection ? (
        <Profile joinRoom={joinRoom} />
      ) : (
        <Chat
          sendMessage={sendMessage}
          messages={messages}
          users={users}
          closeConnection={closeConnection}
        />
      )}
    </div>
  );
}

export default App;
