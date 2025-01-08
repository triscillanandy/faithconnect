import { useNavigate } from "react-router-dom";
import VisualImg from "./Component/VisualImg";

// import Pray from "./Plans-Images/Pray.png";
import personalPlan from "./PlanImage/Personal.png";
import groupPlan from "./PlanImage/Group.png";
/* Rectangle 6 */

// const imgStyle = {
//   position: "absolute",
//   width: "127px",
//   height: "172px",
//   left: "-65px",
//   top: "713px",

//   background: "#FC630D",
//   borderRadius: "80px",
// };

const Plans = () => {
  const navigate = useNavigate();
  return (
    <div className="container relative bg-white mx-auto font-poppins">
      <div className="flex flex-col justify-center items-center mt-10">
        {/* <img src={Pray} alt="Pray" /> */}
        <p className=" font-poppins font-bold text-[32px]">
          Faith<span className="text-mainTheme">Connect</span>
        </p>
        <h1 className="capitalize font-semibold font-poppins text-2xl mt-20">
          Create an account
        </h1>
        <p className="font-poppins font-[500] mt-20 text-lg">
          Please select your faith connect account
        </p>
        <div className="flex mt-7 gap-5 px-5 max-planSmallerScreen:flex-col">
          <div
            className="border border-[#FF6132] w-[250px] planSmallScreen:w-[351px] max-planSmallerScreen:w-[100%]  h-[237px] rounded-md flex flex-col  items-center max-planSmallerScreen:px-4 cursor-pointer"
            onClick={() => navigate("/individual-registration")}
          >
            <img src={personalPlan} className="mt-10" alt="Individual Image" />
            <p className="font-bold text-black ">Personal</p>
            <p className="text-black font-bold">Individual Account</p>
          </div>
          <div
            className="w-[250px] h-[237px] bg-[#FF6132] planSmallScreen:w-[370px] text-black  font-bold rounded-md flex flex-col items-center max-planSmallerScreen:w-[100%] max-planSmallerScreen:px-4 cursor-pointer"
            onClick={() => navigate("/group-registration")}
          >
            <img src={groupPlan} className="mt-10 " alt="Group" />
            <p>Organisation</p>
            <p>Church Groups / Organisations</p>
          </div>
        </div>
      </div>
      <p className=" text-center mt-14 font-[400]">
        Already have an account?
        <a
          className="text-mainTheme cursor-pointer"
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
