import logo from "../../../assets/navbar/logo.png";
import { FiVideo, FiImage, FiFileText } from "react-icons/fi";

const PostBox = ({ onOpenPostModal }) => {
  return (
    <div className="bg-white border rounded-lg shadow-sm p-4">
      {/* Open modal */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="User" className="w-10 h-10 rounded-full" />
        <button
          onClick={onOpenPostModal}
          className="flex-1 border rounded-full px-4 py-2 text-sm text-gray-500 text-left hover:bg-gray-50 focus:outline-none"
        >
          Start a post
        </button>
      </div>

      {/* Actions */}
      <div className="flex justify-around mt-3 text-sm text-gray-600">
        <button
          onClick={onOpenPostModal}
          className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded"
        >
          <FiVideo className="text-red-500 text-lg" />
          Video
        </button>
        <button
          onClick={onOpenPostModal}
          className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded"
        >
          <FiImage className="text-green-500 text-lg" />
          Photo
        </button>
        <button
          onClick={onOpenPostModal}
          className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded"
        >
          <FiFileText className="text-blue-500 text-lg" />
          Article
        </button>
      </div>
    </div>
  );
};

export default PostBox;
