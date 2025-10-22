import SuggestionCard from "../../components/common/SuggestionCard";
import ProfileContent from "../../components/user_profile/ProfileContent";
import { useParams } from "react-router-dom";
import { useState } from "react";
import PostedModal from "../../components/modal/PostedModal.jsx";
import ImageViewerModal from "../../components/modal/ImageViewerModal.jsx";

const UserProfilePage = () => {
  const { id } = useParams();

  // dùng cho việc lưu post khi mở viewer
  const [selectedPost, setSelectedPost] = useState(null);

  // gom tất cả data viewer vào 1 state
  const [viewer, setViewer] = useState({
    open: false,
    images: [],
    initialIndex: 0,
    post: null,
  });

  const [openPostedModal, setOpenPostedModal] = useState(false);

  // nhận images, index được click, và post
  const openImageViewer = (images = [], initialIndex = 0, post = null) =>
    setViewer({ open: true, images, initialIndex, post });

  const closeImageViewer = () => setViewer((v) => ({ ...v, open: false }));

  const handleOpenPostedModal = (post = null) => {
    setSelectedPost(post);
    setOpenPostedModal(true);
  };

  const handleClosePostedModal = () => {
    setSelectedPost(null);
    setOpenPostedModal(false);
  };

  return (
    <div className="container mx-auto max-w-7xl px-6 sm:px-6 lg:px-6 flex gap-6 mt-20 mb-6 text-black">
      <div className="flex-1">
        <ProfileContent id={id} onOpenPostedModal={handleOpenPostedModal} />
      </div>
      <div className="hidden lg:block w-1/4">
        <SuggestionCard />
      </div>

      {openPostedModal && (
        <PostedModal
          onClose={handleClosePostedModal}
          post={selectedPost}
          onOpenImageViewer={openImageViewer}
        />
      )}

      {viewer.open && (
        <ImageViewerModal
          images={viewer.images}
          initialIndex={viewer.initialIndex}
          onClose={closeImageViewer}
          title="Post photos"
          loop
        />
      )}
    </div>
  );
};

export default UserProfilePage;
