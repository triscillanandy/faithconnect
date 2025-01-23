import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pray from "./Registration-Images/Pray.png";
import Lock from "./Registration-Images/Lock.png";
import Hide from "./Registration-Images/Hide.png";
import { toast, ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email, // Assuming the username is the email in your API
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        localStorage.setItem("token", token); // Store token in local storage
        localStorage.setItem("user:detail",JSON.stringify(data.user));
        toast.success("Login successful!");
        navigate("/home"); // Redirect to the dashboard
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Invalid email or password.");
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex p-16 gap-20 container mx-auto max-loginScreen1:flex-col-reverse">
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
      <div className="bg-[#180F4B] w-[900px] h-[800px] rounded-[14px] flex flex-col items-center justify-center text-white loginScreen:w-full max-loginScreen1:w-[100%] max-loginScreen1:h-[400px]">
        <img src={Pray} alt="" />
        <h1 className="font-bold text-3xl">Faith Connect</h1>
      </div>
  
      {/* Right Section - Login Form */}
      <div className="flex flex-col justify-center">
        <p className="text-black text-2xl mb-20">Login</p>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
  
        {/* Email Input */}
        <input
          type="email"
          className="w-[425px] h-[60px] rounded-[10px] border-[3px] placeholder:text-xl border-gray-700 text-black placeholder:text-center max-loginScreen:w-[100%] mb-8"
          placeholder="Username or email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
  
        {/* Password Input */}
        <div className="relative w-[425px] max-loginScreen:w-[100%] mb-8">
      <input
        type={showPassword ? "text" : "password"} // Toggle input type
        placeholder="Enter Password"
        className="w-full h-[60px] rounded-[10px] border-[3px] placeholder:text-xl border-gray-700 text-black placeholder:text-center pl-10 pr-10"
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
          <FaEyeSlash className="text-gray-500" size={20} /> // Eye-slash icon when password is visible
        ) : (
          <FaEye className="text-gray-500" size={20} /> // Eye icon when password is hidden
        )}
      </button>
    </div>
        {/* Forgot Password Link */}
        <a
          className="text-right mt-3 mb-4 cursor-pointer"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </a>
  
        {/* Login Button */}
        <button
          className="text-white bg-[#FF6132] rounded-[5px] w-[425px] h-[60px] text-center max-loginScreen1:w-[100%]"
          onClick={handleLogin}
        >
          Login
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