import { FiMoreVertical, FiSend, FiPaperclip, FiSmile } from "react-icons/fi";
import { FiArrowLeft } from "react-icons/fi";

const MessageContentChatWindow = ({ activeChat, setActiveChat, chats }) => {
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
              {/* Nút back chỉ hiện ở mobile */}
              <button
                className="md:hidden p-1 mr-2 rounded hover:bg-gray-100"
                onClick={() => setActiveChat(null)}
              >
                <FiArrowLeft size={20} />
              </button>
              <img
                src={activeChat.avatar}
                alt={activeChat.name}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full ring-2 ring-blue-100"
              />
              <div>
                <p className="font-semibold text-gray-800 text-sm md:text-base">
                  {activeChat.name}
                </p>
                <p className="text-xs text-gray-500">{activeChat.title}</p>
              </div>
            </div>
            <button className="p-1 rounded hover:bg-gray-100">
              <FiMoreVertical />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 md:p-6 space-y-4">
            <div className="flex items-start gap-2">
              <img
                src={activeChat.avatar}
                alt="sender"
                className="w-7 h-7 md:w-8 md:h-8 rounded-full"
              />
              <div className="max-w-[75%] bg-white p-2 md:p-3 rounded-2xl shadow text-gray-700 border border-gray-100 text-sm md:text-base">
                Hello! How are you?
              </div>
            </div>

            <div className="flex justify-end items-start gap-2">
              <div className="max-w-[75%] bg-blue-600 text-white p-2 md:p-3 rounded-2xl shadow text-sm md:text-base">
                I’m doing well, thanks! What about you?
              </div>
              <img
                src={chats[1].avatar}
                alt="me"
                className="w-7 h-7 md:w-8 md:h-8 rounded-full"
              />
            </div>
          </div>

          {/* Input */}
          <div className="p-3 md:p-4 border-t border-gray-100 bg-white flex items-center gap-2 md:gap-3">
            <button className="text-gray-500 hover:text-gray-700">
              <FiSmile size={18} />
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <FiPaperclip size={18} />
            </button>
            <input
              type="text"
              placeholder="Write a message..."
              className="flex-1 border border-gray-200 rounded-full px-3 md:px-4 py-1.5 md:py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
            <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition">
              <FiSend size={16} />
            </button>
          </div>
        </>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center text-gray-400">
          Select a conversation to start chatting
        </div>
      )}
    </section>
  );
};

export default MessageContentChatWindow;
