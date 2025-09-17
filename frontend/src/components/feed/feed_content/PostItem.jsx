import { useState, useMemo } from "react";
import { FiThumbsUp, FiMessageCircle, FiShare2 } from "react-icons/fi";
import { FaCircleUser } from "react-icons/fa6";
import { formatDate } from "../../../utils/date.js";
import MediaGrid from "../../common/MediaGrid.jsx";
import { usePostStore } from "../../../stores/usePostStore";
import { useUserAuthStore } from "../../../stores/useUserAuthStore.js";
import PostComments from "./comment/PostComments";

const PostItem = ({ post, onOpenImageViewer }) => {
  const [expanded, setExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const { userAuth } = useUserAuthStore();
  const { likePost } = usePostStore();

  // Tính đúng isLiked cho mọi kiểu likes (ObjectId hoặc object đã populate)
  const isLikedComputed = useMemo(() => {
    const likes = post?.likes ?? [];
    const uid = userAuth?._id;
    if (!uid) return false;
    return likes.some((like) => String(like?._id ?? like) === String(uid));
  }, [post.likes, userAuth?._id]);

  const [isLiked, setIsLiked] = useState(isLikedComputed);
  const [likeCount, setLikeCount] = useState(post.likes.length);

  // Đồng bộ lại nếu props thay đổi (trường hợp store cập nhật post)
  useMemo(() => {
    setIsLiked(isLikedComputed);
    setLikeCount(post.likes.length);
  }, [isLikedComputed, post.likes.length]);

  const text = post.desc || "";
  const maxWords = 20;
  const words = text.split(" ");
  const showSeeMore = words.length > maxWords;
  const displayText = expanded
    ? text
    : words.slice(0, maxWords).join(" ") + (showSeeMore ? "..." : "");

  const userName = post?.userId?.profile?.name ?? "Unknown";
  const userHeadline = post?.userId?.profile?.headline ?? ""; // fix typo: headline
  const userAvatar = post?.userId?.profile?.profile_pic;

  const handleToggleLike = async () => {
    // Optimistic UI
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));

    try {
      await likePost(post._id);
      // store nên replace post theo _id → UI vẫn giữ state, không remount
    } catch (err) {
      // rollback
      setIsLiked(isLikedComputed);
      setLikeCount(post.likes.length);
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        {userAvatar ? (
          <img src={userAvatar} alt="User" className="w-10 h-10 rounded-full" />
        ) : (
          <FaCircleUser className="w-10 h-10 rounded-full text-gray-400" />
        )}
        <div>
          <h3 className="font-semibold text-gray-800">{userName}</h3>
          <p className="text-xs text-gray-500">
            {userHeadline ? `${userHeadline} - ` : ""}Created at{" "}
            {formatDate(post.createdAt)}
          </p>
        </div>
      </div>

      {/* Nội dung */}
      <p className="text-sm text-gray-700 mb-2">
        {displayText}{" "}
        {showSeeMore && (
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="text-blue-600 font-medium text-xs hover:underline"
          >
            {expanded ? "See less" : "See more"}
          </button>
        )}
      </p>

      {/* Media */}
      <MediaGrid
        images={post.images}
        onOpenImage={(idx) => onOpenImageViewer?.(post.images, idx, post)}
      />

      {/* Actions */}
      <div className="flex justify-between text-gray-300 text-sm border-t pt-2">
        <button
          type="button"
          onClick={handleToggleLike}
          className={`flex items-center gap-1 ${
            isLiked ? "text-blue-600" : "text-gray-600"
          } hover:text-blue-600`}
        >
          <FiThumbsUp />
          <span>
            {likeCount <= 1 ? `${likeCount} Like` : `${likeCount} Likes`}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1 hover:text-blue-600 text-gray-600"
        >
          <FiMessageCircle /> <span>{post.comments}</span>
        </button>

        <button
          type="button"
          className="flex items-center gap-1 hover:text-blue-600 text-gray-600"
        >
          <FiShare2 /> <span>12</span>
        </button>
      </div>

      {/* Comments (đã tách file) */}
      <PostComments
        show={showComments}
        onToggleShow={() => setShowComments((s) => !s)}
        post={post}
      />
    </div>
  );
};

export default PostItem;
