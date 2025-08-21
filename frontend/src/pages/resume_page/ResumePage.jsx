import React, { useState } from "react";
import ResumeContent from "../../components/resume/ResumeContent";
import RightSidebar from "../../components/resume/RightSidebar";

const ResumePage = () => {
  const [cvUrl, setCvUrl] = useState(null); // lưu link PDF từ Cloudinary

  return (
    <div className="container mx-auto max-w-7xl px-6 sm:px-6 lg:px-6 flex gap-6 mt-20 mb-6 text-black">
      <div className="flex-1">
        <ResumeContent cvUrl={cvUrl} />
      </div>
      <div className="hidden lg:block w-1/4">
        <RightSidebar cvUrl={cvUrl} setCvUrl={setCvUrl} />
      </div>
    </div>
  );
};

export default ResumePage;
