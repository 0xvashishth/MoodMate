import React, { useState } from "react";
import { gifObj, moodVal } from "../utils/Dummy";
import logo from "../utils/logo.png";
import { useAppContext } from "../Context/appContext";

import toast, { Toaster } from "react-hot-toast";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Profile = ({ joinRoom }) => {
  const [gif, setGif] = useState(0);
  const [mood, setMood] = useState(0);
  const [user, setUser] = useState();
  const [isDisable, setIsDisable] = useState(false);
  const { setSenderMood, setYourMood, setYourName, setIsEnable, isEnable } =
    useAppContext();
  var toastId;
  return (
    <div className="-mt-4 min-h-screen p-5 flex justify-center text-center flex-col gap-14 md:gap-16">
      <div>
        <img src={logo} className="m-auto h-20 w-auto" />
      </div>
      <div className="flex justify-center gap-11">
        <input
          className="lg:w-1/4 w-2/3 rounded-lg outline-none h-10 p-4"
          placeholder="Enter Your Nickname"
          onChange={(e) => setUser(e.target.value)}
        />
        <button
          className={`text-lg bg-blue-400 text-white border-black p-1 rounded-lg h-10 w-20`}
          onClick={(e) => {
            e.preventDefault();
            if (isEnable) {
              setIsEnable(false);
              if (user != null) {
                console.log(user, moodVal[mood], moodVal[gif]);
                setYourMood(gif);
                setSenderMood(mood);
                setYourName(user);
                joinRoom(user, moodVal[mood], moodVal[gif]);
              } else {
                toastId = toast.error("Please Enter your nick name 😏");
              }
            }
          }}
        >
          Enter
        </button>
      </div>
      <div className="flex justify-center text-center">
        <button
          onClick={() => {
            setGif((prev) => (prev + 8) % 9);
          }}
          className="block m-auto mr-0"
        >
          <FaArrowLeft size={"30px"} style={{ color: "#60A5FA" }} />
        </button>
        <img className="m-auto w-40 h-40 md:w-44 md:h-auto" src={gifObj[gif]} />
        <button
          onClick={() => {
            setGif((prev) => (prev + 1) % 9);
          }}
          className="block m-auto ml-0"
        >
          <FaArrowRight size={"30px"} style={{ color: "#60A5FA" }} />
        </button>
      </div>
      <div className="flex flex-col justify-center gap-8">
        <p className="text-2xl md:text-3xl">
          I'm {moodVal[gif]}, I wanna talk with {moodVal[mood]}
        </p>
        <div className="flex flex-wrap gap-5 justify-center">
          {moodVal.map((e, i) => {
            return (
              <button
                className={`text-lg ${
                  mood === i && "bg-blue-400 text-white"
                } border-black p-2 rounded-lg`}
                value={i}
                key={e}
                onClick={() => setMood(i)}
              >
                {e}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
