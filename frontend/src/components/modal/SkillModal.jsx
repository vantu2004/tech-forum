import { useState, useEffect } from "react";
import Modal from "./Modal";
import { FiX } from "react-icons/fi";
import { useUserSkillStore } from "../../stores/useUserSkillStore";

const SkillModal = ({ onClose, userSkills = [] }) => {
  const [skills, setSkills] = useState(userSkills);
  const [input, setInput] = useState("");
  const { updateUserSkills, isLoading } = useUserSkillStore();

  // đồng bộ khi mở modal
  useEffect(() => {
    setSkills(userSkills);
  }, [userSkills]);

  const handleAdd = () => {
    if (input.trim() !== "" && !skills.includes(input.trim())) {
      setSkills([...skills, input.trim()]);
      setInput("");
    }
  };

  const handleRemove = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSave = async () => {
    try {
      await updateUserSkills(skills);
    } catch (err) {
      console.error("Update failed:", err.message);
    } finally {
      onClose();
    }
  };

  return (
    <Modal onClose={onClose} size="max-w-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Skills</h2>

      {/* Input + Add button */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a skill..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>

      {/* Skills tags */}
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full shadow-sm"
          >
            {skill}
            <button
              onClick={() => handleRemove(skill)}
              className="hover:bg-blue-100 rounded-full p-1 transition"
            >
              <FiX size={14} />
            </button>
          </span>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-8">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </Modal>
  );
};

export default SkillModal;
