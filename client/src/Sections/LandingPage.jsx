import { useNavigate } from "react-router-dom";
import Pray from "./Component/Registration-Images/Pray-white.png";
const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div
      className="w-[1040px] h-[700px] rounded-[15px] text-white bg-[#ff6132] mx-auto flex flex-col justify-center mt-4 max-landingPageScreenSecondBreakPoint:mx-0 max-landingPageScreenFirstBreakPoint:w-[600px] max-landingPageScreenSecondBreakPoint:h-[100vh]
    max-landingPageScreenSecondBreakPoint:w-full
    "
    >
      <div className="mx-auto flex flex-col">
        <div className="flex items-center justify-center">
          <img
            className="w-[127px] h-[103px] max-landingPageScreenFourthBreakPoint:hidden"
            src={Pray}
            alt=""
          />
          <h1 className="text-[32px] mt-10">FaithConnect</h1>
        </div>
        <div>
          <p className="text-center mt-4 mb-4 font-bold text-lg max-landingPageThirdScreenBreakPoint:whitespace-normal ">
            A community of believers,
            <br className="hidden max-landingPageThirdScreenBreakPoint:block" />
            sharing faith and inspiration
          </p>
          <p className="text-center mb-10 max-landingPageThirdScreenBreakPoint:mx-auto text-lg">
            Connect with Christians worldwide,
            <br className="hidden max-landingPageThirdScreenBreakPoint:block" />
            discover uplifting content, and <br />
            grow spiritually in a safe and welcoming space.
          </p>
          <button
            className="w-[505px] h-[76px] rounded-[20px] bg-white text-black font-bold max-landingPageScreenSecondBreakPoint:w-[300px] max-landingPageScreenSecondBreakPoint:ml-20
            max-landingPageScreenFourthBreakPoint:ml-0
            max-landingPageScreenFourthBreakPoint:w-full
            max-landingPageScreenFourthBreakPoint:h-[60px] "
            onClick={() => navigate("/plans")}
          >
            Join the Faith Community Today!
          </button>
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
