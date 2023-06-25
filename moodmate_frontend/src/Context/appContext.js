import React, { useContext, useState } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [yourMood, setYourMood] = useState("");
  const [yourName, setYourName] = useState("");
  const [senderMood, setSenderMood] = useState("");
  const [toastIdUsers, setToastIdUsers] = useState("");
  const [isEnable, setIsEnable] = useState(true);

  return (
    <AppContext.Provider
      value={{
        yourMood,
        senderMood,
        yourName,
        setSenderMood,
        setYourMood,
        setYourName,
        toastIdUsers,
        setToastIdUsers,
        isEnable,
        setIsEnable,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
