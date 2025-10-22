import { FiSend, FiUserX, FiShare2, FiFileText } from "react-icons/fi";

const Action = ({ onOpenMessageModal }) => {
  return (
    <div className="flex flex-wrap gap-3 mt-28 justify-center sm:justify-end">
      <button className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 border rounded-full text-gray-700 hover:bg-gray-50 shadow-sm transition">
        <FiFileText />
        <span>View CV</span>
      </button>

      {/* <button className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 border rounded-full text-gray-700 hover:bg-gray-50 shadow-sm transition">
        <FiShare2 />
        <span>Share</span>
      </button> */}

      {/* Message */}
      <button
        onClick={onOpenMessageModal}
        className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-md transition"
      >
        <FiSend />
        <span>Message</span>
      </button>

      {/* Disconnect */}
      <button className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-md transition">
        <FiUserX />
        <span>Disconnect</span>
      </button>
    </div>
  );
};

export default Action;
