import ProfileInfoCard from "../../components/common/ProfileInfoCard";
import SuggestionCard from "../../components/common/SuggestionCard";

const notifications = [
  {
    id: 1,
    user: "Dummy User",
    type: "friend_request",
    message: "has sent you a friend request",
    avatar: "https://ui-avatars.com/api/?name=Dummy+User",
    time: "2h ago",
  },
  {
    id: 2,
    user: "User 1",
    type: "friend_request",
    message: "has sent you a friend request",
    avatar: "https://ui-avatars.com/api/?name=User+1",
    time: "5h ago",
  },
  {
    id: 3,
    user: "Tester 1",
    type: "accepted_request",
    message: "has accepted your friend request",
    avatar: "https://ui-avatars.com/api/?name=Tester+1",
    time: "1d ago",
  },
  {
    id: 4,
    user: "Shubham",
    type: "comment",
    message: "has commented on your post",
    avatar: "https://ui-avatars.com/api/?name=Shubham",
    time: "1d ago",
  },
];

const NotificationPage = () => {
  return (
    <div className="container mx-auto max-w-7xl px-6 sm:px-6 lg:px-6 flex gap-6 mt-20 mb-6">
      {/* Left Sidebar */}
      <div className="hidden lg:block w-1/4">
        <ProfileInfoCard />
      </div>

      {/* Middle Feed */}
      <div className="flex-1 max-w-2xl">
        <h2 className="text-xl font-semibold mb-6 text-black">
          All Notifications
        </h2>

        <div className="space-y-4">
          {notifications.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-white rounded-2xl shadow-md p-4 hover:bg-gray-100 transition"
            >
              {/* Avatar */}
              <img
                src={item.avatar}
                alt={item.user}
                className="w-12 h-12 rounded-full object-cover"
              />

              {/* Content */}
              <div className="flex-1">
                <p className="text-gray-800">
                  <span className="font-semibold">{item.user}</span>{" "}
                  {item.message}
                </p>
                <p className="text-sm text-gray-500">{item.time}</p>
              </div>

              {/* Optional Action Button */}
              {item.type === "friend_request" && (
                <button className="px-3 py-1 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                  Accept
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="hidden lg:block w-1/4">
        <SuggestionCard />
      </div>
    </div>
  );
};

export default NotificationPage;
