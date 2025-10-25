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
    </div>
  );
};

export default LeftSidebar;
