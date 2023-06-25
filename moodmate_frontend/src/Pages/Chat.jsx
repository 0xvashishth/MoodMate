import ReceivingChat from "../Components/ReceivingChat";
import SendingChat from "../Components/SendingChat";
import MoodMate from "../Components/MoodMate";
import { useState, useRef, useEffect } from "react";
import { BiSend } from "react-icons/bi";
import { useAppContext } from "../Context/appContext";
import React from "react";

const Chat = ({ sendMessage, messages, users, closeConnection }) => {
  const [message, setMessage] = useState("");
  const scr = useRef(null);
  const {
    yourMood,
    yourName,
    senderMood,
    setSenderMood,
    setYourMood,
    setYourName,
  } = useAppContext();
  useEffect(() => {
    scr.current.scrollIntoView();
  }, [messages]);
  return (
    <div className="h-screen bg-cyan-100 flex justify-around text-center flex-col relative">
      <div className="leave-room text-lg bg-blue-400 text-white border-black rounded-lg h-10 w-20 top-2 right-3 md:right-10 absolute p-[0.35rem]">
        <button
          variant="danger"
          onClick={() => {
            setYourMood("");
            setSenderMood("");
            setYourName("");
            closeConnection();
          }}
        >
          <p className="block m-auto">Leave</p>
        </button>
      </div>
      <div>
        <div users={users}>{console.log(users)}</div>
      </div>
      <div>
        <div className="h-[90vh] overflow-scroll my-5 pb-6 flex flex-col gap-1">
          {messages.map((m, index) =>
            yourName == m.user ? (
              <SendingChat
                key={index}
                gif={yourMood}
                sender={m.user}
                msg={m.message}
              />
            ) : "MoodMate" == m.user ? (
              <MoodMate msg={m.message} />
            ) : (
              <ReceivingChat
                key={index}
                gif={senderMood}
                sender={m.user}
                msg={m.message}
              />
            )
          )}
          <div ref={scr}></div>
        </div>
        <div className="absolute bottom-2 w-full p-2 md:px-10 h-auto flex gap-4 justify-around text-center">
          <textarea
            className="w-[80%] md:w-[96%] text-xl outline-none  custom-truncate2 h-[2.7rem] resize-none m-auto p-2 rounded-lg px-4 noScroll"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <button
            className="bg-blue-400 rounded-full h-12 w-12"
            onClick={(e) => {
              e.preventDefault();
              sendMessage(message);
              setMessage("");
            }}
          >
            <BiSend className="m-auto block w-7 h-7" color="white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
