import { FiEdit2, FiPlus } from "react-icons/fi";

const Experience = ({ onOpenExperienceModal }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-6">
      {/* Header */}
      <div className="flex justify-between items-center px-5 py-3 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
        <h2 className="text-lg font-semibold text-gray-800">Experience</h2>
        <button
          onClick={onOpenExperienceModal}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <FiPlus className="text-gray-600" size={18} />
        </button>
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-gray-800 text-sm">
              DSE Engineer | Full Stack Engineer
            </h3>
            <p className="text-gray-600 text-sm">Infosys</p>
            <p className="text-gray-500 text-xs mt-1">May 2022 - Present</p>
            <p className="text-gray-500 text-xs">Pune, Maharashtra, India</p>
          </div>

          <button
            onClick={onOpenExperienceModal}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <FiEdit2 className="text-gray-500" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Experience;
