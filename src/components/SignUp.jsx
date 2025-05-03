import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { RxCross2 } from "react-icons/rx";
import { Tooltip as ReactTooltip } from "react-tooltip";
import EmailAlert from "./EmailAlert";
import { ClipLoader } from "react-spinners";
const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState(18);
  const [showPassword, setShowPassword] = useState(false);
  const [showEmailAlert, setShowEmailAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const onHandleSignUp = (e) => {
    e.preventDefault();
    const userData = {
      firstName,
      lastName,
      email,
      password,
      gender,
      age,
    };
    registerUser(userData);
  };

  const registerUser = async (userData) => {
    try {
      setIsLoading(true);
      const response = await axios.post(BASE_URL + "/auth/signup", userData);
      setIsLoading(false);
      setShowEmailAlert(true);
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(err?.response?.data?.message);
    }
  };

  return (
    <main className="min-h-[100vh] flex flex-col items-center justify-center relative">
      <div className="w-[90%] md:w-1/3 py-8 rounded-md bg-white/50 shadow-xl relative">
        <button
          data-tooltip-id="close-signup-tooltip"
          data-tooltip-content={"Close"}
          className="hover:bg-[#9853a0] cursor-pointer bg-[#BF5CC9] w-6 h-6 rounded-full flex flex-col items-center justify-center absolute top-[-15px] right-[-15px]"
          onClick={() => {
            navigate("/");
          }}
        >
          <RxCross2 className="text-white" />
        </button>
        <ReactTooltip id="close-signup-tooltip" place="top" />
        <h1 className="text-xl font-semibold text-center mb-4">Sign Up</h1>
        <form className="px-4 md:px-8" onSubmit={onHandleSignUp}>
          {/*First Name */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              required
              className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm outline-none"
              placeholder="Enter your FirstName"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                setErrorMessage("");
              }}
            />
          </div>
          {/*Last Name */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm outline-none"
              placeholder="Enter your lastName"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                setErrorMessage("");
              }}
            />
          </div>
          {/*Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm outline-none"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorMessage("");
              }}
            />
          </div>
          {/*Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm outline-none flex items-center">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="flex-grow px-1 rounded-[3px] outline-none"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMessage("");
                }}
              />
              {!showPassword ? (
                <IoEyeOutline
                  className="mr-2 cursor-pointer text-lg"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <IoEyeOffOutline
                  className="mr-2 cursor-pointer text-lg"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
          </div>
          {/*Age and Gender*/}
          <div className="flex gap-4 mb-8">
            <div className="w-1/2">
              <label
                htmlFor="age"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Age
              </label>
              <input
                id="age"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                }}
                type="number"
                placeholder="Enter your age"
                className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm outline-none"
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="gender"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
                id="gender"
                className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm outline-none"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          {errorMessage && (
            <p className="text-red-700 text-sm mb-2">*{errorMessage}</p>
          )}
          <div className="flex justify-between items-center">
            <Link to="/auth/login" className="underline text-[#BF5CC9]">
              <p className="text-sm  text-[#BF5CC9]">Already Have an Account</p>
            </Link>
            <button
              disabled={isLoading}
              className={`min-w-[100px] whitespace-nowrap rounded-[4px] text-white py-1.5 text-sm px-4 flex items-center justify-center
    ${
      isLoading
        ? "bg-[#BF5CC9] cursor-not-allowed"
        : "bg-[#BF5CC9] hover:bg-[#9853a0] cursor-pointer"
    }
  `}
            >
              {isLoading ? <ClipLoader color="#fff" size={20} /> : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
      {showEmailAlert && <EmailAlert />}
    </main>
  );
};

export default SignUp;
