/* eslint-disable react/no-unescaped-entities */
import verify from "./Registration-Images/verify.png";
import pray from "../Plans-Images/Pray.png";
import rect1 from "../Plans-Images/Rectangle-6.png";
import rect2 from "../Plans-Images/Rectangle-7.png";
// import ValidationSide from '../'
const Validation = () => {
  return (
    <div className="flex gap-12 px-8 overflow-hidden max-validationBreakPoint:w-full">
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

      <div className="bg-[#ff6132] w-[600px] h-[900px] flex flex-col text-center items-center text-white justify-center max-validationBreakPoint:justify-normal validationBreakPoint:-mt-10 validationBreakPoint:w-full">
        <div className="p-8 max-validationBreakPoint:p-0">
          <img
            src={verify}
            className="hidden max-validationBreakPoint:block mx-auto max-[444px]:w-[200px] max-[444px]:h-[200px] max-[444px]:ml-16"
            alt=""
          />
          <div>
            <p className="text-3xl font-bold mb-3 max-[444px]:text-xl">
              Email Verification
            </p>
            <p>
              Please enter the <br className="hidden max-[444px]:block px-4" />{" "}
              verification code that was sent your registered{" "}
              <br className="hidden max-[444px]:block" /> email address
            </p>
          </div>

          <div className="flex gap-[6.46px] ml-24 mt-28 mb-5 max-validationBreakPoint:w-full max-validationBreakPoint:ml-18 max-[559px]:ml-16 max-[450px]:ml-10 max-[420px]:ml-6 max-[407px]:ml-3">
            <Input></Input>
            <Input></Input>
            <Input></Input>
            <Input></Input>
            <Input></Input>
            <Input></Input>
          </div>
          <button className="text-[#ff6132] bg-white w-[453px] rounded-[12.11px] pt-[16.15px] pr-[48.44px] pb-[16.15px] pl-[48.44px] mb-4 max-[500px]:w-[250px] ">
            Verify
          </button>
          <p>
            Didn't receive code?{" "}
            <a href="" className="text-black">
              Resend
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
function Input() {
  return (
    <div>
      <input
        type="text"
        className="w-[46.11px] h-[48.86px] max-[389px]:w-[36px] max-[389px]:h-[40px] rounded-[8.72px] border-[0.87px] pt-[16.15px] text-black text-center"
      />
    </div>
  );
}
export default Validation;
