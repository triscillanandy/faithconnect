import Pray from "./Registration-Images/Pray-white.png";
const PasswordSide = () => {
  return (
    <div className="bg-[#180F4B] w-[900px] h-[800px] rounded-[14px] flex flex-col items-center justify-center text-white loginScreen:w-full max-loginScreen1:w-[100%] max-loginScreen1:h-[400px]">
      <img src={Pray} alt="" />
      <h1 className="font-bold text-3xl">Faith Connect</h1>
    </div>
  );
};
export default PasswordSide;
