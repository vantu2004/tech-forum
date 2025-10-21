import { FiEdit } from "react-icons/fi";
import { useUserSkillStore } from "../../stores/useUserSkillStore";

const Skill = ({ onOpenSkillModal }) => {
  const { userSkills, isLoading } = useUserSkillStore();

  return (
    <div className="mt-6 space-y-4">
      <div className="bg-white rounded-lg shadow-sm p-4 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-800">Skills</h2>
        </div>

        {/* Skills list */}
        {isLoading ? (
          <p className="text-gray-500 text-sm">Loading...</p>
        ) : userSkills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {userSkills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm italic">
            No skills added yet. Click edit to add your skills.
          </p>
        )}
      </div>
    </div>
  );
};

export default Skill;
