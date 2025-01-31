import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pray from "../Plans-Images/Pray.png";
import Vector from "./Registration-Images/Vector.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import closeIcon from "./Registration-Images/icon.png";
import Rect1 from "../Plans-Images/Rectangle-6.png";
import Rect2 from "../Plans-Images/Rectangle-7.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { ClipLoader } from "react-spinners";
import googleImg from "./Registration-Images/google.png";

function Registration({ text }) {
  const [phone, setPhone] = useState("+234");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmailAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleRegistration = async () => {
    setIsLoading(true); // Set loading to true when registration starts
    const userType = localStorage.getItem("userType");

    // Basic validation
    if (!firstName || !lastName || !email || !phone || !username || !password) {
      toast.error("All fields are required!");
      setIsLoading(false); // Reset loading state
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Invalid email format!");
      setIsLoading(false); // Reset loading state
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      setIsLoading(false); // Reset loading state
      return;
    }

    try {
      // Example API endpoint
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
          email,
          username,
          userType,
          password,
        }),
      });

      if (response.ok) {
        toast.success("Registration successful. Please check your email to verify.");
        setTimeout(() => {
          navigate("/email-verification"); // Redirect after showing the message
        }, 1500); // Delay redirection for 1.5 seconds
      } else {
        const data = await response.json();
        toast.error(data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex mx-auto flex-col md:flex-row max-w-[1200px] px-4">
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

      {/* Left Section - Hidden on Mobile */}
      <div className="h-[823px] w-full md:w-[600px] flex flex-col justify-center items-center relative hidden md:flex">
        <img src={Pray} alt="Pray" />
        <h1 className="text-[#FF6132] text-[36px]">Faith Connect</h1>
        <p className="font-bold text-3xl mt-60">Build a Bond with God</p>
        <div className="flex absolute bottom-2 left-1">
          <img src={Rect1} className="w-[100px] h-[120px]" alt="Rect1" />
          <img src={Rect2} className="w-[100px] h-[60px] mt-14" alt="Rect2" />
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="bg-[#FF6132] w-full md:w-[650px] max-planSmallScreen:bg-white max-planSmallScreen:h-auto">
        {/* Close Icon - Hidden on Mobile */}
        <div className="flex justify-between mt-4 px-3 hidden md:flex">
          <img src={Vector} alt="Vector" />
          <img src={closeIcon} alt="Close" />
        </div>

        {/* Form Container */}
        <div className="w-full md:w-[365.72px] h-auto mx-auto text-white mt-4 max-planSmallScreen:text-black px-4">
          <div className="text-center">
            <p className="font-bold text-2xl mb-3 capitalize">{text}</p>
            <p>Fill in the information to continue.</p>
          </div>

          {/* First Name and Last Name */}
          <div className="flex mt-4 gap-4 md:gap-36 flex-col md:flex-row">
            <label className="text-center">First Name</label>
            <label className="text-center md:ml-24">Last Name</label>
          </div>
          <div className="flex justify-between gap-4 md:gap-8 mt-1 flex-col md:flex-row">
            <input
              type="text"
              placeholder="First Name"
              className="w-full md:w-[165.39px] border-[#FF6132] h-[48.59px] rounded-[11.85px] border-[0.85px] pt-[15.79px] pr-[15px] pb-[15.79px] pl-[15px] text-black"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full md:w-[162.83px] h-[48.59px] rounded-[11.85px] border-[0.85px] pt-[15.79px] pr-[12px] pb-[15.79px] pl-[12px] text-black border-[#FF6132]"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          {/* Phone Number */}
          <div className="mt-6">
            <label className="mb-4">Phone Number</label>
            <PhoneInput
              country={"ng"}
              value={phone}
              onChange={(value) => setPhone(value)}
              inputStyle={{
                width: "300.11px",
                height: "48.17px",
                borderRadius: "11.85px",
                border: "0.85px",
                paddingTop: "15.79px",
                paddingRight: "11px",
                paddingBottom: "15.79px",
                paddingLeft: "11px",
                color: "black",
                marginLeft: "50px",
                borderColor: "#FF6132",
              }}
            />
          </div>

          {/* Username */}
          <div className="mt-6">
            <label className="mb-4">Username</label>
            <input
              type="text"
              className="w-full md:w-[357.74px] h-[48.17px] rounded-[11.85px] border-[0.85px] pt-[15.79px] pr-[15px] pb-[15.79px] pl-[15px] text-black border-[#FF6132]"
              placeholder="Business or Host Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="mt-6">
            <label className="mb-4">Email</label>
            <input
              type="email"
              className="w-full md:w-[357.74px] h-[48.17px] rounded-[11.85px] border-[0.85px] pt-[15.79px] pr-[15px] pb-[15.79px] pl-[15px] text-black border-[#FF6132]"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mt-6">
            <label className="mb-4">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full md:w-[357.74px] h-[48.17px] rounded-[11.85px] border-[0.85px] pt-[15.79px] pr-[50px] pb-[15.79px] pl-[15px] text-black border-[#FF6132]"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-500" size={20} />
                ) : (
                  <FaEye className="text-gray-500" size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-600 mt-2">{error}</p>}

          {/* Terms and Conditions */}
          <p className="text-sm mt-2">
            By creating an account, you agree to our{" "}
            <a className="text-black max-planSmallScreen:text-mainTheme cursor-pointer">
              Terms and Conditions
            </a>
          </p>

          {/* Create Account Button */}
          <button
            className="text-center w-full md:w-[357.74px] h-[50.54px] rounded-[11.85px] pt-[15.79px] pr-[47.38px] pb-[15.79px] pl-[47.38px] text-black bg-white mt-6 border-[#FF6132] border-[0.79px]"
            onClick={handleRegistration}
            disabled={isLoading} // Disable button when loading
          >
           {isLoading ? <ClipLoader size={20} color="#FF6132" /> : "Create Account"}
          </button>

          {/* OR Divider */}
          <div className="flex items-center gap-2 mt-8">
            <hr className="flex-grow border-t border-[black]" />
            <p className="text-black font-bold">OR</p>
            <hr className="flex-grow border-t border-[black]" />
          </div>

          {/* Sign Up with Google */}
          <button className="text-black bg-white w-full md:w-[354.65px] rounded-[13.43px] border-[0.79px] pt-[13.26px] pr-[66.29px] pb-[13.26px] pl-[66.29px] flex justify-center gap-2 mt-6 border-[#FF6132]">
            <img src={googleImg} alt="Google" />
            Sign up with Google
          </button>

          {/* Sign In Link */}
          <p className="text-center mt-2">
            Already have an account?{" "}
            <a
              onClick={() => navigate("/Login")}
              className="text-black cursor-pointer max-planSmallScreen:text-[#ff6132]"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Registration;