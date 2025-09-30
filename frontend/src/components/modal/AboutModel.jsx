// src/components/common/AboutModal.jsx
import { useState } from "react";
import Modal from "./Modal";
import { useUserProfileStore } from "../../stores/useUserProfileStore";

const AboutModal = ({ onClose, userProfile }) => {
  const { updateProfile } = useUserProfileStore();

  const [about, setAbout] = useState(userProfile?.about || "");

  const handleSave = async () => {
    try {
      await updateProfile({ about });
    } catch (err) {
      console.error("Update failed:", err.message);
    } finally {
      onClose();
    }
  };

  return (
    <Modal onClose={onClose} size="max-w-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit About</h2>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          About You<span className="text-red-500">*</span>
        </label>
        <textarea
          rows={6}
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
          placeholder="Write something about yourself..."
        />
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
          className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          Save
        </button>
      </div>
    </Modal>
  );
};

export default AboutModal;
