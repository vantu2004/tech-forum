import Suggestion from "../common/SuggestionCard";

const RightSidebar = () => {
  return (
    <div className="space-y-4 sticky top-20">
      {/* News */}
      <div className="bg-white border rounded-lg shadow-sm p-4 ">
        <h3 className="font-semibold text-gray-800 mb-2">LinkedIn News</h3>
        <ul className="text-sm space-y-1 text-gray-600">
          <li>Buffett to remain Berkshire chair</li>
          <li>Foreign investments surge again</li>
        </ul>
      </div>

      <Suggestion />
    </div>
  );
};

export default RightSidebar;
