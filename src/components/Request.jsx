import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, declineRequest } from "../utils/requestSlice";
import toast from "react-hot-toast";
import { useEffect } from "react";

const ConnectionRequests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const user = useSelector((store) => store.user);

  const reviewRequest = async (status, fromUserId) => {
    try {
      await axios.post(
        BASE_URL + `/request/review/${status}/${fromUserId}`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something Went Wrong");
    }
  };

  const fetchRequests = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(response?.data?.connectionRequests));
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something Went Wrong");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-lg text-[#727171]">You have no requests</h1>
      </div>
    );
  }

  return (
    requests &&
    user && (
      <div className="px-4 min-h-screen">
        {" "}
        {/* added padding for small screens */}
        <h1 className="text-lg text-[#727171] my-8 text-center">
          <span className="text-[#BF5CC9] font-semibold">{user.firstName}</span>
          , you have requests from following people
        </h1>
        <ul className="flex flex-col items-center gap-4 mt-8">
          {requests.map((eachRequest) => {
            const fromUserId = eachRequest.fromUserId;
            const requestId = eachRequest._id;
            const { firstName, lastName, avatar } = fromUserId;

            return (
              <li
                className="flex flex-col sm:flex-row items-center justify-between w-full sm:w-[80%] md:w-[60%] p-4 rounded-md bg-white shadow-lg"
                key={requestId}
              >
                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                  <img
                    src={avatar}
                    alt="profile pic"
                    className="w-14 h-14 rounded-full object-cover shadow-md"
                  />
                  <div className="flex flex-col">
                    <h3 className="text-[#BF5CC9] font-semibold text-lg">
                      {firstName} {lastName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      wants to connect with you
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    className="bg-[#BF5CC9] text-xs cursor-pointer hover:bg-[#9853a0] text-white px-4 py-2 rounded-full"
                    onClick={() => {
                      reviewRequest("accepted", requestId);
                      toast.success("Request Accepted");
                      const filteredRequests = requests.filter(
                        (each) => each._id !== requestId
                      );
                      dispatch(addRequest(filteredRequests));
                    }}
                  >
                    Accept
                  </button>
                  <button
                    className="cursor-pointer text-xs bg-white border border-[#BF5CC9] text-[#BF5CC9] hover:bg-white/50 hover:border-[#9853a0] px-4 py-2 rounded-full"
                    onClick={() => {
                      reviewRequest("rejected", requestId);
                      toast.success("Request Declined");
                      dispatch(declineRequest(requestId));
                    }}
                  >
                    Decline
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    )
  );
};

export default ConnectionRequests;
