import { useState } from "react";
import SideBar from "./SideBar";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState({
    length: false,
    number: false,
    specialChar: false,
  });
  // const [matchingPassword, setMatchingPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMatch, setIsMatch] = useState(false);
  const validatePassword = (input) => {
    const rules = {
      length: input.length >= 8,
      number: /\d/.test(input),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(input),
    };
    setValidation(rules);
  };
  // let result;
  const handleChange = (e) => {
    const input = e.target.value;
    setPassword(input);
    validatePassword(input);
    if (password) setIsMatch(input === confirmPassword);
  };
  const handleConfirmPasswordChange = (e) => {
    const input = e.target.value;
    setConfirmPassword(input);
    if (password) setIsMatch(input === password);
  };

  return (
    <div className="flex mx-auto">
      <SideBar />
      <div className="w-[615px] h-[700px] flex flex-col justify-center items-center">
        <h1 className="font-bold text-3xl mb-8">Reset Password</h1>
        {/* <div></div> */}
        <label className="ml-[-270px] mb-1 max-[630px]:ml-0">
          Input New Password
        </label>
        <input
          type="password"
          className="w-[423.49px] h-[57.59px] rounded-[12px] border-[2px] max-[630px]:w-3/5 "
          value={password}
          onChange={handleChange}
        />
        <div>
          <ul
            className="bg-[#ff6132] bg-opacity-10 p-5 ml-[-160px] max-[630px]:ml-0 mt-2"
            style={{ listStyleType: "none", paddingLeft: "0" }}
          >
            <li style={{ color: validation.length ? "green" : "red" }}>
              {validation.length ? "✔" : "✘"} At least 8 characters
            </li>
            <li style={{ color: validation.number ? "green" : "red" }}>
              {validation.number ? "✔" : "✘"} At least one number
            </li>
            <li style={{ color: validation.specialChar ? "green" : "red" }}>
              {validation.specialChar ? "✔" : "✘"} At least one special
              character
            </li>
          </ul>
        </div>
        <label className="ml-[-290px] mt-8 mb-2 max-[630px]:ml-0">
          Confirm Password
        </label>
        <input
          type="password"
          className="w-[423.49px] h-[57.59px] rounded-[12px] border-[2px] max-[630px]:w-3/5"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          // onChange={confirmPassword}
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
        <button className="bg-[#ff6132] text-white rounded-[5px] w-[423px] h-[60px] mt-8 max-[630px]:w-3/4">
          Done
        </button>
      </div>
    </div>
  );
};
export default ResetPassword;
