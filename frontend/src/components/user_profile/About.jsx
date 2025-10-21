import { FiEdit } from "react-icons/fi";
import { useUserProfileStore } from "../../stores/useUserProfileStore";

const About = () => {
  const { userProfileById, isLoading } = useUserProfileStore();

  return (
    <div className="mt-6 space-y-4">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-800">About</h2>
        </div>

        {/* Loading */}
        {isLoading ? (
          <p className="text-gray-500 italic text-sm">Loading profile...</p>
        ) : (
          <p className="text-gray-700">
            {userProfileById?.about || "Write something about yourself..."}
          </p>
        )}
      </div>
    </div>
  );
};

export default About;
