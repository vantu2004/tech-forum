import ProfileInfoCard from "../../components/common/ProfileInfoCard";
import SuggestionCard from "../../components/common/SuggestionCard";
import { useUserProfileStore } from "../../stores/useUserProfileStore";
import { useNotificationStore } from "../../stores/useNotificationStore";
import NotificationContent from "../../components/notification/NotificationContent";
import { useEffect } from "react";

const NotificationPage = () => {
  const { isLoading, userProfile } = useUserProfileStore();
  const { fetchNotifications } = useNotificationStore();

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return (
    <div className="container mx-auto max-w-7xl px-6 sm:px-6 lg:px-6 flex gap-6 mt-20 mb-6">
      {/* Left Sidebar */}
      <div className="hidden lg:block w-1/4">
        <ProfileInfoCard isLoading={isLoading} userProfile={userProfile} />
      </div>

      {/* Middle Feed */}
      <NotificationContent />

      {/* Right Sidebar */}
      <div className="hidden lg:block w-1/4">
        <SuggestionCard />
      </div>
    </div>
  );
};

export default NotificationPage;
