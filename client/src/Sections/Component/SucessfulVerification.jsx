// import Validation from "./Validation";
import icon from "./Registration-Images/icon.png";
import vector from "./Registration-Images/Vector.png";
import ValidationSide from "./ValidationSide";
import VerifyImg from "./Registration-Images/verify.png";

const SucessfulVerification = () => {
  return (
    <div className="flex gap-12 px-8 overflow-hidden max-validationBreakPoint:w-full">
      {/* <Validation />
       */}
      <ValidationSide />
      <OtherSide />
    </div>
  );
};
export default SucessfulVerification;

function OtherSide() {
  return (
    <div className="bg-[#FF6132] w-[526px] h-[825px] max-validationBreakPoint:h-[100vh]">
      <div className="flex justify-between px-3 mt-3 max-validationBreakPoint:hidden">
        <img src={icon} alt="" />
        <img src={vector} alt="" />
      </div>
      <div className="flex flex-col justify-center items-center text-white mt-[275px] max-validationBreakPoint:mt-[30px] max-validationBreakPoint:w-full">
        <img
          className="hidden max-validationBreakPoint:block"
          src={VerifyImg}
          alt=""
        />
        <div className="mt-8">
          <h2 className="text-2xl font-bold px-8 text-center">
            Your Email Address has been verified successfully.
          </h2>
          <h2 className="text-2xl font-bold px-8 text-center">
            Proceed to Login
          </h2>
        </div>

        <button className="text-[#ff6132] w-[425px] h-[60px] rounded-[5px] bg-white mt-32 max-[501px]:w-3/4">
          Create Password
        </button>
      </div>
    </div>
  );
}
