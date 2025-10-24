import { FaCircleUser } from "react-icons/fa6";
import { useState, useMemo, useEffect } from "react";
import { useUserAuthStore } from "../../../../stores/useUserAuthStore";
import { useCommentStore } from "../../../../stores/useCommentStore";
import { Link } from "react-router-dom";

const PostCommentItem = ({ comment }) => {
  const profile = comment?.userId?.profile || {};
  const avatar = profile?.profile_pic;
  const name = profile?.name || "User";

  const { userAuth } = useUserAuthStore();
  const { likeDislikeComment } = useCommentStore();

  // Kiểm tra user hiện tại đã like chưa
  const isLikedComputed = useMemo(() => {
    const likes = comment?.likes ?? [];
    const uid = userAuth?._id;
    if (!uid) return false;
    return likes.some((like) => String(like?._id ?? like) === String(uid));
  }, [comment?.likes, userAuth?._id]);

  // Local state để cập nhật UI nhanh
  const [isLiked, setIsLiked] = useState(isLikedComputed);
  const [likeCount, setLikeCount] = useState(comment?.likes?.length || 0);

  useEffect(() => {
    setIsLiked(isLikedComputed);
    setLikeCount(comment?.likes?.length || 0);
  }, [isLikedComputed, comment?.likes?.length]);

  const handleToggleLike = async () => {
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    try {
      await likeDislikeComment(comment._id);
    } catch (err) {
      setIsLiked(isLikedComputed);
      setLikeCount(comment?.likes?.length || 0);
      console.error(err);
    }
  };

  return (
    <div className="mt-2">
      <div className="flex gap-2">
        {/* Avatar */}
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="w-9 h-9 rounded-full object-cover"
          />
        ) : (
          <FaCircleUser className="w-9 h-9 rounded-full text-gray-400" />
        )}

        {/* Nội dung bình luận */}
        <div className="flex-1">
          <div className="rounded-xl px-3 py-2 bg-gray-50">
            <Link
              to={
                comment.userId._id === userAuth._id
                  ? `/profile/${comment.userId._id}`
                  : `/profile/user/${comment.userId._id}`
              }
            >
              <h4 className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition">
                {name}
              </h4>
            </Link>

            {comment?.text && (
              <p className="text-sm text-gray-800 mt-1">{comment.text}</p>
            )}

            {comment?.image && (
              <img
                src={comment.image}
                alt="comment"
                className="mt-2 max-h-56 rounded-lg object-contain"
              />
            )}
          </div>

          {/* Hành động */}
          <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
            <button
              type="button"
              onClick={handleToggleLike}
              className={`hover:underline flex items-center gap-1 ${
                isLiked ? "text-blue-600 font-medium" : ""
              }`}
            >
              {likeCount > 0 && <span>{likeCount}</span>}
              {likeCount <= 1 ? "Like" : "Likes"}
            </button>

            {comment?.createdAt && (
              <span>{new Date(comment.createdAt).toLocaleString()}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCommentItem;
