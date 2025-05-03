import { useEffect, useState } from "react";
import { LiaEdit } from "react-icons/lia";
import { useNavigate, useParams } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { Tooltip as ReactTooltip } from "react-tooltip";
import toast from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import Marquee from "react-fast-marquee";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const FeedProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getFeedProfile = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(BASE_URL + `/profile/${userId}/view`, {
        withCredentials: true,
      });
      setUserData(response.data.data);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFeedProfile();
  }, []);

  if (isLoading || !userData) {
    return (
        <div className="py-8 flex flex-col items-center min-h-[80vh]">
        <div className="bg-white w-[90%] md:w-[40%] p-6 md:p-8 rounded-xl shadow-xl">
          <div className="flex flex-col md:flex-row items-center gap-y-8 md:gap-x-8 justify-between mb-8">
            <Skeleton circle height={144} width={144} />
  
            <div className="w-full flex flex-col items-center gap-y-2 md:items-start">
              <Skeleton width={180} height={24} />
              <Skeleton width={220} height={18} />
              <Skeleton width={120} height={18} />
            </div>
          </div>
  
          <div className="flex flex-col md:flex-row gap-y-4 md:gap-x-24 mb-4">
            <div>
              <Skeleton width={60} height={16} />
              <Skeleton width={100} height={16} />
            </div>
            <div>
              <Skeleton width={80} height={16} />
              <Skeleton width={100} height={16} />
            </div>
          </div>
  
          <div className="mb-4">
            <Skeleton width={60} height={16} className="mb-2" />
            <Skeleton count={3} height={12} />
          </div>
  
          <div className="mb-6">
            <Skeleton width={60} height={16} className="mb-2" />
            <div className="flex gap-2 flex-wrap">
              {Array(6)
                .fill()
                .map((_, i) => (
                  <Skeleton
                    key={i}
                    width={70}
                    height={24}
                    borderRadius={12}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 flex flex-col items-center min-h-screen">
      <div className="bg-white w-[90%] md:w-[40%] p-6 md:p-8 rounded-xl shadow-xl relative transition-all duration-300">
        <div className="flex flex-col md:flex-row items-center gap-y-8 md:gap-x-8 justify-between mb-8">
          {/* Profile Picture */}
          <img
            src={userData.avatar}
            alt="Profile"
            className="w-36 h-36 rounded-full object-cover shadow-md"
          />
          <div className="w-full flex flex-col items-center gap-y-2 md:items-start">
            <h2 className="text-xl md:text-2xl font-semibold text-[#BF5CC9]">
              {userData.firstName} {userData.lastName || ""}
            </h2>
            <p className="text-gray-500 text-sm md:text-base">
              {userData.email}
            </p>
            <p className="text-gray-500 text-sm md:text-base">
              Life Version (age):{" "}
              <span className="text-[#BF5CC9] font-semibold">
                v{userData.age}.0.0
              </span>
            </p>
          </div>
        </div>

        {/* Role & Experience */}
        <div className="flex flex-col md:flex-row gap-y-4 md:gap-x-24 mb-4">
          {userData.experience > 0 && (
            <div>
              <h5 className="text-md font-semibold text-[#BF5CC9] mb-1">
                Role
              </h5>
              <p className="text-gray-600 text-sm">{userData.role}</p>
            </div>
          )}
          <div>
            <h5 className="text-md font-semibold text-[#BF5CC9] mb-1">
              Experience
            </h5>
            <p className="text-gray-600 text-sm">
              {userData.experienceInYears > 0
                ? `${userData.experienceInYears} Years`
                : "Fresher"}
            </p>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-4">
          <h5 className="text-md font-semibold text-[#BF5CC9] mb-2">Bio</h5>
          <div className="border border-gray-200 rounded-md p-3 text-sm text-gray-600 bg-gray-50">
            <p>{userData.bio || "No bio provided yet."}</p>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h5 className="text-md font-semibold text-[#BF5CC9] mb-2">Skills</h5>
          {userData.skills?.length > 0 ? (
            // Marquee text scrolling effect
          <Marquee pauseOnHover={true} speed={50} className="whitespace-nowrap">
          <div className="flex gap-2 whitespace-nowrap">
            {userData.skills
              .toString()
              .split(",")
              .map((skill) => (
                <span
                  key={skill}
                  className="bg-[#F8E1F4] text-[#BF5CC9] text-xs rounded-md px-3 py-1 whitespace-nowrap"
                >
                  {skill.trim()}
                </span>
              ))}
          </div>
        </Marquee>
        
          ) : (
            <p className="text-gray-500 text-sm">No skills listed... yet.</p>
          )}
        </div>

        {/* Close Profile Button */}
        <button
          data-tooltip-id="close-profile-tooltip"
          data-tooltip-content={"Close Profile"}
          onClick={() => navigate("/feed")}
          className="cursor-pointer hover:bg-[#a04da8] bg-[#BF5CC9] w-7 h-7 rounded-full flex items-center justify-center absolute top-[-14px] right-[-14px] shadow-md transition-colors"
        >
          <RxCross2 className="text-white text-sm" />
        </button>
        <ReactTooltip id="close-profile-tooltip" place="bottom" />
      </div>
    </div>
  );
};

export default FeedProfile;
