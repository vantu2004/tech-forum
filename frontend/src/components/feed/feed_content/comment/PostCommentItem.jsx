import { FaCircleUser } from "react-icons/fa6";
import { useState, useMemo, useEffect } from "react";
import { useUserAuthStore } from "../../../../stores/useUserAuthStore";
import { useCommentStore } from "../../../../stores/useCommentStore";
import CommentInput from "./CommentInput";
import { Link } from "react-router-dom";

const INDENT_PX = 24; // khoảng thụt mỗi cấp

const PostCommentItem = ({ comment, depth = 0, parentName = null }) => {
  const profile = comment?.userId?.profile || {};
  const avatar = profile?.profile_pic;
  const name = profile?.name || "User";

  const { userAuth } = useUserAuthStore();
  const { likeDislikeComment } = useCommentStore();

  // user hiện tại đã like chưa?
  const isLikedComputed = useMemo(() => {
    const likes = comment?.likes ?? [];
    const uid = userAuth?._id;
    if (!uid) return false;
    return likes.some((like) => String(like?._id ?? like) === String(uid));
  }, [comment?.likes, userAuth?._id]);

  // Local UI state (optimistic)
  const [isLiked, setIsLiked] = useState(isLikedComputed);
  const [likeCount, setLikeCount] = useState(comment?.likes?.length || 0);

  // Đồng bộ lại khi props thay đổi (ví dụ sau khi phân trang/refresh)
  useEffect(() => {
    setIsLiked(isLikedComputed);
    setLikeCount(comment?.likes?.length || 0);
  }, [isLikedComputed, comment?.likes?.length]);

  const handleToggleLike = async () => {
    // Optimistic UI
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    try {
      await likeDislikeComment(comment._id);
    } catch (err) {
      // rollback nếu lỗi
      setIsLiked(isLikedComputed);
      setLikeCount(comment?.likes?.length || 0);
      console.error(err);
    }
  };

  // Reply box
  const [showReply, setShowReply] = useState(false);
  const toggleReply = () => setShowReply((s) => !s);

  return (
    <div
      className="relative mt-2"
      style={{ marginLeft: depth * INDENT_PX }} // 👈 thụt lề theo depth
    >
      {/* Rail trái cho mọi cấp > 0 */}
      {depth > 0 && (
        <>
          <span className="pointer-events-none absolute -left-3 top-0 bottom-0 border-l border-gray-300" />
          <span className="pointer-events-none absolute -left-3 top-4 h-2 w-2 rounded-full border border-gray-300 bg-white" />
        </>
      )}

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

        {/* Bubble */}
        <div className="flex-1">
          <div className="rounded-xl px-3 py-2 bg-gray-100">
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
              <p className="text-sm text-gray-800 mt-1">
                {depth > 0 && parentName && (
                  <span className="font-semibold text-blue-600">
                    @{parentName}
                  </span>
                )}{" "}
                {comment.text}
              </p>
            )}

            {comment?.image && (
              <img
                src={comment.image}
                alt="comment"
                className="mt-2 max-h-56 rounded-lg object-contain"
              />
            )}
          </div>

          {/* Actions */}
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

            <button
              type="button"
              onClick={toggleReply}
              className="hover:underline"
            >
              {showReply ? "Cancel" : "Reply"}
            </button>

            {comment?.createdAt && (
              <span>{new Date(comment.createdAt).toLocaleString()}</span>
            )}
          </div>

          {/* Reply input box */}
          {showReply && (
            <div className="mt-2">
              {/* 
                Lưu ý: CommentInput hiện gọi createComment({ postId, text, image }).
                Để lưu reply đúng, bạn nên thêm parentId vào createComment ở CommentInput.
              */}
              <CommentInput
                post={{ _id: comment.postId }} // chỉ cần _id
                parentId={comment._id} // truyền xuống để dùng trong createComment
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCommentItem;
