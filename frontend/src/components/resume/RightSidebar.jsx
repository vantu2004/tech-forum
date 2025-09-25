import React, { useState } from "react";
import Suggestion from "../common/SuggestionCard";
import { useUserProfileStore } from "../../stores/useUserProfileStore";

const RightSidebar = ({ cvUrl, setCvUrl }) => {
  const { isLoading, uploadResume } = useUserProfileStore();

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
              {isLoading ? (
                <span className="loading loading-ring loading-xm"></span>
              ) : (
                "Replace CV"
              )}
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    uploadResume(file);
                  }
                }}
              />
            </label>
          </div>
        ) : (
          <label className="w-full block bg-green-600 text-white text-sm px-4 py-2 rounded-full text-center cursor-pointer hover:bg-green-700">
            {isLoading ? (
              <span className="loading loading-ring loading-xm"></span>
            ) : (
              "Add CV"
            )}
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  uploadResume(file);
                }
              }}
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;
