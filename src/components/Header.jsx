import { Link, useNavigate } from "react-router-dom";
import { logoUrl } from "../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { addUser } from "../utils/userSlice";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(response.data));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchUserProfile();
  },[]);

  const onHandleLogOut = async () => {
    try {
      await axios.post(
        BASE_URL + "/auth/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      toast.success("Logout Successfull", {
        duration: 2000,
      });
      navigate("/auth/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm md:px-16 px-6">
      <Link to="/" className="flex-1">
        <img src={logoUrl} alt="logo" className="w-28 md:w-44" />
      </Link>
      {user && (
        <div className="flex gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="avatar" src={user.avatar} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link className="justify-between" to="/profile">
                  Profile
                </Link>
              </li>
              <li>
                <Link className="justify-between" to="/requests">
                  Requests
                </Link>
              </li>
              <li>
                <Link className="justify-between" to="/connections">
                  Connections
                </Link>
              </li>
              <li>
                <Link className="justify-between" to="/forgot-password">
                  Password-Reset
                </Link>
              </li>

              <li>
                <button onClick={onHandleLogOut}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
