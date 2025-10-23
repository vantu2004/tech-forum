import { FiMoreVertical, FiUser, FiMessageCircle } from "react-icons/fi";
import { useConversationStore } from "../../stores/useConversationStore.js";
import { useUserAuthStore } from "../../stores/useUserAuthStore.js";
import { useUserFriendShipStore } from "../../stores/useUserFriendShipStore.js";

const SideBar = ({ activeChat, setActiveChat }) => {
  const {
    isLoading: isLoadingConversations,
    conversations,
    createConversation,
  } = useConversationStore();
  const { isLoading: isLoadingAccepted, accepted } = useUserFriendShipStore();
  const { userAuth } = useUserAuthStore();

  // Lọc ra những friend chưa có conversation
  const conversationIds = new Set(
    conversations.flatMap((c) => c.participants.map((p) => p._id))
  );

  const friendsWithoutConversation =
    accepted?.filter((f) => !conversationIds.has(f._id)) || [];

  const handleStartChat = async (friendId) => {
    const conversation = await createConversation(friendId, "Hi 👋"); // tạo convo mới
    if (conversation) {
      setActiveChat(conversation); // Mở convo mới tạo
    }
  };

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

      {/* Conversations */}
      <div className="overflow-y-auto flex-1">
        {isLoadingConversations ? (
          <div className="p-4 text-sm text-gray-500">
            Loading conversations...
          </div>
        ) : conversations.length === 0 ? (
          <div className="p-4 text-sm text-gray-500">
            No conversations found
          </div>
        ) : (
          conversations.map((conversation) => {
            const friend = conversation.participants.find(
              (p) => p._id !== userAuth?._id
            );
            const lastMsg = conversation.lastMessage;
            const isMine = lastMsg?.senderId?._id === userAuth?._id;

            return (
              <div
                key={conversation._id}
                onClick={() => setActiveChat(conversation)}
                className="flex items-center gap-3 p-3 hover:bg-blue-50 cursor-pointer transition border-b border-gray-100"
              >
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
                <div className="flex-1">
                  <p className="font-medium text-gray-800">
                    {friend?.profile?.name || "Unknown"}
                  </p>
                  {lastMsg ? (
                    <p className="text-xs text-gray-500 truncate max-w-[180px]">
                      {isMine ? "You: " : ""}
                      {lastMsg.message || "📷 Photo"}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-400 italic">
                      No messages yet
                    </p>
                  )}
                </div>
              </div>
            );
          })
        )}

        {/* Accepted friends chưa có conversation */}
        {!isLoadingAccepted && friendsWithoutConversation.length > 0 && (
          <>
            <h3 className="text-xs uppercase font-semibold text-gray-500 mt-3 px-3">
              Friends
            </h3>
            {friendsWithoutConversation.map((friend) => (
              <div
                key={friend._id}
                className="flex items-center gap-3 p-3 hover:bg-blue-50 transition border-b border-gray-100"
              >
                {friend?.profile?.profile_pic ? (
                  <img
                    src={friend.profile?.profile_pic}
                    alt={friend.profile?.name}
                    className="w-12 h-12 rounded-full ring-2 ring-gray-100 object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full ring-2 ring-gray-100 bg-gray-200 flex items-center justify-center">
                    <FiUser className="text-gray-500 text-xl" />
                  </div>
                )}
                <div className="flex-1">
                  <p className="font-medium text-gray-800">
                    {friend.profile?.name || "Unknown"}
                  </p>
                  <p
                    className="text-xs text-gray-500 truncate max-w-[180px]"
                    title={friend.profile?.headline}
                  >
                    {friend.profile?.headline}
                  </p>
                </div>
                <button
                  onClick={() => handleStartChat(friend._id)}
                  className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <FiMessageCircle size={16} />
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </aside>
  );
};

export default SideBar;
