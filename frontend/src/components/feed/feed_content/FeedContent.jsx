import { useEffect, useRef, useCallback } from "react";
import { usePostStore } from "../../../stores/usePostStore";
import PostBox from "./PostBox";
import PostItem from "./PostItem";
import { useSearchParams } from "react-router-dom";

const FeedContent = ({ onOpenPostModal, onOpenImageViewer }) => {
  const { fetchPosts, searchPosts, posts, isLoading, hasMore, page } =
    usePostStore();
  const observer = useRef();

  const [searchParams] = useSearchParams();
  const query = searchParams.get("search");

  useEffect(() => {
    if (query) {
      searchPosts(query);
    } else {
      fetchPosts(1, 5, false);
    }
  }, [query, fetchPosts, searchPosts]);

  // callback khi observer chạm cuối danh sách
  const lastPostRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchPosts(page + 1, 5, true);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, page, fetchPosts]
  );

  return (
    <div className="space-y-4">
      <PostBox onOpenPostModal={onOpenPostModal} />

      {posts.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">No posts found.</div>
      ) : (
        posts.map((post, index) => {
          const isLast = index === posts.length - 1;
          return (
            <div key={post._id} ref={isLast ? lastPostRef : null}>
              <PostItem post={post} onOpenImageViewer={onOpenImageViewer} />
            </div>
          );
        })
      )}

      {isLoading && (
        <div className="flex justify-center items-center py-6">
          <span className="loading loading-spinner loading-lg text-blue-400"></span>
        </div>
      )}
    </div>
  );
};

export default FeedContent;
