import { useState, useRef } from "react";
import { MdCameraAlt } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import toast from "react-hot-toast";


const EditProfile = ({ user, setIsProfileEdit }) => {
  const [firstName, setfirstName] = useState(user.firstName);
  const [lastName, setlastName] = useState(user.lastName || "");
  const [email, setemail] = useState(user.email);
  const [skills, setSkills] = useState(user.skills || []);
  const [role, setRole] = useState(user.role || "");
  const [experience, setExperience] = useState(user.experienceInYears || 0);
  const [bio, setBio] = useState(user.bio);
  const [avatar, setAvatar] = useState(user.avatar);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender || "male");
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const handleIconClick = () => {
    fileInputRef.current.click();
  };
  const onHandleSaveChanges = (e) => {
    e.preventDefault();
    // Check the new Data is same as prev data or not

    const formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName || "");
    formData.append("skills", skills || []);
    formData.append("bio", bio);
    formData.append("age", age);
    formData.append("role", role);
    formData.append("experienceInYears", experience);
    formData.append("gender", gender);

     editProfile(formData);
   
  };
  const editProfile = async (formData) => {
    const loadingId = toast.loading(
      "Please Wait while we make changes for you"
    );
    try {
      const response = await axios.patch(BASE_URL + "/profile/edit", formData, {
        withCredentials: true,
      });

      dispatch(addUser(response?.data?.updatedData));
      toast.success(response?.data?.message, {
        style: {
          minWidth: "450px",
        },
        duration: 3000,
        id: loadingId,
      });
      setIsProfileEdit(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something Went Wrong", {
        id: loadingId,
      });
    }
  };
  const handleProfilePicChange = (e) => {
    if (e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  };
  if (!user) return null;
  return (
    <div className="w-[90%] sm:w-[85%] md:w-[65%] lg:w-[45%] mx-auto">
      <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4 text-[#BF5CC9]">
        Edit Profile
      </h2>

      <form
        className="w-full bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-md border border-gray-200 space-y-6"
        onSubmit={onHandleSaveChanges}
      >
        {/* Profile Picture */}
        <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 mx-auto rounded-full shadow-md border border-gray-200">
          {/* Avatar logic (same as before) */}
          {avatar ? (
            typeof avatar === "string" ? (
              <img
                src={avatar}
                alt="profile pic"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <img
                src={URL.createObjectURL(avatar)}
                alt="profile pic"
                className="w-full h-full rounded-full object-cover"
              />
            )
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <h1 className="text-3xl font-semibold text-gray-700">
                {firstName[0]} {lastName[0]}
              </h1>
            </div>
          )}

          {/* Camera Icon */}
          <div className="absolute bottom-4 right-3 flex flex-col items-center justify-center p-1 rounded-full bg-white/50 border border-gray-300">
            <MdCameraAlt
              className="text-[#727171] cursor-pointer text-lg sm:text-xl"
              onClick={handleIconClick}
              data-tooltip-id="profile-pic-tooltip"
              data-tooltip-content={"Change Profile Picture"}
            />
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleProfilePicChange}
            />
            <Tooltip id="profile-pic-tooltip" place="top" />
          </div>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-1/2">
            <label
              htmlFor="firstName"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
              placeholder="First Name"
              className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
            />
          </div>

          <div className="w-full sm:w-1/2">
            <label
              htmlFor="lastName"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
              placeholder="Last Name"
              className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            onChange={(e) => setemail(e.target.value)}
            value={email}
            disabled
            placeholder="you@example.com"
            className="w-full cursor-not-allowed border border-gray-300 bg-gray-100 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
          />
        </div>

        {/*Professional Experience In Years */}
        <div>
          <label
            htmlFor="email"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Experience <span className="text-xs">(in years)</span>
          </label>
          <input
            id="experience"
            type="number"
            required
            onChange={(e) => {
              setExperience(e.target.value);
            }}
            value={experience}
            placeholder="2"
            className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
          />
        </div>
        {/* Role */}
        {experience > 0 && (
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <input
              id="role"
              type="text"
              required
              onChange={(e) => setRole(e.target.value)}
              value={role}
              placeholder="Ex: Application Developer"
              className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
            />
          </div>
        )}
        {/* Skills */}
        <div>
          <label
            htmlFor="skills"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Skills
          </label>
          <input
            id="skills"
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="C, Java, Python, SQL, etc."
            className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
          />
        </div>

        {/* Bio */}
        <div>
          <label
            htmlFor="bio"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Bio
          </label>
          <textarea
            id="bio"
            rows="3"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="A short bio about yourself..."
            className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm resize-none focus:outline-none focus:ring-1 focus:ring-purple-400"
          ></textarea>
        </div>

        {/* Age and Gender */}
        <div className="flex flex-row gap-4">
          <div className="w-full sm:w-1/2">
            <label
              htmlFor="age"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Age
            </label>
            <input
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              type="number"
              placeholder="Enter your age"
              className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
            />
          </div>

          <div className="w-full sm:w-1/2">
            <label
              htmlFor="gender"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              id="gender"
              className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <button
            type="submit"
            className="w-full sm:w-1/2 py-2 px-4 rounded-md text-sm font-medium transition duration-200 bg-[#BF5CC9] text-white hover:bg-[#9853a0] hover:border-[#9853a0] border border-[#BF5CC9] cursor-pointer"
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={() => setIsProfileEdit(false)}
            className="w-full sm:w-1/2 py-2 px-4 rounded-md text-sm font-medium transition duration-200 bg-white border border-[#BF5CC9] text-[#BF5CC9] hover:bg-white/50 hover:border-[#9853a0] cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
