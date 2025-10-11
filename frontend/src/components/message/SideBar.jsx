import { FiMoreVertical, FiUser } from "react-icons/fi";
import { useUserFriendShipStore } from "../../stores/useUserFriendShipStore.js";

const MessageContentSideBar = ({ activeChat, setActiveChat }) => {
  const { isLoading, accepted } = useUserFriendShipStore();

  return (
    <aside
      className={`${
        activeChat ? "hidden" : "flex"
      } md:flex md:w-1/3 border-r border-gray-100 bg-gray-50 flex-col`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white">
        <h2 className="font-semibold text-gray-800">Messaging</h2>
        <button className="p-1 rounded hover:bg-gray-100">
          <FiMoreVertical />
        </button>
      </div>

      {/* Search */}
      <div className="px-3 py-2">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-3 py-2 rounded-full border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
      </div>

      {/* Chat list */}
      <div className="overflow-y-auto">
        {isLoading ? (
          <div className="p-4 text-sm text-gray-500">Loading friends...</div>
        ) : accepted.length === 0 ? (
          <div className="p-4 text-sm text-gray-500">No friends found</div>
        ) : (
          accepted.map((userFriendship) => (
            <div
              key={userFriendship._id}
              onClick={() => setActiveChat(userFriendship)} // chọn chat
              className="flex items-center gap-3 p-3 hover:bg-blue-50 cursor-pointer transition border-b border-gray-100"
            >
              {userFriendship.profile?.profile_pic ? (
                <img
                  src={userFriendship.profile.profile_pic}
                  alt={userFriendship.profile?.name}
                  className="w-12 h-12 rounded-full ring-2 ring-gray-100 object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full ring-2 ring-gray-100 bg-gray-200 flex items-center justify-center">
                  <FiUser className="text-gray-500 text-xl" />
                </div>
              )}

              <div className="flex-1">
                <p className="font-medium text-gray-800">
                  {userFriendship.profile?.name || "Unknown"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {userFriendship.profile?.headline || "No headline"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
};

export default MessageContentSideBar;
