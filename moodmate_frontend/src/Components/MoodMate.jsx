import React from "react";
import { BsRobot } from "react-icons/bs";

const MoodMate = ({ msg }) => {
  return (
    <div className="text-center mb-4">
      <div className="w-fit flex justify-center flex-row m-auto bg-white p-3 px-6 rounded-lg gap-3">
        <BsRobot className="my-auto block" />
        <p className="w-fit bg-white rounded-md">{msg}</p>
      </div>
    </div>
  );
};

export default MoodMate;
