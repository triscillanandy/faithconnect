import { useNavigate } from "react-router-dom";
import Pray from "./Plans-Images/Pray.png";

const LandingPage1 = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center mx-auto mt-12 sm:mt-14 px-4 sm:px-6 w-full max-w-4xl">
      {/* Top Section: Icon and FaithConnect Text */}
      <div className="flex flex-col items-center gap-4 sm:gap-6 mb-6 sm:mb-10">
        <img
          className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28" // Slightly bigger for better visibility
          src={Pray}
          alt="Pray"
        />
        <p className="font-bold text-2xl sm:text-3xl md:text-4xl">
          Faith<span className="text-[#FF6132]">Connect</span>
        </p>
      </div>

      {/* Description Text */}
      <p className="text-center text-base sm:text-lg md:text-xl mt-6 sm:mt-10 mb-8 sm:mb-12 w-full max-w-[500px] px-4">
        Connect with Christians worldwide, discover uplifting content and grow
        spiritually in a safe and welcoming space.
      </p>

      {/* Join Button */}
      <button
        className="bg-[#FF6132] text-white rounded-[20px] w-full max-w-[500px] mt-8 sm:mt-12 h-14 sm:h-16 md:h-18 text-base sm:text-lg md:text-xl"
        onClick={() => navigate("/plans")}
      >
        Join the Faith Community Today!
      </button>
    </div>
  );
};

export default LandingPage1;
