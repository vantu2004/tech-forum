import React, { useState } from "react";
import Suggestion from "../common/SuggestionCard";

const RightSidebar = ({ cvUrl, setCvUrl }) => {
  const [loading, setLoading] = useState(false);

  // giả lập upload lên Cloudinary
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);

    // gọi API backend của bạn (multer + cloudinary)
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setCvUrl(data.url); // link PDF từ cloudinary
    setLoading(false);
  };

  const handleDelete = () => {
    // gọi API xóa ở backend, sau đó clear cvUrl
    setCvUrl(null);
  };

  return (
    <div className="space-y-4 sticky top-20">
      <Suggestion />

      {/* CV Actions */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-sm font-semibold mb-3">Resume Actions</h3>
        {cvUrl ? (
          <div className="space-y-2">
            <button
              onClick={handleDelete}
              className="w-full bg-red-500 text-white text-sm px-4 py-2 rounded-full hover:bg-red-600"
            >
              Delete CV
            </button>
            <label className="w-full block bg-yellow-500 text-white text-sm px-4 py-2 rounded-full text-center cursor-pointer hover:bg-yellow-600">
              {loading ? "Uploading..." : "Replace CV"}
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={handleUpload}
              />
            </label>
          </div>
        ) : (
          <label className="w-full block bg-green-600 text-white text-sm px-4 py-2 rounded-full text-center cursor-pointer hover:bg-green-700">
            {loading ? "Uploading..." : "Add CV"}
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleUpload}
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;
