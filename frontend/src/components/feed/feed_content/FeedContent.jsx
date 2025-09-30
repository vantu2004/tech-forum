import { useEffect } from "react";
import { usePostStore } from "../../../stores/usePostStore";
import PostBox from "./PostBox";
import PostItem from "./PostItem";

const FeedContent = ({ onOpenPostModal, onOpenImageViewer }) => {
  const { fetchPosts, posts, isLoading } = usePostStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="space-y-4">
      <PostBox onOpenPostModal={onOpenPostModal} />

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <span className="loading loading-spinner loading-xl text-blue-300"></span>
        </div>
      ) : (
        posts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            onOpenImageViewer={onOpenImageViewer}
          />
        ))
      )}
    </div>
  );
};

export default FeedContent;
