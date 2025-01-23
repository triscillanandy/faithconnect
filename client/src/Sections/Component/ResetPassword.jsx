import { useState } from "react";
import { useParams } from "react-router-dom";
import SideBar from "./SideBar";

const ResetPassword = () => {
  const { token } = useParams(); // Extract the reset token from the URL

  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState({
    length: false,
    number: false,
    specialChar: false,
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMatch, setIsMatch] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validatePassword = (input) => {
    const rules = {
      length: input.length >= 8,
      number: /\d/.test(input),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(input),
    };
    setValidation(rules);
  };

  const handleChange = (e) => {
    const input = e.target.value;
    setPassword(input);
    validatePassword(input);
    setIsMatch(input === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const input = e.target.value;
    setConfirmPassword(input);
    setIsMatch(input === password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isMatch) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resetToken: token,
          newPassword: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "An error occurred.");
      }

      setSuccess(data.message);
      setError("");
    } catch (error) {
      setError(error.message || "An error occurred.");
      setSuccess("");
    }
  };
  return (
    <div className="flex flex-col md:flex-row container mx-auto p-5 items-center gap-5 md:gap-20">
      {/* Form Container - placed first on mobile */}
      <div className="w-full md:w-[615px] h-auto md:h-[700px] flex flex-col justify-center items-center p-4 md:p-5">
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        {success && <div className="text-green-500 mb-4 text-center">{success}</div>}
  
        <h1 className="font-bold text-2xl md:text-3xl mb-6 md:mb-8 text-center">
          Reset Password
        </h1>
  
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          {/* New Password Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Input New Password
            </label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={password}
              onChange={handleChange}
            />
            <div className="mt-2">
              <ul className="list-none pl-0 space-y-1">
                <li style={{ color: validation.length ? "green" : "red" }}>
                  {validation.length ? "✔" : "✘"} At least 8 characters
                </li>
                <li style={{ color: validation.number ? "green" : "red" }}>
                  {validation.number ? "✔" : "✘"} At least one number
                </li>
                <li style={{ color: validation.specialChar ? "green" : "red" }}>
                  {validation.specialChar ? "✔" : "✘"} At least one special character
                </li>
              </ul>
            </div>
          </div>
  
          {/* Confirm Password Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <div
              style={{
                color: isMatch ? "green" : "red",
                marginTop: "10px",
              }}
            >
              {!password
                ? ""
                : isMatch
                ? "✔ Passwords match!"
                : "✘ Passwords do not match. Please try again."}
            </div>
          </div>
  
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#ff6132] text-white rounded py-2 mt-4 hover:bg-[#e5532b] transition-colors"
          >
            Done
          </button>
        </form>
      </div>
  
      {/* Sidebar - placed below the form on mobile */}
      <SideBar />
    </div>
  );
  

};

export default ResetPassword;