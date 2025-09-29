import { useState } from "react";
import Suggestion from "../common/SuggestionCard";
import { useUserProfileStore } from "../../stores/useUserProfileStore";

const RightSidebar = ({ cvOptions }) => {
  const { selectedIndex, uploadResume, deleteResume, replaceResume } =
    useUserProfileStore();

  const [isReplacing, setIsReplacing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleDelete = async () => {
    if (!cvOptions?.[selectedIndex]) return;
    try {
      setIsDeleting(true);
      await deleteResume(cvOptions[selectedIndex]);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleReplace = async (file) => {
    if (!cvOptions?.[selectedIndex] || !file) return;
    try {
      setIsReplacing(true);
      await replaceResume(cvOptions[selectedIndex], file);
    } finally {
      setIsReplacing(false);
    }
  };

  const handleUpload = async (file) => {
    if (!file) return;
    try {
      setIsUploading(true);
      await uploadResume(file);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4 sticky top-20">
      <Suggestion />

      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-sm font-semibold mb-3">Resume Actions</h3>

        {cvOptions?.length > 0 ? (
          <div className="space-y-2">
            {/* Delete CV */}
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="w-full bg-red-500 text-white text-sm px-4 py-2 rounded-full hover:bg-red-600 disabled:opacity-50"
            >
              {isDeleting ? (
                <span className="loading loading-ring loading-xm"></span>
              ) : (
                "Delete CV"
              )}
            </button>

            {/* Replace CV */}
            <label className="w-full block bg-yellow-500 text-white text-sm px-4 py-2 rounded-full text-center cursor-pointer hover:bg-yellow-600 disabled:opacity-50">
              {isReplacing ? (
                <span className="loading loading-ring loading-xm"></span>
              ) : (
                "Replace CV"
              )}
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleReplace(file);
                }}
              />
            </label>
          </div>
        ) : (
          // Add CV
          <label className="w-full block bg-green-600 text-white text-sm px-4 py-2 rounded-full text-center cursor-pointer hover:bg-green-700 disabled:opacity-50">
            {isUploading ? (
              <span className="loading loading-ring loading-xm"></span>
            ) : (
              "Add CV"
            )}
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleUpload(file);
              }}
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;
