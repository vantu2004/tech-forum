import { useUserProfileStore } from "../../stores/useUserProfileStore";
import { FaCircleUser } from "react-icons/fa6";

const CoverPhoto = () => {
  const { userProfileById } = useUserProfileStore();
  const cover = userProfileById?.cover_pic;
  const avatar = userProfileById?.profile_pic;

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
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {userProfileById?.name}
          </h1>
          <p className="text-gray-600">{userProfileById?.headline}</p>
          <p className="text-sm text-gray-500">
            {userProfileById?.curr_location}
          </p>
          <p className="text-sm text-gray-500">
            {userProfileById?.curr_company}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoverPhoto;
