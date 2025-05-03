import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import { useState } from "react";
import { LiaEdit } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { Tooltip as ReactTooltip } from "react-tooltip";
const Profile = () => {
  const user = useSelector((store) => store.user);
  const [isProfileEdit, setIsProfileEdit] = useState(false);
  const navigate = useNavigate();
  return (
    user && (
      <div className="py-8 flex flex-col items-center min-h-screen">
        {!isProfileEdit && (
          <div className=" bg-white w-[90%] md:w-[40%] p-6 md:p-8 rounded-xl shadow-md relative">
            <div className="flex flex-col md:flex-row items-center gap-y-8 md:gap-x-8 justify-between mb-8">
              {/*Profile Pic */}
              <img
                src={user.avatar}
                alt="profile pic"
                className="w-36 h-36 rounded-full object-cover object-center aspect-square shadow-md"
              />
              <div className="w-full flex flex-col items-center gap-y-1 md:items-start md:gap-y-0">
                {/* Name and Email */}
                <h2 className="text-xl md:text-2xl font-semibold text-[#BF5CC9] mb-2">
                  {user.firstName} {user.lastName && user.lastName}
                </h2>
                <p className="text-[#727171] mb-2 text-sm md:text-md">
                  {user.email}
                </p>
                <p className="text-[#727171] mb-2 text-sm">
                  Life Version(age):{" "}
                  <span className="text-[#BF5CC9] font-semibold text-md md:text-lg">
                    v{user.age}.0.0
                  </span>
                </p>
                <button
                  className="flex items-center justify-center bg-[#BF5CC9] rounded-[4px] text-white py-1 text-xs px-2 cursor-pointer hover:bg-[#9853a0]"
                  onClick={() => setIsProfileEdit(true)}
                >
                  <span>Edit Profile</span>
                  <LiaEdit className="inline ml-1 text-lg" />
                </button>
              </div>
            </div>
            {/* Role and Professional Experiece In years*/}
            <div className="flex flex-col md:flex-row  gap-x-24">
              {(user.experience > 0) && (
                <div className="mb-4">
                  <h5 className="text-md font-semibold text-[#BF5CC9] mb-2">
                    Role
                  </h5>

                  <p className="text-[#727171] text-sm">{user.role}</p>
                </div>
              )}
              {/* Professional Experience*/}
              <div className="mb-4">
                <h5 className="text-md font-semibold text-[#BF5CC9] mb-2">
                  Experience
                </h5>

                <p className="text-[#727171] text-sm">
                  {user.experienceInYears > 0
                    ? user.experienceInYears + " Years"
                    : "Fresher"}
                </p>
              </div>
            </div>
            {/* Bio*/}
            <div className="mb-4">
              <h5 className="text-md font-semibold text-[#BF5CC9] mb-2">Bio</h5>
              <div className="border-[0.5px] border-gray-300 rounded-md p-2  text-[#727171] text-sm">
                <p>{user.bio}</p>
              </div>
            </div>
            {/* Skills Set*/}
            <div className="mb-4">
              <h5 className="text-md font-semibold text-[#BF5CC9] mb-2">
                Skills
              </h5>
              {user.skills.length > 0 ? (
                <div className="flex gap-3 flex-wrap">
                  {user?.skills
                    ?.toString()
                    ?.split(",")
                    ?.map((eachSkill) => (
                      <span
                        className="bg-[#F8E1F4] text-[#BF5CC9] text-xs rounded-[4px] px-2 py-1.5 "
                        key={eachSkill}
                      >
                        {eachSkill}
                      </span>
                    ))}
                </div>
              ) : (
                <h3 className="text-[#727171]">No skills listed... yet.</h3>
              )}
            </div>
            <button
              data-tooltip-id="close-profile-tooltip"
              data-tooltip-content={"Close Profile"}
              className="hover:bg-[#9853a0] cursor-pointer bg-[#BF5CC9] w-6 h-6 rounded-full flex flex-col items-center justify-center absolute top-[-15px] right-[-15px]"
              onClick={() => {
                navigate("/feed");
              }}
            >
              <RxCross2 className="text-white" />
            </button>
            <ReactTooltip id="close-profile-tooltip" place="bottom" />
          </div>
        )}
        {/* Edit Profile */}
        {isProfileEdit && (
          <EditProfile user={user} setIsProfileEdit={setIsProfileEdit} />
        )}
      </div>
    )
  );
};

export default Profile;
