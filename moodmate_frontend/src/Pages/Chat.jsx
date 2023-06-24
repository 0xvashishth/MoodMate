import ReceivingChat from "../Components/ReceivingChat";
import SendingChat from "../Components/SendingChat";
import { moodVal, gifObj } from "../utils/Dummy";

import React from "react";

const Chat = () => {
  return (
    <div className="h-screen bg-cyan-100 flex justify-around text-center flex-col relative">
      <div>
        <div className="h-[90vh] overflow-scroll my-5 pb-6 flex flex-col gap-1">
          <SendingChat
            gif={0}
            sender={"prince"}
            msg={
              "helloSendingChatSendingChatSendingChatSendingChatSendingChatSendingChatSendingChatSendingChatSendingChatSendingChatSendingChatSendingChatSendingChatSendingChatSendingChatSendingChatSendingChatSendingChatSendingChatSendingChatSendingChatSendingChat"
            }
          />
          <SendingChat
            gif={0}
            sender={"prince"}
            msg={
              "helloSendingChatSendingChatSendingChatSendingChatSendingChatSendingChatSendingChatSendingChatSendingChatSendingChat"
            }
          />
          <ReceivingChat
            gif={0}
            sender={"prince"}
            msg={
              "helloSendingChatSendingChatSendingChatSendingChatSendingChatSendingChatSendingChatSendingChatSendingChatSendingChatSendingChat"
            }
          />
          <SendingChat gif={4} sender={"prince"} msg={"hello"} />
          <SendingChat
            gif={2}
            sender={"prince"}
            msg={
              "helloSendingChatSendingChatSendingChatSendingChatSendingChatSendingChatSendingChatSendingChat"
            }
          />
          <ReceivingChat
            gif={3}
            sender={"prince"}
            msg={
              "helloSendingChatSendingChatSendingChatSendingChatSendingChatSendingChatSendingChatSendingChatSendingChatSendingChatSendingChat"
            }
          />
          <ReceivingChat gif={4} sender={"prince"} msg={"helloSending"} />
        </div>
        <div className="absolute bottom-2 w-full p-2 md:px-10">
          <input className="w-full text-xl h-14 outline-none p-2" />
        </div>
      </div>
    </div>
  );
};

export default Chat;
