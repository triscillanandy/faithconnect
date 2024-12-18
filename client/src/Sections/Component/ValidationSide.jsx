/* eslint-disable react/no-unescaped-entities */
import verify from "./Registration-Images/verify.png";
import pray from "../Plans-Images/Pray.png";
import rect1 from "../Plans-Images/Rectangle-6.png";
import rect2 from "../Plans-Images/Rectangle-7.png";
function ValidationSide() {
  return (
    <div className="relative max-validationBreakPoint:hidden">
      <div className="ml-3">
        <img src={pray} alt="" />
        <p className="text-[#ff6132] text-xl mt-[-7px]">FaithConnect</p>
      </div>
      <img className="mt-32 w-[320px] h-[320px]" src={verify} alt="" />

      <div className="mt-32">
        <p className="text-[#ff6132] -mb-28 text-center">
          Let's get you all setup and good to go.
        </p>
        <div className="flex mt-32">
          <img className="h-[120px]" src={rect1} alt="" />
          <img className="h-[70px] mt-[52px] ml-[-1px] " src={rect2} alt="" />
        </div>
      </div>
    </div>
  );
}
export default ValidationSide;
