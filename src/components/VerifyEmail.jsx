import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import toast from "react-hot-toast";
import { IoMailOpenOutline } from "react-icons/io5";
import { PropagateLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = searchParams.get("token");

    // Validate token format (must look like JWT: a.b.c)
    const isTokenValid = token && token.split(".").length === 3;

    const verifyUserEmail = async () => {
      try {
        const res = await axios.post(`${BASE_URL}/auth/verify-email`, {
          token,
        });
        toast.success(res.data.message);
        dispatch(addUser(res?.data?.data));
        setTimeout(() => navigate("/profile"), 3000);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Verification failed");
        setTimeout(() => navigate("/auth/login"), 3000);
      }
    };

    if (isTokenValid) {
      verifyUserEmail();
    } else {
      toast.error("Invalid or missing token");
     navigate("/auth/login")
    }
  }, [searchParams, navigate, dispatch]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-xl p-8 flex items-center justify-center flex-col">
        <IoMailOpenOutline className="text-6xl text-[#727171] mb-4" />
        <h1 className="text-xl text-[#727171] mb-2 text-center">
          We are verifying your email
        </h1>
        <p className="text-sm text-[#727171] mb-6">
          This usually takes 5–10 seconds
        </p>
        <div>
          <PropagateLoader color="#BF5CC9" />
        </div>
      </div>
    </main>
  );
};

export default VerifyEmail;
