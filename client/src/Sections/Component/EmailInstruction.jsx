/* eslint-disable react/no-unescaped-entities */
import SideBar from "./SideBar";
import emailImage from "../Plans-Images/img/Group.png";
import rect1 from "../Plans-Images/Rectangle-6.png";
import rect2 from "../Plans-Images/Rectangle-7.png";
const EmailInstruction = () => {
  return (
    <div className="flex gap-4">
      <SideBar />
      <div className="flex flex-col items-center justify-center">
        <img
          className="bg-[#ff6132] bg-opacity-10 p-11 rounded-full w-[150px] h-[150px]"
          src={emailImage}
          alt=""
        />
        <h1 className="text-3xl font-bold">Check Your Mail</h1>
        <p className="mt-8 text-center p-5">
          We've sent a password recovery instruction to your mail
        </p>
        <div className="flex mt-4 -ml-52 forgotPasswordScreen:hidden">
          <img src={rect1} alt="" />
          <img className="w-[92px] h-[75px] mt-10" src={rect2} alt="" />
        </div>
      </div>
    </div>
  );
};
export default EmailInstruction;
