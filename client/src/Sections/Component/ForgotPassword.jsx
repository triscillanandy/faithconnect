import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SideBar from "./SideBar";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  return (
    <div className="flex container mx-auto p-5 items-center gap-20">
      <SideBar />
      <form className="max-forgotPasswordScreen:mx-auto">
        <p className="font-bold text-2xl mt-[-150px] max-forgotPasswordScreen:mt-3 ">
          Forgot Your Password
        </p>
        <p className="w-[425px] mt-7">
          Please enter your registered email below to receive your password
          reset instructions.
        </p>
        <input
          type="email"
          className="w-[425px] h-[60px] rounded-[10px] border-[3px] border-gray-700 mt-7 placeholder:text-center text-center block"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="bg-[#FF6132] w-[423px] h-[60px] rounded-[5px] text-white text-center mt-7"
          onClick={() => navigate("/email-popup")}
        >
          Send
        </button>
        <div className="flex items-center ml-8 gap-6 mt-8">
          <hr className="w-[140px] border border-[#180F4B]" />
          <p>Or</p>
          <hr className="w-[140px] border border-[#180F4B]" />
        </div>
        <p
          className="text-[#ff6132] ml-44 mt-10 cursor-pointer"
          onClick={() => navigate("/Login")}
        >
          Go Back
        </p>
      </form>
    </div>
  );
};
export default ForgotPassword;
