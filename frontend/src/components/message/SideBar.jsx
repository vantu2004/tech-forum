import { FiMoreVertical, FiUser, FiMessageCircle } from "react-icons/fi";
import { useConversationStore } from "../../stores/useConversationStore.js";
import { useUserAuthStore } from "../../stores/useUserAuthStore.js";
import { useUserFriendShipStore } from "../../stores/useUserFriendShipStore.js";
import { useState, useEffect, useMemo } from "react";

const normalizeText = (str) =>
  str
    ?.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim() || "";

export default function SideBar({ activeChat, setActiveChat }) {
  const {
    conversations,
    isLoading: isConvoLoading,
    createConversation,
    subscribeToConversationUpdates,
    unsubscribeFromConversationUpdates,
  } = useConversationStore();
  const { accepted, isLoading: isFriendLoading } = useUserFriendShipStore();
  const { userAuth, onlineUsers } = useUserAuthStore();

  const [search, setSearch] = useState("");

  useEffect(() => {
    subscribeToConversationUpdates();
    return unsubscribeFromConversationUpdates;
  }, [subscribeToConversationUpdates, unsubscribeFromConversationUpdates]);

  const convoIds = new Set(
    conversations.flatMap((c) => c.participants.map((p) => p._id))
  );
  const friendsWithoutConvo =
    accepted?.filter((f) => !convoIds.has(f._id)) || [];

  const results = useMemo(() => {
    const q = normalizeText(search);
    if (!q) return null;

    const match = (name, headline) =>
      normalizeText(name).includes(q) || normalizeText(headline).includes(q);

    return {
      convos: conversations.filter((c) => {
        const friend = c.participants.find((p) => p._id !== userAuth?._id);
        return match(friend?.profile?.name, friend?.profile?.headline);
      }),
      friends: friendsWithoutConvo.filter((f) =>
        match(f.profile?.name, f.profile?.headline)
      ),
    };
  }, [search, conversations, friendsWithoutConvo, userAuth]);

  const handleStartChat = async (id) => {
    const convo = await createConversation(id, "Hi 👋");
    if (convo) setActiveChat(convo);
  };

  const renderUserItem = (user, onClick, lastMsg) => (
    <div
      key={user._id}
      onClick={onClick}
      className="flex items-center gap-3 p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100"
    >
      <div className="relative">
        {user?.profile?.profile_pic ? (
          <img
            src={user.profile.profile_pic}
            alt={user.profile.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center ring-2 ring-gray-100">
            <FiUser className="text-gray-500 text-xl" />
          </div>
        )}
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
            onlineUsers.includes(user._id) ? "bg-green-500" : "bg-gray-400"
          }`}
        ></span>
      </div>
      <div className="flex-1">
        <p className="font-medium text-gray-800">
          {user.profile?.name || "Unknown"}
        </p>
        {lastMsg ? (
          <p className="text-xs text-gray-500 truncate max-w-[180px]">
            {lastMsg.senderId?._id === userAuth?._id ? "You: " : ""}
            {lastMsg.message || "📷 Photo"}
          </p>
        ) : (
          <p className="text-xs text-gray-400 italic">No messages yet</p>
        )}
      </div>
    </div>
  );

  return (
    <aside
      className={`${
        activeChat ? "hidden" : "flex"
      } md:flex md:w-1/3 border-r border-gray-100 bg-gray-50 flex-col`}
    >
      <div className="flex items-center justify-between px-4 py-3 bg-white">
        <h2 className="font-semibold text-gray-800">Messaging</h2>
        <button className="p-1 rounded hover:bg-gray-100">
          <FiMoreVertical />
        </button>
      </div>

      <div className="px-3 py-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name or headline..."
          className="w-full px-3 py-2 rounded-full border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
      </div>

      <div className="overflow-y-auto flex-1">
        {results ? (
          <>
            {results.convos.length === 0 && results.friends.length === 0 ? (
              <p className="p-4 text-sm text-gray-500 italic">
                No matches found
              </p>
            ) : (
              <>
                {results.convos.map((c) => {
                  const f = c.participants.find((p) => p._id !== userAuth?._id);
                  return renderUserItem(
                    f,
                    () => setActiveChat(c),
                    c.lastMessage
                  );
                })}
                {results.friends.length > 0 && (
                  <>
                    <h3 className="text-xs uppercase font-semibold text-gray-500 mt-3 px-3">
                      Friends
                    </h3>
                    {results.friends.map((f) => (
                      <div
                        key={f._id}
                        className="flex items-center gap-3 p-3 hover:bg-blue-50 border-b"
                      >
                        {renderUserItem(f)}
                        <button
                          onClick={() => handleStartChat(f._id)}
                          className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
                        >
                          <FiMessageCircle size={16} />
                        </button>
                      </div>
                    ))}
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <>
            {isConvoLoading ? (
              <p className="p-4 text-sm text-gray-500">
                Loading conversations...
              </p>
            ) : (
              conversations.map((c) => {
                const f = c.participants.find((p) => p._id !== userAuth?._id);
                return renderUserItem(f, () => setActiveChat(c), c.lastMessage);
              })
            )}
            {!isFriendLoading && friendsWithoutConvo.length > 0 && (
              <>
                <h3 className="text-xs uppercase font-semibold text-gray-500 mt-3 px-3">
                  Friends
                </h3>
                {friendsWithoutConvo.map((f) => (
                  <div
                    key={f._id}
                    className="flex items-center gap-3 p-3 hover:bg-blue-50"
                  >
                    {renderUserItem(f)}
                    <button
                      onClick={() => handleStartChat(f._id)}
                      className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      <FiMessageCircle size={16} />
                    </button>
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>
    </aside>
  );
}
