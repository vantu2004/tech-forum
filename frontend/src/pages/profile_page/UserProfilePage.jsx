import SuggestionCard from "../../components/common/SuggestionCard";
import ProfileContent from "../../components/user_profile/ProfileContent";
import { useParams } from "react-router-dom";
import { useState } from "react";
import PostedModal from "../../components/modal/PostedModal.jsx";
import ImageViewerModal from "../../components/modal/ImageViewerModal.jsx";
import { useEffect } from "react";
import { useUserProfileStore } from "../../stores/useUserProfileStore";
import { useUserExperienceStore } from "../../stores/useUserExperienceStore";
import { usePostStore } from "../../stores/usePostStore";
import { useUserSkillStore } from "../../stores/useUserSkillStore";
import CvModel from "../../components/modal/CvModel.jsx";

const UserProfilePage = () => {
  const { id } = useParams();

  const { userProfileById, fetchUserProfileByUserId } = useUserProfileStore();
  const { fetchUserExperiencesByUserId } = useUserExperienceStore();
  const { fetchUserSkillsByUserId } = useUserSkillStore();
  const { fetchPostsByUserId } = usePostStore();

  useEffect(() => {
    fetchUserProfileByUserId(id);
    fetchUserExperiencesByUserId(id);
    fetchUserSkillsByUserId(id);
    fetchPostsByUserId(id);
  }, [
    id,
    fetchUserProfileByUserId,
    fetchUserExperiencesByUserId,
    fetchUserSkillsByUserId,
    fetchPostsByUserId,
  ]);

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
  const [openCvModel, setOpenCvModel] = useState(false);

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

  const handleOpenCvModel = () => {
    setOpenCvModel(true);
  };

  return (
    <div className="container mx-auto max-w-7xl px-6 sm:px-6 lg:px-6 flex gap-6 mt-20 mb-6 text-black">
      <div className="flex-1">
        <ProfileContent
          id={id}
          onOpenPostedModal={handleOpenPostedModal}
          onOpenCvModel={handleOpenCvModel}
        />
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

      {openCvModel && (
        <CvModel
          onClose={() => setOpenCvModel(false)}
          cv={userProfileById?.defaultResume}
        />
      )}
    </div>
  );
};

export default UserProfilePage;
