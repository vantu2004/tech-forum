import { useEffect } from "react";
import ResumeContent from "../../components/resume/ResumeContent";
import RightSidebar from "../../components/resume/RightSidebar";
import { useUserProfileStore } from "../../stores/useUserProfileStore";

const ResumePage = () => {
  const { userProfile, fetchUserProfile } = useUserProfileStore();

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  return (
    <div className="container mx-auto max-w-7xl px-6 sm:px-6 lg:px-6 flex gap-6 mt-20 mb-6 text-black">
      <div className="flex-1">
        <ResumeContent
          cvOptions={userProfile?.resume || []}
        />
      </div>
      <div className="hidden lg:block w-1/4">
        <RightSidebar cvOptions={userProfile?.resume || []} />
      </div>
    </div>
  );
};

export default ResumePage;
