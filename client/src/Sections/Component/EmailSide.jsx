/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from "react-router-dom";
import Input from "./Inputs";
import verify from "./Registration-Images/verify.png";

const EmailSide = () => {
  // const navigate =
  const navigate = useNavigate();
  return (
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
          <Input />
          <Input />
          <Input />
          <Input />
          <Input />
          <Input />
        </div>
        <button
          className="text-[#ff6132] bg-white w-[453px] rounded-[12.11px] pt-[16.15px] pr-[48.44px] pb-[16.15px] pl-[48.44px] mb-4 max-[500px]:w-[250px] "
          onClick={() => navigate("/verified")}
        >
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
  );
};
export default EmailSide;
