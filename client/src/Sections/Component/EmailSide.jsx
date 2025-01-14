import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import verify from "./Registration-Images/verify.png";

const EmailSide = () => {
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);

  const navigate = useNavigate();

  const handleVerify = async () => {
    const code = verificationCode.join(""); // Combine the input fields into a single code

    if (code.length !== 6 || verificationCode.includes("")) {
      
      toast.error("Please enter a valid 6-digit verification code."); // Show error message with toast
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ verificationCode: code }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Verification successful! Redirecting..."); // Success message
        navigate("/verified"); // Redirect to the verified page
      } else {
        
        toast.error(result.message || "Verification failed. Please try again."); // Error message
      }
    } catch (error) {
     
      toast.error("Something went wrong. Please try again."); // Error message
    }
  };

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // Allow only a single digit

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Automatically move focus to the next input if not the last
    if (value && index < 5) {
      const nextInput = document.getElementById(`input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  return (
    <div className="bg-[#ff6132] w-[600px] h-[900px] flex flex-col text-center items-center text-white justify-center max-validationBreakPoint:justify-normal validationBreakPoint:-mt-10 validationBreakPoint:w-full">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="p-8 max-validationBreakPoint:p-0">
        <img
          src={verify}
          className="hidden max-validationBreakPoint:block mx-auto max-[444px]:w-[200px] max-[444px]:h-[200px] max-[444px]:ml-16"
          alt="Verification Illustration"
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
          {verificationCode.map((digit, index) => (
            <input
              key={index}
              id={`input-${index}`}
              type="text"
              value={digit}
              maxLength="1"
              className="w-10 h-10 text-center text-black rounded-lg"
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && !digit && index > 0) {
                  const prevInput = document.getElementById(`input-${index - 1}`);
                  if (prevInput) prevInput.focus();
                }
              }}
            />
          ))}
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <button
          className="text-[#ff6132] bg-white w-[453px] rounded-[12.11px] pt-[16.15px] pr-[48.44px] pb-[16.15px] pl-[48.44px] mb-4 max-[500px]:w-[250px]"
          onClick={handleVerify}
        >
          Verify
        </button>
        <p>
          Didn't receive code?{" "}
          <a href="#" className="text-black">
            Resend
          </a>
        </p>
      </div>
    </div>
  );
};

export default EmailSide;
