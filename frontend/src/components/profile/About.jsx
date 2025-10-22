import { FiEdit } from "react-icons/fi";
import { useUserProfileStore } from "../../stores/useUserProfileStore";

const About = ({ onOpenAboutModal }) => {
  const { userProfile, isLoading } = useUserProfileStore();

  return (
    <div className=" mt-32">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-800">About</h2>
          <button
            onClick={onOpenAboutModal}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <FiEdit className="text-gray-600" size={18} />
          </button>
        </div>

        {/* Loading */}
        {isLoading ? (
          <p className="text-gray-500 italic text-sm">Loading profile...</p>
        ) : (
          <p className="text-gray-700">
            {userProfile?.about || "Write something about yourself..."}
          </p>
        )}
      </div>
    </div>
  );
};

export default About;
