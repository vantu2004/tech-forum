import { useUserExperienceStore } from "../../stores/useUserExperienceStore";

const Experience = () => {
  const { userExperiences, isLoading } = useUserExperienceStore();

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-6">
      {/* Header */}
      <div className="flex justify-between items-center px-5 py-3 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
        <h2 className="text-lg font-semibold text-gray-800">Experience</h2>
      </div>

      {/* Body */}
      <div className="p-5 space-y-4">
        {isLoading ? (
          <p className="text-gray-500 text-sm">Loading experiences...</p>
        ) : userExperiences.length === 0 ? (
          <p className="text-gray-500 text-sm italic">
            No work experiences have been added yet.
          </p>
        ) : (
          userExperiences.map((exp) => (
            <div
              key={exp._id}
              className="flex justify-between items-start border-b border-gray-100 pb-3 last:border-none"
            >
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">
                  {exp.designation}
                </h3>
                <p className="text-gray-600 text-sm">{exp.company_name}</p>
                <p className="text-gray-500 text-xs mt-1">{exp.duration}</p>
                <p className="text-gray-500 text-xs">{exp.location}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Experience;
