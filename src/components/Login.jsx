import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { Tooltip as ReactTooltip } from "react-tooltip";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onHandleLogin = (e) => {
    e.preventDefault();
    const userCredentials = {
      email,
      password,
    };
    checkLoggedInUser(userCredentials);
  };

  const checkLoggedInUser = async (userCredentials) => {
    try {
      const response = await axios.post(
        BASE_URL + "/auth/login",
        userCredentials,
        { withCredentials: true }
      );

      dispatch(addUser(response.data.data));
      toast.success("Login Successfull", {
        duration: 2000,
      });
      navigate("/feed");
    } catch (err) {
      setErrorMessage(err?.response?.data?.message || "Something Went Wrong");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-[90%] md:w-1/3 py-8 rounded-md bg-white/50 shadow-xl relative">
        <button
          data-tooltip-id="close-login-tooltip"
          data-tooltip-content={"Close"}
          className="hover:bg-[#9853a0] cursor-pointer bg-[#BF5CC9] w-6 h-6 rounded-full flex flex-col items-center justify-center absolute top-[-15px] right-[-15px]"
          onClick={() => {
            navigate("/");
          }}
        >
          <RxCross2 className="text-white" />
        </button>
        <ReactTooltip id="close-login-tooltip" place="top" />
        <h1 className="text-xl font-semibold text-center mb-4">Login</h1>
        <form className="px-4 md:px-8" onSubmit={onHandleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              required
              type="email"
              className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm outline-none"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorMessage("");
              }}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <div className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm outline-none flex items-center">
              <input
                id="password"
                required
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
          {errorMessage && (
            <p className="text-red-700 text-sm mb-2">*{errorMessage}</p>
          )}
          <div className="flex justify-between items-center">
            <button className="bg-[#BF5CC9] rounded-[4px] text-white py-1.5  text-sm px-4 cursor-pointer hover:bg-[#9853a0]">
              Login
            </button>
            <Link to="/auth/signup" className="underline text-[#BF5CC9]">
              <p className="text-sm  text-[#BF5CC9]">Create New Account</p>
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
