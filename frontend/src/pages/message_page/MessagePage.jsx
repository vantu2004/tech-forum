import MessageContent from "../../components/message/MessageContent.jsx";
import SuggestionCard from "../../components/common/SuggestionCard.jsx";

const MessagePage = () => {
  return (
    <div className="container mx-auto max-w-7xl px-6 sm:px-6 lg:px-6 flex gap-6 mt-20 mb-6 text-black">
      <div className="flex-1">
        <MessageContent />
      </div>
      <div className="hidden lg:block w-1/4">
        <SuggestionCard />
      </div>
    </div>
  );
};

export default MessagePage;
