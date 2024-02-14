import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./Pages/Profile";
import Chat from "./Pages/Chat";
import { useState } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
// require('dotenv').config()
import toast, { Toaster } from "react-hot-toast";
import { useAppContext } from "./Context/appContext";
import Privacy from "./Components/Privacy";

function App() {
  var toastId;
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const { setIsEnable, privacy, isSent, setIsSent } = useAppContext();
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
      toast.loading("Crunching your MoodMate 😋", {
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
      toast.success("Joined The Room 😁", {
        id: toastId,
      });
      setConnection(connection);
    } catch (e) {
      toast.error("Something Went Wrong 😣, Please Try Again!", {
        id: toastId,
      });
      console.log(e);
    }
    setIsEnable(true);
  };

  const sendMessage = async (message) => {
    if (isSent) {
      setIsSent(false);
      try {
        toastId = toast.loading("Sending Your Message..");
        await connection.invoke("SendMessage", message);
        toast.success("Sent", {
          id: toastId,
        });
      } catch (e) {
        console.log(e);
      }
      setIsSent(true);
    }
  };

  const FindConnection = async () => {
    try {
      await connection.invoke("CheckAvailable");
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
      {privacy && <Privacy />}
      <Toaster position="top-center" reverseOrder={false} />
      {!connection ? (
        <Profile joinRoom={joinRoom} />
      ) : (
        <Chat
          sendMessage={sendMessage}
          messages={messages}
          users={users}
          closeConnection={closeConnection}
          FindConnection={FindConnection}
        />
      )}
    </div>
  );
}

export default App;
