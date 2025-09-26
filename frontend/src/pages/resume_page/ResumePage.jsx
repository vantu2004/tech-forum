import React, { useState } from "react";
import ResumeContent from "../../components/resume/ResumeContent";
import RightSidebar from "../../components/resume/RightSidebar";
import { useUserProfileStore } from "../../stores/useUserProfileStore";
import { useEffect } from "react";

const ResumePage = () => {
  const [cvUrl, setCvUrl] = useState(null); // lưu link PDF từ Cloudinary
  const { userProfile, fetchUserProfile } = useUserProfileStore();

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  return (
    <div className="container mx-auto max-w-7xl px-6 sm:px-6 lg:px-6 flex gap-6 mt-20 mb-6 text-black">
      <div className="flex-1">
        {/* Lấy CV đầu tiên từ mảng resume (TODO: thêm combobox chọn resume để load lên iframe, tạm thời load đỡ cái đầu tiên) */}
        <ResumeContent cvUrl={userProfile?.resume?.[0]} />
      </div>
      <div className="hidden lg:block w-1/4">
        <RightSidebar cvUrl={cvUrl} setCvUrl={setCvUrl} />
      </div>
    </div>
  );
};

export default ResumePage;
