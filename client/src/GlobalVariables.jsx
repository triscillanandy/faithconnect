/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const MyContext = createContext();

const MyProvider = ({ children }) => {
  // const  const [userName, setUserName] = useState("Jane Cooper");
  const [userHandle, setUserHandle] = useState("jane_cooper_123");
  const [pronouns, setPronouns] = useState("He");
  const [bio, setBio] = useState("All will be well in his name");
  const [userName, setUserName] = useState("Jane Cooper");

  return (
    <MyContext.Provider
      value={{
        userHandle,
        setUserHandle,
        pronouns,
        setPronouns,
        bio,
        setBio,
        userName,
        setUserName,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
export { MyContext, MyProvider };
