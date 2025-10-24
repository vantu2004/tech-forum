import { useNotificationStore } from "../../stores/useNotificationStore";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NotificationContent = () => {
  const { notifications, isLoading, unreadCount, markAsRead } =
    useNotificationStore();

  const navigate = useNavigate();

  if (isLoading) {
    return <p className="text-gray-500 text-sm">Loading notifications...</p>;
  }

  const handleOpenNotification = (notification) => {
    if (notification.type === "FRIEND_REQUEST") {
      // Chuyển hướng đến trang friend requests
      navigate(`/profile/user/${notification.senderId?._id}`);
    }
    markAsRead(notification._id);
  };

  return (
    <div className="flex-1 max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-black">All Notifications</h2>
        <span className="text-sm text-gray-600">{unreadCount} unread</span>
      </div>

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <p className="text-gray-500 text-sm">No notifications yet.</p>
        ) : (
          notifications.map((item) => (
            <div
              key={item._id}
              onClick={() => handleOpenNotification(item)}
              className={`flex items-start gap-4 rounded-2xl p-4 transition cursor-pointer border 
    ${item.isRead ? "bg-white border-gray-100" : "bg-blue-50 border-blue-200"}`}
            >
              {/* Avatar người gửi */}
              {item.senderId?.profile?.profile_pic ? (
                <img
                  src={
                    item.senderId?.profile?.profile_pic || "/default-avatar.png"
                  }
                  alt={item.senderId?.profile?.name || "User"}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full ring-2 ring-gray-100 bg-gray-200 flex items-center justify-center">
                  <FiUser className="text-gray-500 text-xl" />
                </div>
              )}

              {/* Nội dung */}
              <div className="flex-1">
                {/* Dòng đầu: Tên + thời gian */}
                <div className="flex items-center justify-between">
                  <Link to={`/profile/user/${item.senderId?._id}`}>
                    <p className="font-semibold text-gray-900 text-sm hover:text-blue-600 transition">
                      {item.senderId?.profile?.name || "Someone"}
                    </p>
                  </Link>

                  <p className="text-xs text-gray-500">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>

                {/* Dòng nội dung */}
                <p className="text-gray-700 text-sm mt-0.5">{item.content}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationContent;
