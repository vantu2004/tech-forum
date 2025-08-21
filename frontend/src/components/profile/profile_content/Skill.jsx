import React from "react";
import { FiEdit } from "react-icons/fi";

const Skill = ({ onOpenSkillModal }) => {
  return (
    <div className="mt-6 space-y-4">
      <div className="bg-white rounded-lg shadow-sm p-4 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-800">Skills</h2>
          <button
            onClick={onOpenSkillModal}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <FiEdit className="text-gray-600" size={18} />
          </button>
        </div>

        {/* Skills list */}
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">
            React
          </span>
          <span className="px-3 py-1 bg-green-50 text-green-700 text-sm font-medium rounded-full">
            Node.js
          </span>
          <span className="px-3 py-1 bg-yellow-50 text-yellow-700 text-sm font-medium rounded-full">
            JavaScript
          </span>
          <span className="px-3 py-1 bg-purple-50 text-purple-700 text-sm font-medium rounded-full">
            MongoDB
          </span>
          <span className="px-3 py-1 bg-pink-50 text-pink-700 text-sm font-medium rounded-full">
            Tailwind CSS
          </span>
        </div>
      </div>
    </div>
  );
};

export default Skill;
