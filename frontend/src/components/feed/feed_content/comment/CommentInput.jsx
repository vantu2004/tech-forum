import { useState } from "react";
import { FiImage, FiSend, FiX } from "react-icons/fi";
import { useCommentStore } from "../../../../stores/useCommentStore";
import { FaCircleUser } from "react-icons/fa6";
import { useUserProfileStore } from "../../../../stores/useUserProfileStore";

const CommentInput = ({ post, parentId = null }) => {
  const { userProfile } = useUserProfileStore();
  const { isLoading, createComment } = useCommentStore();

  const [text, setText] = useState("");
  const [imageFile, setImageFile] = useState(null); // base64

  const handlePickImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImageFile(reader.result);
    reader.readAsDataURL(file);
  };

  const clearImage = () => setImageFile(null);

  const canSend = (text.trim().length > 0 || !!imageFile) && !!post?._id;

  const handleSend = async () => {
    if (!canSend || isLoading) return;
    try {
      await createComment({
        postId: post._id,
        text: text.trim(),
        image: imageFile,
        parentId,
      });
      setText("");
      clearImage();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2 mt-2 mb-4 text-gray-500">
        {userProfile?.profile_pic ? (
          <img
            src={userProfile?.profile_pic}
            alt="me"
            className="w-9 h-9 rounded-full object-cover"
          />
        ) : (
          <FaCircleUser className="w-9 h-9 rounded-full text-gray-400" />
        )}

        <div className="flex items-center flex-1 border border-gray-300 rounded-full px-3 py-2">
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 text-sm outline-none bg-transparent"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isLoading}
          />

          <label
            className={`p-1 ${
              imageFile
                ? "opacity-50 pointer-events-none"
                : "hover:text-blue-600"
            } cursor-pointer`}
          >
            <FiImage className="w-5 h-5" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePickImage}
              disabled={isLoading || !!imageFile}
            />
          </label>

          <button
            type="button"
            onClick={handleSend}
            className={`p-1 ${
              canSend ? "hover:text-blue-600" : "opacity-50 cursor-not-allowed"
            }`}
            disabled={!canSend || isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              <FiSend className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {imageFile && (
        <div className="mb-3 relative inline-block">
          <img
            src={imageFile}
            alt="preview"
            className="max-h-36 rounded-lg border object-contain"
          />
          <button
            type="button"
            onClick={clearImage}
            className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100 text-gray-600"
            title="Remove"
            disabled={isLoading}
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>
      )}
    </>
  );
};

export default CommentInput;
