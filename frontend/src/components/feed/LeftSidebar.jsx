import ProfileInfoCard from "../common/ProfileInfoCard";
import { useUserProfileStore } from "../../stores/useUserProfileStore";
import { useEffect } from "react";

const LeftSidebar = () => {
  const { userProfile, fetchUserProfile, isLoading } = useUserProfileStore();

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  return (
    <div className="space-y-4 sticky top-20">
      {/* Card 1: Profile Info */}
      <ProfileInfoCard isLoading={isLoading} userProfile={userProfile} />

      {/* Card 2: Analytics */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Profile viewers</span>
          <span className="text-blue-600 font-medium">23</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Post impressions</span>
          <span className="text-blue-600 font-medium">90</span>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
