import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    try {
      if (feed) return;
      const response = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(response.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;
  if (feed.length <= 0) {
    return (
      <div className="min-h-[80vh] flex flex-col justify-center items-center">
        <h1 className="text-lg text-[#727171]">No New Users Found</h1>
      </div>
    );
  }

  return (
    feed && (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <UserCard userInfo={feed[0]} />
      </div>
    )
  );
};

export default Feed;
