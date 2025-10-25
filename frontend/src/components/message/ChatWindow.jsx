import { FiMoreVertical, FiArrowLeft, FiUser } from "react-icons/fi";
import { useEffect } from "react";
import { useMessageStore } from "../../stores/useMessageStore.js";
import { useUserProfileStore } from "../../stores/useUserProfileStore.js";
import ChatInput from "./ChatInput.jsx";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useUserAuthStore } from "../../stores/useUserAuthStore.js";

const ChatWindow = ({ activeChat, setActiveChat }) => {
  const { userProfile, fetchUserProfile } = useUserProfileStore();
  const {
    messages,
    isFetchLoading,
    fetchMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useMessageStore();

  const { onlineUsers } = useUserAuthStore();

  // scroll to bottom khi có tin nhắn mới
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchUserProfile();

    if (activeChat?._id) {
      fetchMessages(activeChat._id);
      subscribeToMessages(activeChat._id); // ✅ truyền conversationId
    }

    return () => {
      if (activeChat?._id) {
        unsubscribeFromMessages(activeChat._id);
      }
    };
  }, [
    activeChat,
    fetchUserProfile,
    fetchMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  // Tự động scroll khi messages thay đổi
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Tìm người bạn còn lại (trong participants)
  const friend =
    activeChat?.participants?.find((p) => p._id !== userProfile?.userId) ||
    null;

  return (
    <section
      className={`flex-1 flex flex-col bg-gradient-to-b from-gray-50 to-white w-full ${
        !activeChat ? "hidden md:flex" : "flex"
      }`}
    >
      {activeChat ? (
        <>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
            <div className="flex items-center gap-3">
              {/* Nút back (mobile) */}
              <button
                className="md:hidden p-1 mr-2 rounded hover:bg-gray-100"
                onClick={() => setActiveChat(null)}
              >
                <FiArrowLeft size={20} />
              </button>

              {/* Avatar bạn bè + viền xanh khi online */}
              {friend?.profile?.profile_pic ? (
                <img
                  src={friend.profile.profile_pic}
                  alt={friend.profile?.name}
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-full object-cover ring-2 ${
                    onlineUsers.includes(friend._id)
                      ? "ring-green-400"
                      : "ring-blue-100"
                  }`}
                />
              ) : (
                <div
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-gray-100 ring-2 ${
                    onlineUsers.includes(friend._id)
                      ? "ring-green-400"
                      : "ring-blue-100"
                  }`}
                >
                  <FiUser className="text-gray-500 text-xl" />
                </div>
              )}

              <div>
                <Link to={`/profile/user/${friend._id}`}>
                  <p className="font-semibold text-gray-800 text-sm md:text-base hover:text-blue-600 transition">
                    {friend?.profile?.name || "Unknown"}
                  </p>
                </Link>
                <div className="flex items-center gap-1">
                  <p className="text-xs text-gray-500 truncate max-w-[160px]">
                    {friend?.profile?.headline}
                  </p>

                  {/* Chữ “Online” nhỏ, mờ */}
                  {onlineUsers.includes(friend._id) && (
                    <span className="text-[11px] text-green-500 font-medium ml-1">
                      ● Online
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 md:p-6 space-y-4">
            {isFetchLoading ? (
              <div className="text-gray-500 text-sm">Loading messages...</div>
            ) : messages.length === 0 ? (
              <div className="text-gray-400 text-sm text-center mt-6">
                No messages yet
              </div>
            ) : (
              <>
                {messages.map((msg) => {
                  const isMine = msg.senderId._id === userProfile?.userId;
                  return (
                    <div
                      key={msg._id}
                      className={`flex items-start gap-2 ${
                        isMine ? "justify-end" : ""
                      }`}
                    >
                      {/* Avatar của người gửi */}
                      {!isMine && (
                        <>
                          {msg.senderId.profile?.profile_pic ? (
                            <img
                              src={msg.senderId.profile.profile_pic}
                              alt={msg.senderId.profile?.name}
                              className="w-7 h-7 md:w-8 md:h-8 rounded-full object-cover"
                            />
                          ) : (
                            <div className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full bg-gray-200 flex items-center justify-center">
                              <FiUser className="text-gray-500 text-sm" />
                            </div>
                          )}
                        </>
                      )}

                      {/* Nội dung tin nhắn */}
                      <div
                        className={`flex flex-col ${
                          isMine ? "items-end" : "items-start"
                        }`}
                      >
                        {/* Nếu có ảnh */}
                        {msg.picture && (
                          <img
                            src={msg.picture}
                            alt="message"
                            className="max-w-xs md:max-w-sm rounded-xl border border-gray-200 shadow-sm"
                          />
                        )}

                        {/* Nếu có text */}
                        {msg.message && (
                          <div
                            className={`mt-1 max-w-[100%] p-2 md:p-3 rounded-2xl shadow text-sm md:text-base border border-gray-100 ${
                              isMine
                                ? "bg-blue-600 text-white rounded-br-none"
                                : "bg-white text-gray-700 rounded-bl-none"
                            }`}
                          >
                            {msg.message}
                          </div>
                        )}
                      </div>

                      {/* Avatar của mình */}
                      {isMine && (
                        <>
                          {userProfile?.profile_pic ? (
                            <img
                              src={userProfile.profile_pic}
                              alt="Me"
                              className="w-7 h-7 md:w-8 md:h-8 rounded-full object-cover"
                            />
                          ) : (
                            <div className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full bg-gray-200 flex items-center justify-center">
                              <FiUser className="text-gray-500 text-sm" />
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input */}
          <ChatInput activeChat={activeChat} />
        </>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center text-gray-400">
          Select a conversation to start chatting
        </div>
      )}
    </section>
  );
};

export default ChatWindow;
