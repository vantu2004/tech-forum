import Modal from "./Modal";
import PostItem from "../feed/feed_content/PostItem";

const PostedModal = ({ onClose }) => {
  return (
    <Modal onClose={onClose} size="max-w-2xl">
      <PostItem />
    </Modal>
  );
};

export default PostedModal;
