import { useState } from "react";
import logo from "../../assets/navbar/logo.png";
import { FiCamera, FiEdit, FiCheck, FiLogOut, FiLoader } from "react-icons/fi";
import { useUserAuthStore } from "../../stores/useUserAuthStore";
import { useNavigate } from "react-router-dom";

const CoverPhoto = ({ onOpenInfomationModal, onLogout }) => {
  // Cover states
  const [cover, setCover] = useState(
    "https://images.unsplash.com/photo-1522199710521-72d69614c702?w=1200"
  );
  const [previewCover, setPreviewCover] = useState(null);
  const [fileCover, setFileCover] = useState(null);

  // Avatar states
  const [avatar, setAvatar] = useState(logo);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [fileAvatar, setFileAvatar] = useState(null);

  const { logout, isLoading } = useUserAuthStore();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // handle cover change
  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileCover(file);
      setPreviewCover(URL.createObjectURL(file));
    }
  };

  // handle avatar change
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileAvatar(file);
      setPreviewAvatar(URL.createObjectURL(file));
    }
  };

  // save cover
  const handleSaveCover = async () => {
    if (!fileCover) return;
    // Upload logic ở đây
    setCover(previewCover);
    setPreviewCover(null);
    setFileCover(null);
  };

  // save avatar
  const handleSaveAvatar = async () => {
    if (!fileAvatar) return;
    // Upload logic ở đây
    setAvatar(previewAvatar);
    setPreviewAvatar(null);
    setFileAvatar(null);
  };

  return (
    <div className="relative">
      {/* Cover Photo */}
      <img
        src={previewCover || cover}
        alt="Cover"
        className="w-full h-60 object-cover rounded-lg shadow"
      />

      {/* Logout button */}
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

      {/* Chọn ảnh bìa / Save */}
      {previewCover ? (
        <button
          onClick={handleSaveCover}
          className="absolute top-3 right-14 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
        >
          <FiCheck className="text-green-600" />
        </button>
      ) : (
        <>
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
        </>
      )}

      {/* Edit info button */}
      <button
        onClick={onOpenInfomationModal}
        className="absolute top-3 right-24 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
      >
        <FiEdit className="text-gray-700" />
      </button>

      {/* Avatar + Info */}
      <div className="absolute -bottom-24 left-8 flex items-end gap-4">
        <div className="relative">
          {/* Avatar */}
          <img
            src={previewAvatar || avatar}
            alt="Avatar"
            className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover"
          />

          {/* Chọn avatar / Save */}
          {previewAvatar ? (
            <button
              onClick={handleSaveAvatar}
              className="absolute bottom-2 right-24 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
            >
              <FiCheck className="text-green-600" />
            </button>
          ) : (
            <>
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
            </>
          )}
        </div>

        {/* Info */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Nguyễn Văn A</h1>
          <p className="text-gray-600">
            Fullstack Developer | MERN Stack | Open Source Contributor
          </p>
          <p className="text-sm text-gray-500">Hà Nội, Việt Nam</p>
        </div>
      </div>
    </div>
  );
};

export default CoverPhoto;
