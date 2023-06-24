import React from "react";
import { gifObj } from "../utils/Dummy";

const ReceivingChat = ({ gif, sender, msg }) => {
  return (
    <div className="flex md:px-10 flex-col gap-5">
      <div className="w-full md:w-2/3">
        <div className="flex gap-4 max-w-fit p-4 rounded-md relative">
          <div className="absolute top-4 left-3">
            <img className="object-fill w-10 h-auto" src={gifObj[gif]}></img>
          </div>
          <div className="w-full text-left pl-12 whitespace-nowrap">
            <div className="w-full bg-white pt-2 px-4 rounded-lg">
              <p className="font-semibold">{sender}</p>
              <p className="max-h-52 overflow-scroll custom-truncate text-sm">
                {msg}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceivingChat;
