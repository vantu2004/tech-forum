import { useState, useRef } from "react";
import { FiSmile, FiPaperclip, FiSend, FiX } from "react-icons/fi";
import { useMessageStore } from "../../stores/useMessageStore.js";

const ChatInput = ({ activeChat }) => {
  console.log(activeChat);
  const { sendMessage, isSendLoading } = useMessageStore();

  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  // Chọn ảnh
  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  // Gửi tin nhắn
  const handleSend = async () => {
    if (isSendLoading) return; // chặn spam gửi khi đang gửi
    if ((!message.trim() && !image) || !activeChat?._id) return;

    try {
      let pictureBase64 = null;

      // Nếu có ảnh => chuyển sang base64
      if (image) {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        pictureBase64 = await new Promise((resolve) => {
          reader.onloadend = () => resolve(reader.result);
        });
      }

      await sendMessage({
        conversationId: activeChat._id,
        message: message.trim(),
        picture: pictureBase64,
      });

      // reset input
      setMessage("");
      setImage(null);
      setPreviewUrl(null);
      fileInputRef.current.value = null;
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="p-3 md:p-4 border-t border-gray-100 bg-white flex flex-col gap-2">
      {/* Preview ảnh */}
      {previewUrl && (
        <div className="relative self-start">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-24 h-24 object-cover rounded-lg border border-gray-200"
          />
          <button
            onClick={() => {
              setPreviewUrl(null);
              setImage(null);
              fileInputRef.current.value = null;
            }}
            className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-black/70"
          >
            <FiX size={14} />
          </button>
        </div>
      )}

      {/* Thanh nhập tin */}
      <div className="flex items-center gap-2 md:gap-3">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleSelectImage}
        />
        <button
          className={`text-gray-500 hover:text-gray-700 ${
            isSendLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => !isSendLoading && fileInputRef.current.click()}
          disabled={isSendLoading}
        >
          <FiPaperclip size={18} />
        </button>

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write a message..."
          className="flex-1 border border-gray-200 rounded-full px-3 md:px-4 py-1.5 md:py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          disabled={isSendLoading}
        />

        <button
          onClick={handleSend}
          disabled={
            isSendLoading || (!message.trim() && !image) || !activeChat?._id
          }
          className={`p-2 rounded-full transition ${
            isSendLoading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {isSendLoading ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin block mx-auto"></span>
          ) : (
            <FiSend size={16} />
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
