import Pray from "./Registration-Images/Pray-white.png";
const SideBar = () => {
  return (
    <div className="w-[537px] h-[700px] bg-[#180F4B] flex flex-col justify-center items-center max-forgotPasswordScreen:hidden">
      <img className="w-[103px] h-[104px]" src={Pray} alt="" />
      <h2 className="text-white text-2xl">Faith Connect</h2>
    </div>
  );
};
export default SideBar;
