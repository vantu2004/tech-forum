import Modal from "./Modal";
import { useState } from "react";
import { useUserProfileStore } from "../../stores/useUserProfileStore";
import { toast } from "react-hot-toast";

const InformationModal = ({ onClose, userProfile = {} }) => {
  const { updateProfile } = useUserProfileStore();

  const [form, setForm] = useState({
    name: userProfile?.name || "",
    headline: userProfile?.headline || "",
    curr_company: userProfile?.curr_company || "",
    curr_location: userProfile?.curr_location || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      if (!form.name) {
        toast.error("Please enter your full name.");
        return;
      }

      await updateProfile({
        name: form.name,
        headline: form.headline,
        curr_company: form.curr_company,
        curr_location: form.curr_location,
      });
    } catch (err) {
      console.error("Update failed:", err.message);
    } finally {
      onClose();
    }
  };

  return (
    <Modal onClose={onClose} size="max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">Edit Info</h2>

      <div className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Full Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Enter your full name"
          />
        </div>

        {/* Headline */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Headline<span className="text-red-500">*</span>
          </label>
          <textarea
            name="headline"
            value={form.headline}
            onChange={handleChange}
            rows={2}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
            placeholder="E.g. Fullstack Developer @Company"
          />
        </div>

        {/* Current Company */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Current Company / School<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="curr_company"
            value={form.curr_company}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Enter current workplace or school"
          />
        </div>

        {/* Current Location */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Current Location<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="curr_location"
            value={form.curr_location}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Enter your current location"
          />
        </div>
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

export default InformationModal;
