import PostBox from "./PostBox";
import PostItem from "./PostItem";

const FeedContent = ({ onOpenPostModal }) => {
  return (
    <div className="space-y-4">
      <PostBox onOpenPostModal={onOpenPostModal} />
      <PostItem />
    </div>
  );
};

export default FeedContent;
