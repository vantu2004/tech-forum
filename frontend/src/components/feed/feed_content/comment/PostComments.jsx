import { useEffect, useMemo, useState } from "react";
import { useCommentStore } from "../../../../stores/useCommentStore";
import PostCommentItem from "./PostCommentItem";
import CommentSortBar from "./CommentSortBar";

const PostComments = ({ show, onToggleShow, post }) => {
  const {
    loadingByPost,
    getCommentsPaginated,
    commentsByPost,
    paginationByPost,
  } = useCommentStore();

  const comments = commentsByPost[post._id] || [];
  const isLoading = loadingByPost[post._id] || false;
  const pagination = paginationByPost[post._id] || {};

  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("time"); // mặc định sort theo time
  const [sortOrder, setSortOrder] = useState("desc");
  const limit = 5;

  useEffect(() => {
    if (!post?._id || !show) return;
    setPage(1);
    getCommentsPaginated(post._id, 1, limit, null);
  }, [show, getCommentsPaginated, post?._id]);

  // sort tập comments theo sortBy + sortOrder
  const sortedComments = useMemo(() => {
    if (!comments) return [];
    const arr = [...comments];
    if (sortBy === "time") {
      arr.sort((a, b) =>
        sortOrder === "asc"
          ? new Date(a.createdAt) - new Date(b.createdAt)
          : new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (sortBy === "likes") {
      arr.sort((a, b) =>
        sortOrder === "asc"
          ? a.likes.length - b.likes.length
          : b.likes.length - a.likes.length
      );
    }
    return arr;
  }, [comments, sortBy, sortOrder]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    getCommentsPaginated(post._id, nextPage, limit, null);
  };

  return (
    <div className="mt-3">
      {show && (
        <div className={isLoading ? "opacity-50 pointer-events-none" : ""}>
          {/* Sort Bar */}
          <CommentSortBar
            isLoading={isLoading}
            onToggleShow={onToggleShow}
            show={show}
            onSortChange={(by, order) => {
              setSortBy(by);
              setSortOrder(order);
            }}
          />

          <div className="space-y-4">
            {sortedComments.map((c) => (
              <PostCommentItem key={String(c._id)} comment={c} depth={0} />
            ))}
          </div>

          {pagination?.hasMore && (
            <button
              type="button"
              className="flex items-center gap-2 text-sm text-gray-600 hover:underline mt-4 disabled:opacity-50"
              disabled={isLoading}
              onClick={handleLoadMore}
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
