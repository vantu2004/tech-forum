import LeftSidebar from "../../components/feed/LeftSidebar.jsx";
import FeedContent from "../../components/feed/feed_content/FeedContent.jsx";
import RightSidebar from "../../components/feed/RightSidebar.jsx";
import { useState } from "react";
import PostModal from "../../components/modal/PostModal.jsx";

const FeedPage = () => {
  const [openPostModal, setOpenPostModal] = useState(false);

  const handleOpenPostModal = () => {
    setOpenPostModal(!openPostModal);
  };

  return (
    <div className="container mx-auto max-w-7xl px-6 sm:px-6 lg:px-6 flex gap-6 mt-20 mb-6">
      {/* Left Sidebar */}
      <div className="hidden lg:block w-1/4">
        <LeftSidebar />
      </div>

      {/* Middle Feed */}
      <div className="flex-1 max-w-2xl">
        <FeedContent onOpenPostModal={handleOpenPostModal} />
      </div>

      {/* Right Sidebar */}
      <div className="hidden lg:block w-1/4">
        <RightSidebar />
      </div>

      {/* modal ko nên đặt trong component */}
      {openPostModal && <PostModal onClose={handleOpenPostModal} />}
    </div>
  );
};

export default FeedPage;
