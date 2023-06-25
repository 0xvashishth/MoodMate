import React, { useState } from "react";
import { gifObj, moodVal } from "../utils/Dummy";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Profile = ({ joinRoom }) => {
  const [gif, setGif] = useState(0);
  const [mood, setMood] = useState(0);
  const [user, setUser] = useState();
  const [room, setRoom] = useState();

  return (
    <div className="bg-cyan-100 h-screen w-screen p-5 flex justify-around text-center flex-col">
      <div>
        <h1 className="text-4xl">Mood Match</h1>
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
            console.log(user, moodVal[mood], moodVal[gif]);
            localStorage.setItem("yourMood", gif);
            localStorage.setItem("senderMood", mood);
            localStorage.setItem("yourName", user);
            joinRoom(user, moodVal[mood], moodVal[gif]);
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
