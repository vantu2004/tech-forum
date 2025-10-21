import SuggestionCard from "../../components/common/SuggestionCard";
import ProfileContent from "../../components/user_profile/ProfileContent";
import { useParams } from "react-router-dom";

const UserProfilePage = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto max-w-7xl px-6 sm:px-6 lg:px-6 flex gap-6 mt-20 mb-6 text-black">
      <div className="flex-1">
        <ProfileContent id={id} />
      </div>
      <div className="hidden lg:block w-1/4">
        <SuggestionCard />
      </div>
    </div>
  );
};

export default UserProfilePage;
