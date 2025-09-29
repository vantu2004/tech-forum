import Modal from "./Modal";
import PostItem from "../feed/feed_content/PostItem";

const PostedModal = ({ onClose, post, onOpenImageViewer }) => {
  return (
    <Modal onClose={onClose} size="max-w-2xl">
      <PostItem post={post} onOpenImageViewer={onOpenImageViewer} />
    </Modal>
  );
};

export default PostedModal;
