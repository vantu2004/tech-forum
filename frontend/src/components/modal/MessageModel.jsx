// src/components/common/MessageModal.jsx
import { useState } from "react";
import Modal from "./Modal";
import { FiSend } from "react-icons/fi";
import logo from "../../assets/navbar/logo.png";

const MessageModal = ({ onClose, user }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    console.log("Message sent:", { to: user.name, message });
    setMessage("");
    onClose();
  };

  return (
    <Modal onClose={onClose} size="max-w-md">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5 border-b pb-3">
        <img
          src={logo}
          alt="avatar"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h2 className="text-lg font-bold text-gray-800">"Nguyễn Văn A"</h2>
          <p className="text-sm text-gray-500">
            Fullstack Developer | MERN Stack | Open Source Contributor
          </p>
        </div>
      </div>

      {/* Message box */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Your Message
        </label>
        <textarea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSend}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          <FiSend size={18} />
          Send
        </button>
      </div>
    </Modal>
  );
};

export default MessageModal;
