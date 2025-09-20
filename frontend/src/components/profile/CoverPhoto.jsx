import { useState, useEffect } from "react";
import { FiCamera, FiEdit, FiLogOut, FiLoader } from "react-icons/fi";
import { useUserAuthStore } from "../../stores/useUserAuthStore";
import { useUserProfileStore } from "../../stores/useUserProfileStore";
import { useNavigate } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";

const CoverPhoto = ({ onOpenInfomationModal }) => {
  const [cover, setCover] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const { logout, isLoading } = useUserAuthStore();
  const { userProfile, updateProfile } = useUserProfileStore();
  const navigate = useNavigate();

  // Đồng bộ khi userProfile thay đổi
  useEffect(() => {
    if (userProfile?.cover_pic) setCover(userProfile.cover_pic);
    if (userProfile?.profile_pic) setAvatar(userProfile.profile_pic);
  }, [userProfile]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result;
        setCover(base64); // preview ngay

        try {
          await updateProfile({ cover_pic: base64 });
        } catch (err) {
          console.error("Update failed:", err.message);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result;
        setAvatar(base64); // preview ngay

        try {
          await updateProfile({ profile_pic: base64 });
        } catch (err) {
          console.error("Update failed:", err.message);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative">
      {/* Cover Photo */}
      {cover ? (
        <img
          src={cover}
          alt="Cover"
          className="w-full h-60 object-cover rounded-lg shadow"
        />
      ) : (
        <div className="w-full h-60 bg-gray-200 rounded-lg shadow"></div>
      )}

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
        disabled={isLoading}
      >
        {isLoading ? (
          <FiLoader className="animate-spin text-red-700" />
        ) : (
          <FiLogOut className="text-red-700" />
        )}
      </button>

      {/* Chọn cover */}
      <input
        id="coverInput"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleCoverChange}
      />
      <label
        htmlFor="coverInput"
        className="absolute top-3 right-14 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition cursor-pointer"
      >
        <FiCamera className="text-gray-700" />
      </label>

      {/* Edit info */}
      <button
        onClick={onOpenInfomationModal}
        className="absolute top-3 right-24 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
      >
        <FiEdit className="text-gray-700" />
      </button>

      {/* Avatar + Info */}
      <div className="absolute -bottom-26 left-8 flex items-end gap-4">
        <div className="relative">
          {avatar ? (
            <img
              src={avatar}
              alt="Avatar"
              className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover"
            />
          ) : (
            <FaCircleUser className="w-40 h-40 rounded-full text-gray-400 bg-white border-4 border-white" />
          )}

          {/* Chọn avatar */}
          <input
            id="avatarInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
          <label
            htmlFor="avatarInput"
            className="absolute bottom-2 right-24 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition cursor-pointer"
          >
            <FiCamera className="text-gray-700" />
          </label>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {userProfile?.name}
          </h1>
          <p className="text-gray-600">
            {userProfile?.headline || <i>Update your headline</i>}
          </p>
          <p className="text-sm text-gray-500">
            {userProfile?.curr_location || <i>Update your location</i>}
          </p>
          <p className="text-sm text-gray-500">
            {userProfile?.curr_company || <i>Update your company</i>}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoverPhoto;
