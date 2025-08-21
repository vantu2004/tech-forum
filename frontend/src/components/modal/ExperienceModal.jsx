// src/components/common/ExperienceModal.jsx
import Modal from "./Modal";
import { useState } from "react";

const ExperienceModal = ({ onClose, initialData = {} }) => {
  const [form, setForm] = useState({
    role: initialData.role || "",
    company: initialData.company || "",
    duration: initialData.duration || "",
    address: initialData.address || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Experience submitted:", form);
    onClose();
  };

  return (
    <Modal onClose={onClose} size="max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">Add/Edit Experience</h2>

      <div className="space-y-5">
        {/* Role */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Role<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="E.g. Software Engineer, Student"
          />
        </div>

        {/* Company / School */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Company / School<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Enter company or school"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Duration<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="duration"
            value={form.duration}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="E.g. Jan 2022 - Present"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Address<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Enter location"
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

export default ExperienceModal;
