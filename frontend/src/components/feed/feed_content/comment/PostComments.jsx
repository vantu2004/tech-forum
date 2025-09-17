import { useEffect, useMemo } from "react";
import { useUserProfileStore } from "../../../../stores/useUserProfileStore";
import { useCommentStore } from "../../../../stores/useCommentStore";
import PostCommentItem from "./PostCommentItem";
import CommentInput from "./CommentInput";
import CommentSortBar from "./CommentSortBar";
import { buildCommentTree } from "../../../../utils/buildCommentTree";

const PostComments = ({ show, onToggleShow, post }) => {
  const { userProfile } = useUserProfileStore();
  const { isLoading, fetchComments, comments } = useCommentStore();

  useEffect(() => {
    if (!post?._id || !show) return;
    fetchComments(post._id);
  }, [show, fetchComments, post?._id]);

  const commentTree = useMemo(
    () => buildCommentTree(comments ?? []),
    [comments]
  );

  return (
    <div className="mt-3">
      <CommentInput post={post} userProfile={userProfile} />
      <CommentSortBar
        isLoading={isLoading}
        onToggleShow={onToggleShow}
        show={show}
      />

      {show && (
        <div className={isLoading ? "opacity-50 pointer-events-none" : ""}>
          {isLoading && (
            <div className="flex items-center gap-2 text-gray-500 mb-2">
              <span className="loading loading-spinner loading-sm" />
              <span className="text-sm">Loading comments...</span>
            </div>
          )}

          <div className="space-y-4">
            {commentTree.map((c) => (
              <PostCommentItem key={String(c._id)} comment={c} depth={0} />
            ))}
          </div>

          {Array.isArray(comments) && comments.length > 5 && (
            <button
              type="button"
              className="flex items-center gap-2 text-sm text-gray-600 hover:underline mt-4 disabled:opacity-50"
              disabled={isLoading}
            >
              ↩ Load more comments
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PostComments;
