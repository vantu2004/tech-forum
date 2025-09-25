import React from "react";

const ResumeContent = ({ cvUrl }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">My Resume</h2>
      {cvUrl ? (
        <div className="space-y-4">
          {/* Nhúng trực tiếp */}
          <iframe
            src={cvUrl} 
            title="Resume"
            className="w-full h-[500px] border rounded"
          ></iframe>
        </div>
      ) : (
        <p className="text-sm text-gray-600">
          You don’t have a CV yet. Please upload one.
        </p>
      )}
    </div>
  );
};

export default ResumeContent;
