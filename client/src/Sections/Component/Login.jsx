import Pray from "./Registration-Images/Pray-white.png";
import Lock from "./Registration-Images/Lock.png";
import Hide from "./Registration-Images/Hide.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="flex p-16 gap-20 container mx-auto max-loginScreen1:flex-col-reverse">
      <div className="bg-[#180F4B] w-[900px] h-[800px] rounded-[14px] flex flex-col items-center justify-center text-white loginScreen:w-full max-loginScreen1:w-[100%] max-loginScreen1:h-[400px]">
        <img src={Pray} alt="" />
        <h1 className="font-bold text-3xl">Faith Connect</h1>
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-black text-2xl mb-20">Login</p>
        <input
          type="email"
          className="w-[425px] h-[60px] rounded-[10px]  border-[3px] placeholder:text-xl border-gray-700 text-black placeholder:text-center max-loginScreen:w-[100%]"
          placeholder="Username or email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="flex justify-between border-[3px] mt-8 w-[425px] h-[60px] rounded-[10px] border-gray-800 max-loginScreen:w-[100%]">
          <img
            className="w-[18.12px] h-[20px] mt-4 ml-2 cursor-pointer"
            src={Lock}
            alt=""
          />
          <input
            type="password"
            placeholder="Enter Password"
            className="text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <img
            src={Hide}
            className="w-[19px] h-[20px] mt-4 cursor-pointer"
            alt=""
          />
        </div>
        <a
          className="text-right mt-3 mb-4 cursor-pointer"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?{" "}
        </a>
        <button className="text-white bg-[#FF6132] rounded-[5px] w-[425px] h-[60px] text-center max-loginScreen1:w-[100%]">
          Login
        </button>
      </div>
    </div>
  );
};
export default Login;
