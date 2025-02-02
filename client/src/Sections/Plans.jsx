import { useNavigate } from "react-router-dom";
import VisualImg from "./Component/VisualImg";
import Pray from "./Plans-Images/Pray.png";
import personalPlan from "./PlanImage/Personal.png";
import groupPlan from "./PlanImage/Group.png";

const Plans = () => {
  const navigate = useNavigate();

  const handleUserTypeSelection = (type) => {
    localStorage.setItem("userType", type); // Store user type in localStorage
    navigate("/individual-registration");
  };

  return (
    <div className="container relative bg-white mx-auto">
      <div className="flex flex-col justify-center items-center mt-10">
        <img src={Pray} alt="Pray" />
        <p className="font-bold text-4xl mb-8 text-center">
          Faith<span className="text-[#FF6132]">Connect</span>
        </p>
        <h1 className="capitalize font-bold text-2xl mt-10">
          Create an account
        </h1>
        <p className="mt-10 text-lg">Please select your connect account</p>
        <div className="flex mt-7 gap-5 px-5 max-planSmallerScreen:flex-col">
          {/* Personal Plan */}
          <div
            className="border border-[#FF6132] w-[250px] planSmallScreen:w-[351px] max-planSmallerScreen:w-[100%] h-[237px] rounded-md flex flex-col items-center max-planSmallerScreen:px-4 cursor-pointer"
            onClick={() => handleUserTypeSelection("personal")}
          >
            <img
              src={personalPlan}
              className="mt-10 w-12 h-12" // Adjusted size to match the organisation image
              alt="Individual Image"
            />
            <p className="text-[#FF6132] mt-4">Personal</p> {/* Added mt-4 for consistent spacing */}
            <p className="text-[#FF6132]">Individual Account</p>
          </div>

          {/* Organisation Plan */}
          <div
            className="w-[250px] h-[237px] bg-[#FF6132] planSmallScreen:w-[370px] text-black  rounded-md flex flex-col items-center max-planSmallerScreen:w-[100%] max-planSmallerScreen:px-4 cursor-pointer"
            onClick={() => handleUserTypeSelection("organization_church")}
          >
            <img
              src={groupPlan}
              className="mt-10 w-12 h-12 rounded-full border-2 border-white" // Adjusted size to match the personal image
              alt="Group"
            />
            <p className="text-white mt-4">Organisation</p> {/* Added mt-4 for consistent spacing */}
            <p className="text-white">Church Groups / Organisations</p>
          </div>
        </div>
      </div>
      <p className="text-[#FF6132] text-center mt-3">
        Already have an account?{" "}
        <a
          className="text-black cursor-pointer"
          onClick={() => navigate("/Login")}
        >
          Sign In
        </a>
      </p>
      <VisualImg />
    </div>
  );
};

export default Plans;