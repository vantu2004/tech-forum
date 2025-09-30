import { useParams } from "react-router-dom";
import ProfileInfoCard from "../../components/common/ProfileInfoCard";
import SuggestionCard from "../../components/common/SuggestionCard";
import PostItem from "../../components/feed/feed_content/PostItem";

const AllActivities = () => {
  // lấy id từ URL
  const { id } = useParams();
  console.log(id);

  return (
    <div className="container mx-auto max-w-7xl px-6 sm:px-6 lg:px-6 flex gap-6 mt-20 mb-6">
      {/* Left Sidebar */}
      <div className="hidden lg:block w-1/4">
        <ProfileInfoCard />
      </div>

      {/* Middle Feed */}
      <div className="flex-1 max-w-2xl">
        <h2 className="text-xl font-semibold mb-4 text-black">All Posted</h2>
        <PostItem />
      </div>

      {/* Right Sidebar */}
      <div className="hidden lg:block w-1/4">
        <SuggestionCard />
      </div>
    </div>
  );
};

export default AllActivities;
