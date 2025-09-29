import ProfileInfoCard from "../../components/common/ProfileInfoCard";
import SuggestionCard from "../../components/common/SuggestionCard";
import PostItem from "../../components/feed/feed_content/PostItem";
import { useEffect, useState } from "react";
import ImageViewerModal from "../../components/modal/ImageViewerModal.jsx";
import { usePostStore } from "../../stores/usePostStore.js";
import { useUserProfileStore } from "../../stores/useUserProfileStore.js";

const AllActivities = () => {
  const { isLoading: profileLoading, userProfile } = useUserProfileStore();
  const { isLoading, posts, getPostsByUser } = usePostStore();

  useEffect(() => {
    getPostsByUser();
  }, [getPostsByUser]);

  // gom tất cả data viewer vào 1 state
  const [viewer, setViewer] = useState({
    open: false,
    images: [],
    initialIndex: 0,
    post: null,
  });

  // nhận images, index được click, và post
  const openImageViewer = (images = [], initialIndex = 0, post = null) =>
    setViewer({ open: true, images, initialIndex, post });

  const closeImageViewer = () => setViewer((v) => ({ ...v, open: false }));

  return (
    <div className="container mx-auto max-w-7xl px-6 sm:px-6 lg:px-6 flex gap-6 mt-20 mb-6">
      {/* Left Sidebar */}
      <div className="hidden lg:block w-1/4">
        <ProfileInfoCard isLoading={profileLoading} userProfile={userProfile} />
      </div>

      {/* Middle Feed */}
      <div className="flex-1 max-w-2xl">
        <h2 className="text-xl font-semibold mb-4 text-black">All Posted</h2>
        {isLoading ? (
          <p className="text-gray-400 text-sm">Loading...</p>
        ) : posts.length === 0 ? (
          <p className="text-gray-400 text-sm">No activities yet</p>
        ) : (
          posts.map((post) => (
            <div className="mb-4" key={post._id}>
              <PostItem post={post} onOpenImageViewer={openImageViewer} />
            </div>
          ))
        )}
      </div>

      {/* Right Sidebar */}
      <div className="hidden lg:block w-1/4">
        <SuggestionCard />
      </div>

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

export default AllActivities;
