import axios from "axios";
import { BASE_URL } from "../utils/constants";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const fetchConnections = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(response.data.data));
      setIsLoading(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something Went Wrong");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);
  if (!connections) return;
  if (isLoading) {
    return (
      <div className="px-4 md:px-16 py-6 min-h-screen flex flex-col items-center">
        <div className="flex flex-col gap-6 w-full md:w-[80%] lg:w-[60%]">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center md:items-start gap-4 w-full bg-white p-6 rounded-md shadow-md animate-pulse"
            >
              <div className="w-24 h-24 rounded-full bg-gray-300" />
              <div className="flex flex-col gap-2 text-center md:text-left w-full">
                <div className="w-32 h-4 bg-gray-300 rounded"></div>
                <div className="w-24 h-3 bg-gray-200 rounded"></div>
                <div className="w-full h-3 bg-gray-200 rounded mt-2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (connections.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center px-4">
        <h1 className="text-lg text-[#727171] text-center">
          You have no Connections
        </h1>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-16 py-6 min-h-screen flex flex-col items-center">
      <h1 className="text-lg md:text-xl text-[#727171] my-4 text-center">
        {user.firstName}, you have{" "}
        <span className="text-[#BF5CC9] font-semibold">
          {connections.length}
        </span>{" "}
        {connections.length === 1 ? "Connection" : "Connections"}
      </h1>

      <ul className="flex flex-col gap-6 mt-8 w-full md:w-[80%] lg:w-[60%]">
        {connections.map((eachConnection) => {
          const { avatar, firstName, lastName, _id, gender, age, bio } =
            eachConnection;
          return (
            <li
              key={_id}
              className="flex flex-col md:flex-row items-center md:items-start gap-4 w-full bg-white p-6 rounded-md shadow-md"
            >
              <img
                src={avatar}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover shadow-md"
              />
              <div className="flex flex-col text-center md:text-left">
                <h3 className="text-[#BF5CC9] font-semibold text-lg">
                  {firstName} {lastName}
                </h3>
                <p className="text-[#727171]">
                  {age && <span>{age}</span>},{" "}
                  {gender[0].toUpperCase() + gender.slice(1).toLowerCase()}
                </p>
                <p className="text-[#727171] text-sm italic mt-1">{bio}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Connections;
