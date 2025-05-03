import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-y-6 md:px-0 px-6">
      <h1 className="text-3xl font-semibold text-[#BF5CC9]">
        404 Page Not Found
      </h1>
      <p className="text-[#727171]">
        The page you are looking for does not exist
      </p>
      <button
        className="bg-[#BF5CC9] rounded-[4px] text-white py-1.5  text-sm px-4 cursor-pointer hover:bg-[#9853a0] flex items-center gap-x-1"
        onClick={() => navigate("/")}
      >
        <IoIosArrowRoundBack className="text-2xl" />
        Back to Home
      </button>
    </div>
  );
};

export default PageNotFound;
