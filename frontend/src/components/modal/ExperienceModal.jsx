// src/components/common/ExperienceModal.jsx
import toast from "react-hot-toast";
import Modal from "./Modal";
import { useState } from "react";
import { useUserExperienceStore } from "../../stores/useUserExperienceStore";

const ExperienceModal = ({ onClose, experience = null }) => {
  const { isLoading, createExperience, updateUserExperience } =
    useUserExperienceStore();

  const [form, setForm] = useState({
    designation: experience?.designation || "",
    company_name: experience?.company_name || "",
    duration: experience?.duration || "",
    location: experience?.location || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (
      !form.designation.trim() ||
      !form.company_name.trim() ||
      !form.duration.trim() ||
      !form.location.trim()
    ) {
      toast.error("Please fill all the fields.");
      return;
    }

    try {
      if (experience) {
        await updateUserExperience(experience._id, form);
      } else {
        await createExperience(form);
      }
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal onClose={onClose} size="max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">
        {experience ? "Edit Experience" : "Add Experience"}
      </h2>

      <div className="space-y-5">
        {/* Role */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Role<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="designation"
            value={form.designation}
            onChange={handleChange}
            disabled={isLoading}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="E.g. Software Engineer, Student"
          />
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Company / School<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="company_name"
            value={form.company_name}
            onChange={handleChange}
            disabled={isLoading}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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
            disabled={isLoading}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="E.g. Jan 2022 - Present"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Location<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            disabled={isLoading}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Enter location"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-8">
        <button
          onClick={onClose}
          disabled={isLoading}
          className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </Modal>
  );
};

export default ExperienceModal;
