import { FiMoreVertical, FiUser } from "react-icons/fi";
import { useConversationStore } from "../../stores/useConversationStore.js";
import { useUserAuthStore } from "../../stores/useUserAuthStore.js"; // nơi bạn lưu user hiện tại

const SideBar = ({ activeChat, setActiveChat }) => {
  const { isLoading, conversations } = useConversationStore();
  const { userAuth } = useUserAuthStore(); // giả sử user._id là id người hiện tại

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
          <div className="p-4 text-sm text-gray-500">
            Loading conversations...
          </div>
        ) : conversations.length === 0 ? (
          <div className="p-4 text-sm text-gray-500">
            No conversations found
          </div>
        ) : (
          conversations.map((conversation) => {
            // tìm người còn lại (không phải mình)
            const friend = conversation.participants.find(
              (p) => p._id !== userAuth?._id
            );

            return (
              <div
                key={conversation._id}
                onClick={() => setActiveChat(conversation)} // chọn chat
                className="flex items-center gap-3 p-3 hover:bg-blue-50 cursor-pointer transition border-b border-gray-100"
              >
                {/* Avatar */}
                {friend?.profile?.profile_pic ? (
                  <img
                    src={friend.profile.profile_pic}
                    alt={friend.profile?.name}
                    className="w-12 h-12 rounded-full ring-2 ring-gray-100 object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full ring-2 ring-gray-100 bg-gray-200 flex items-center justify-center">
                    <FiUser className="text-gray-500 text-xl" />
                  </div>
                )}

                {/* Info */}
                <div className="flex-1">
                  <p className="font-medium text-gray-800">
                    {friend?.profile?.name || "Unknown"}
                  </p>
                  <p
                    className="text-xs text-gray-500 truncate max-w-[180px]"
                    title={friend?.headline}
                  >
                    {friend?.headline}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
};

export default SideBar;
