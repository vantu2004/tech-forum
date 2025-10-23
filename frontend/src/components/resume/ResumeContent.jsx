import { useEffect, useRef } from "react";
import { useUserProfileStore } from "../../stores/useUserProfileStore";
import CV from "./CV";

const ResumeContent = ({ cvOptions = [] }) => {
  const {
    selectedIndex,
    setSelectedIndex,
    uploadResume,
    userProfile,
    setDefaultResume,
  } = useUserProfileStore();

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (cvOptions.length > 0) {
      setSelectedIndex(0); // mặc định chọn CV đầu tiên
    }
  }, [cvOptions, setSelectedIndex]);

  const handleSelectChange = async (e) => {
    await setSelectedIndex(Number(e.target.value));
  };

  const selectedCv = cvOptions[selectedIndex] || "";

  const handleSetDefault = async (resumeUrl) => {
    try {
      await setDefaultResume(resumeUrl); // luôn update dù null hay có link
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">My Resume</h2>

        {cvOptions.length > 0 && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Select Resume:
            </label>

            <div className="flex items-center justify-between gap-3">
              {/* Trái: select + upload */}
              <div className="flex items-center gap-3">
                <select
                  value={selectedIndex}
                  onChange={handleSelectChange}
                  className="px-3 py-2 border border-gray-300 rounded-full text-sm text-gray-700 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition cursor-pointer hover:border-blue-400"
                >
                  {cvOptions.map((url, index) => (
                    <option key={index} value={index}>
                      CV {index + 1}
                    </option>
                  ))}
                </select>

                <button
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-medium shadow-md transition active:scale-95"
                  onClick={() => fileInputRef.current.click()}
                >
                  Upload CV
                </button>
              </div>

              {/* Phải: checkbox set default */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={
                    cvOptions?.[selectedIndex] === userProfile?.defaultResume
                  }
                  onChange={() => {
                    const selectedCv = cvOptions[selectedIndex];
                    const isDefault = userProfile?.defaultResume === selectedCv;

                    // Nếu đang là default → bỏ mặc định (null)
                    // Nếu chưa → đặt làm mặc định
                    handleSetDefault(isDefault ? null : selectedCv);
                  }}
                  className="w-4 h-4 cursor-pointer"
                />
                <span className="text-sm font-medium">
                  {cvOptions?.[selectedIndex] === userProfile?.defaultResume
                    ? "Default CV"
                    : "Set as default"}
                </span>
              </label>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
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
      </div>

      {selectedCv ? (
        <CV selectedCv={selectedCv} />
      ) : (
        <p className="text-sm text-gray-600 p-6">No CV available.</p>
      )}
    </div>
  );
};

export default ResumeContent;
