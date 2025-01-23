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
    <div className="flex flex-col md:flex-row container mx-auto p-5 items-center gap-5 md:gap-20">
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
  
      {/* Form placed first */}
      <form className="w-full max-w-md mx-auto">
        <p className="font-bold text-2xl mt-5 md:mt-0 text-center md:text-left">
          Forgot Your Password
        </p>
        <p className="w-full mt-7 text-center md:text-left">
          Please enter your registered email below to receive your password
          reset instructions.
        </p>
        <input
          type="email"
          className="w-full h-[60px] rounded-[10px] border-[3px] border-gray-700 mt-7 placeholder:text-center text-center block"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="bg-[#FF6132] w-full h-[60px] rounded-[5px] text-white text-center mt-7"
          onClick={handleSubmit}
        >
          Send
        </button>
        <div className="flex items-center justify-center gap-6 mt-8">
          <hr className="w-[140px] border border-[#180F4B]" />
          <p>Or</p>
          <hr className="w-[140px] border border-[#180F4B]" />
        </div>
        <p
          className="text-[#ff6132] text-center mt-10 cursor-pointer"
          onClick={() => navigate("/Login")}
        >
          Go Back
        </p>
      </form>
  
      {/* Sidebar placed after the form */}
      <SideBar />
    </div>
  );
};

export default ForgotPassword;
