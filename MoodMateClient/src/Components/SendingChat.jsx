import React from "react";
import { gifObj } from "../utils/Dummy";

const SendingChat = ({ gif, msg }) => {
  return (
    <div className="flex md:px-10 flex-col gap-5">
      <div className="w-full md:w-2/3 m-auto mr-0">
        <div className="flex gap-4 max-w-fit p-4 rounded-md relative m-auto mr-0">
          <div className="absolute top-4 right-3">
            <img className="object-fill w-10 h-auto" src={gifObj[gif]}></img>
          </div>
          <div className="w-full text-right pr-12 whitespace-nowrap">
            <div className="w-full bg-white pt-2 px-4 rounded-lg">
              <p className="font-semibold">You</p>
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

export default SendingChat;
