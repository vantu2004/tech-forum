import React, { useEffect, useRef } from "react";
import { useUserProfileStore } from "../../stores/useUserProfileStore";

const ResumeContent = ({ cvOptions = []}) => {
  const { selectedIndex, setSelectedIndex, uploadResume } = useUserProfileStore();
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (cvOptions.length > 0) {
      setSelectedIndex(0); // mặc định chọn CV đầu tiên
    }
  }, [cvOptions, setSelectedIndex]);

  const handleSelectChange = (e) => {
    setSelectedIndex(Number(e.target.value));
  };

  const selectedCv = cvOptions[selectedIndex] || "";

  // Kiem tra định dạng file và trả về URL phù hợp cho iframe
  const getViewerUrl = (url) => {
    if (!url) return "";

    const lower = url.toLowerCase();
    const isWord = lower.endsWith(".doc") || lower.endsWith(".docx");

    if (isWord) {
      return `https://docs.google.com/gview?url=${encodeURIComponent(
        url
      )}&embedded=true`;
    }

    // Nếu không phải Word, mặc định là PDF
    return url;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">My Resume</h2>

      {cvOptions.length > 0 && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Select Resume:
          </label>

          <select
            value={selectedIndex}
            onChange={handleSelectChange}
            className="select select-info bg-white w-[120px]"
          >
            {cvOptions.map((url, index) => (
              <option key={index} value={index}>
                CV {index + 1}
              </option>
            ))}
          </select>

          <button
            className="btn btn-md btn-primary ml-4 mr-2"
            onClick={() => fileInputRef.current.click()}
          >
            Upload CV
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file && uploadResume) {
                uploadResume(file);
                setSelectedIndex(cvOptions.length - 1); // Chọn CV mới tải lên
              }
            }}
          />
        </div>
      )}

      {selectedCv ? (
        <div className="space-y-4">
          <iframe
            src={getViewerUrl(selectedCv)}
            title="Resume"
            className="w-full h-[500px] border rounded"
          ></iframe>
        </div>
      ) : (
        <p className="text-sm text-gray-600">No CV available.</p>
      )}
    </div>
  );
};

export default ResumeContent;
