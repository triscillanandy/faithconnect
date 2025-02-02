import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pray from "./Registration-Images/Pray.png";
import Lock from "./Registration-Images/Lock.png";
import { toast, ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import Rect1 from "../Plans-Images/Rectangle-6.png";
import Rect2 from "../Plans-Images/Rectangle-7.png";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        localStorage.setItem("token", token); // Store token in local storage
        localStorage.setItem("user:detail", JSON.stringify(data.user));
      
        toast.success("Login successful!"); 
        setTimeout(() => {
          navigate("/home"); // Redirect after showing the message
        }, 1100);
       
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Invalid email or password.");
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };


  return (
    <div className="flex p-16 gap-20 container mx-auto max-loginScreen1:flex-col-reverse max-loginScreen1:p-4">
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

      {/* Left Section */}
      <div className="h-[700px] w-full md:w-[600px] flex flex-col justify-center items-center relative hidden md:flex">
        <img src={Pray} alt="Pray" className="w-[200px] h-[200px]" />
        <p className="font-bold text-2xl sm:text-3xl md:text-4xl mt-10">
          Faith<span className="text-[#FF6132]">Connect</span>
        </p>
        <div className="flex absolute bottom-2 left-1">
          <img src={Rect1} className="w-[100px] h-[120px]" alt="Rect1" />
          <img src={Rect2} className="w-[100px] h-[60px] mt-14" alt="Rect2" />
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="flex flex-col justify-center items-center w-full max-w-[425px] mx-auto">
        <p className="text-black text-2xl mb-8">Login</p>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        {/* Email Input */}
        <input
          type="email"
          className="w-full h-[60px] rounded-[10px] border-[3px] placeholder:text-xl border-gray-700 text-black placeholder:text-center mb-6 px-4"
          placeholder="Username or email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Input */}
        <div className="relative w-full mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            className="w-full h-[60px] rounded-[10px] border-[3px] placeholder:text-xl border-gray-700 text-black placeholder:text-center px-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Lock Icon */}
          <img
            src={Lock}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-[18px] h-[20px] cursor-pointer"
            alt="Lock"
          />
          {/* Hide/Show Icon */}
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaEyeSlash className="text-gray-500" size={20} />
            ) : (
              <FaEye className="text-gray-500" size={20} />
            )}
          </button>
        </div>

        {/* Forgot Password Link */}
        <a
          className="text-right w-full mb-6 cursor-pointer text-blue-500"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </a>

        {/* Login Button */}
        <button
          className="text-white bg-[#FF6132] rounded-[5px] w-full h-[60px] text-center flex items-center justify-center"
          onClick={handleLogin}
          disabled={loading} // Disable button while loading
        >
           {loading ? (
            <ClipLoader color="#ffffff" size={20} /> // Show spinner when loading
          ) : (
            "Login"
          )}
        </button>

        {/* Create Account Link */}
        <p className="text-black text-center mt-6">
          Don’t have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/individual-registration")}
          >
            Create Account
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;