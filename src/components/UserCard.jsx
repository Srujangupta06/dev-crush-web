import { SlDislike } from "react-icons/sl";
import { FaRegHeart } from "react-icons/fa";
import { useState } from "react";
import { Tooltip } from "react-tooltip";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { IoCloseSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";

const UserCard = ({ userInfo }) => {
  const { avatar, firstName, lastName, bio, _id } = userInfo;
  const dispatch = useDispatch();
  const handleSendRequest = async (status, userId) => {
    try {
      const response = await axios.post(
        BASE_URL + `/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userInfo._id));
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something Went Wrong");
    }
  };
  return (
    <div className="card bg-base-100 w-[80%] md:w-80 shadow-xl  rounded-2xl overflow-hidden h-[70vh] relative ">
      <figure className="">
        <img
          src={avatar}
          alt="profile pic"
          className="h-full w-full object-cover"
        />
        <div className="absolute bg-black/30 backdrop-blur-sm w-full bottom-0 px-4 py-2 text-white">
          <h2 className="text-xl font-semibold tracking-wide text-white">
            {firstName + " " + lastName}
          </h2>
          <p className="italic text-sm mt-1 text-gray-200">{bio}</p>
          <div className="flex justify-between items-end">
            {/* Buttons for Controlling the Feed */}
            <div className="flex gap-4 mt-3">
              {/* Decline Button */}
              <button
                onClick={() => {
                  handleSendRequest("ignored", userInfo._id);
                }}
                className="border cursor-pointer border-red-500 text-red-400 hover:bg-red-600 hover:text-white transition duration-200 rounded-full p-2"
              >
                <IoCloseSharp className="text-2xl" />
              </button>

              {/* Accept Button with Gradient */}
              <button
                className="bg-gradient-to-r cursor-pointer from-pink-400 via-fuchsia-500 to-purple-500 text-white hover:scale-105 transition-transform duration-300 rounded-full p-2 shadow-md"
                onClick={() => {
                  handleSendRequest("interested", userInfo._id);
                }}
              >
                <FaHeart className="text-2xl" />
              </button>
            </div>
            <Link to={`/${_id}/profile/view`} className="text-sm">
              View Profile
              <GoArrowUpRight className="inline-block ml-2" />
            </Link>
          </div>
        </div>
      </figure>
    </div>
  );
};

export default UserCard;

{
  /*<div className="card bg-base-100 w-[80%] md:w-80 shadow-lg">
      <figure className="px-10 pt-10">
        <img
          src={avatar}
          alt="profile pic"
          className="w-40 h-40 rounded-full object-cover shadow"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-[#BF5CC9] text-xl font-semibold tracking-wide">
          {firstName + " " + lastName}
        </h2>
        <p className="text-[#727171] italic text-sm mt-1">"{bio}"</p>
        <div className="divider my-2" />
        <div className="card-actions gap-6 mt-2">
          <button
            className="cursor-pointer"
            data-tooltip-id="feed-ignore-tooltip"
            data-tooltip-content={"Ignore"}
            onClick={() => {
              handleSendRequest("ignored", userInfo._id);
            }}
          >
            <SlDislike className="text-xl text-gray-500 " />
          </button>
          <Tooltip id="feed-ignore-tooltip" place="bottom" />
          <button
            className="cursor-pointer"
            data-tooltip-id="feed-interested-tooltip"
            data-tooltip-content={"Interested"}
            onClick={() => setIsInterested(!isInterested)}
          >
            <FaRegHeart
              className="text-xl text-[#727171]"
              onClick={() => {
                handleSendRequest("interested", userInfo._id);
              }}
            />
          </button>
          <Tooltip id="feed-interested-tooltip" place="bottom" />
        </div>
      </div>
    </div>*/
}
