import { useNavigate } from "react-router-dom";
import Pray from "./Plans-Images/Pray.png";
const LandingPage1 = () => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col justify-center items-center mx-auto mt-24 px-6 max-w-72
    "
    >
      <div>
        <p className=" text-4xl font-poppins font-[700]  mb-8 text-center">
          Faith<span className="text-[#FF6132]">Connect</span>
        </p>
        <p className="text-center font-[400] font-poppins text-lg max-[316px]:px-2">
          Connect with Christians worldwide, discover uplifting content and grow
          spiritually in a safe and welcoming space
        </p>
        <button
          className="bg-[#FF6132] text-white rounded-[20px] font-poppins font-[600] w-[500px]  mt-52 h-[60px] max-[492px]:w-[300px]"
          onClick={() => navigate("/plans")}
        >
          Join the Faith Community Today!
        </button>
        <div className="flex flex-col items-center mt-48">
          <div className="flex items-center">
            <img className="w-[26px] h-[18px]" src={Pray} alt="" />
            <p className="font-bold font-poppins">
              Faith<span className="text-[#FF6132]">Connect</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LandingPage1;
