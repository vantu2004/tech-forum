import Suggestion from "../common/SuggestionCard";
import { useUserProfileStore } from "../../stores/useUserProfileStore";

const RightSidebar = ({ cvOptions }) => {
  const {
    selectedIndex,
    isLoading,
    uploadResume,
    deleteResume,
    replaceResume,
  } = useUserProfileStore();

  return (
    <div className="space-y-4 sticky top-20">
      <Suggestion />

      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-sm font-semibold mb-3">Resume Actions</h3>

        {cvOptions && cvOptions.length > 0 ? (
          <div className="space-y-2">
            <button
              onClick={() => deleteResume(cvOptions[selectedIndex])}
              className="w-full bg-red-500 text-white text-sm px-4 py-2 rounded-full hover:bg-red-600"
            >
              {isLoading ? (
                <span className="loading loading-ring loading-xm"></span>
              ) : (
                "Delete CV"
              )}
            </button>

            <label className="w-full block bg-yellow-500 text-white text-sm px-4 py-2 rounded-full text-center cursor-pointer hover:bg-yellow-600">
              {isLoading ? (
                <span className="loading loading-ring loading-xm"></span>
              ) : (
                "Replace CV"
              )}
              <input
                type="file"
                accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    replaceResume(cvOptions[selectedIndex], file);
                  }
                }}
              />
            </label>
          </div>
        ) : (
          // Add CV
          <label className="w-full block bg-green-600 text-white text-sm px-4 py-2 rounded-full text-center cursor-pointer hover:bg-green-700">
            {isLoading ? (
              <span className="loading loading-ring loading-xm"></span>
            ) : (
              "Add CV"
            )}
            <input
              type="file"
              accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
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
