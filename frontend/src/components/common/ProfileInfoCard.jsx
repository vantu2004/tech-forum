import { FaCircleUser } from "react-icons/fa6";

const ProfileInfoCard = ({ isLoading, userProfile }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 sticky top-20">
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <span className="loading loading-spinner loading-xl text-blue-300"></span>
        </div>
      ) : (
        <>
          {/* Cover */}
          <div className="h-24 bg-gray-200 relative">
            {userProfile?.cover_pic && (
              <img
                src={userProfile.cover_pic}
                alt="Cover"
                className="w-full h-24 object-cover"
              />
            )}

            {/* Avatar chồng lên cover */}
            <div className="absolute left-1/2 bottom-0 translate-x-[-50%] translate-y-1/2">
              {userProfile?.profile_pic ? (
                <img
                  src={userProfile.profile_pic}
                  alt="User"
                  className="w-20 h-20 rounded-full border-4 border-white object-cover bg-white"
                />
              ) : (
                <FaCircleUser className="w-20 h-20 rounded-full text-gray-400 bg-white border-4 border-white" />
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col items-center mt-12 mb-4">
            <h2 className="font-semibold text-gray-800">{userProfile?.name}</h2>

            <p className="text-sm text-gray-500 text-center">
              {userProfile?.headline}
            </p>

            <p className="text-sm text-gray-500 text-center">
              {userProfile?.curr_location}
            </p>

            <p className="text-sm text-gray-500 text-center">
              {userProfile?.curr_company}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileInfoCard;
