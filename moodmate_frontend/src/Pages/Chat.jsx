import ReceivingChat from "../Components/ReceivingChat";
import SendingChat from "../Components/SendingChat";
import { moodVal, gifObj } from "../utils/Dummy";
import { useState } from "react";

import React from "react";

const Chat = ({ sendMessage, messages, users, closeConnection }) => {
  const [message, setMessage] = useState("");

  return (
    <div className="h-screen bg-cyan-100 flex justify-around text-center flex-col relative">
      <div className="leave-room">
        <button
          variant="danger"
          onClick={() => {
            localStorage.removeItem("yourMood");
            localStorage.removeItem("senderMood");
            localStorage.removeItem("yourName");
            closeConnection();
          }}
        >
          Leave Room
        </button>
      </div>
      <div>
        <div users={users}>{console.log(users)}</div>
      </div>
      <div>
        <div className="h-[90vh] overflow-scroll my-5 pb-6 flex flex-col gap-1">
          {messages.map((m, index) =>
            localStorage.getItem("yourName") == m.user ? (
              <SendingChat
                key={index}
                gif={localStorage.getItem("yourMood")}
                sender={m.user}
                msg={m.message}
              />
            ) : (
              <ReceivingChat
                key={index}
                gif={localStorage.getItem("senderMood")}
                sender={m.user}
                msg={m.message}
              />
            )
          )}
        </div>
        <div className="absolute bottom-2 w-full p-2 md:px-10">
          <input
            className="w-full text-xl h-14 outline-none p-2"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              sendMessage(message);
              setMessage("");
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
