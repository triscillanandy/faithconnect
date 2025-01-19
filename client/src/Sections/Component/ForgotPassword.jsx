import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SideBar from "./SideBar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/forgot-password`, {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
  
console.log(response);
      if (response.ok) {
         toast.success("Email sent successful!");
       // navigate("/Login");
      } else {
        console.error("Failed to send email");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex container mx-auto p-5 items-center gap-20">
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
      
      <SideBar />
      <form className="max-forgotPasswordScreen:mx-auto">
        <p className="font-bold text-2xl mt-[-150px] max-forgotPasswordScreen:mt-3 ">
          Forgot Your Password
        </p>
        <p className="w-[425px] mt-7">
          Please enter your registered email below to receive your password
          reset instructions.
        </p>
        <input
          type="email"
          className="w-[425px] h-[60px] rounded-[10px] border-[3px] border-gray-700 mt-7 placeholder:text-center text-center block"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="bg-[#FF6132] w-[423px] h-[60px] rounded-[5px] text-white text-center mt-7"
          onClick={handleSubmit}
        >
          Send
        </button>
        <div className="flex items-center ml-8 gap-6 mt-8">
          <hr className="w-[140px] border border-[#180F4B]" />
          <p>Or</p>
          <hr className="w-[140px] border border-[#180F4B]" />
        </div>
        <p
          className="text-[#ff6132] ml-44 mt-10 cursor-pointer"
          onClick={() => navigate("/Login")}
        >
          Go Back
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
