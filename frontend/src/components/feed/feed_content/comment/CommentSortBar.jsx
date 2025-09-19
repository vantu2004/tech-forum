import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const CommentSortBar = ({ isLoading, onToggleShow, show, onSortChange }) => {
  const [sortBy, setSortBy] = useState("time");
  const [sortOrder, setSortOrder] = useState("desc");
  const [openSortMenu, setOpenSortMenu] = useState(false);

  const toggleSortOrder = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    onSortChange?.(sortBy, newOrder); // báo ngược lên cha
  };

  const chooseSortBy = (key) => {
    setSortBy(key);
    setSortOrder("desc");
    setOpenSortMenu(false);
    onSortChange?.(key, "desc");
  };

  return (
    <div className="flex items-center justify-between mb-3">
      {/* UI giữ nguyên */}
      <div className="relative">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <button
            type="button"
            onClick={toggleSortOrder}
            className="font-medium hover:underline"
            disabled={isLoading}
          >
            Sort by: {sortBy === "time" ? "Time" : "Likes"}{" "}
            {sortOrder === "asc" ? "↑" : "↓"}
          </button>

          <button
            type="button"
            onClick={() => setOpenSortMenu((s) => !s)}
            className="p-1 hover:text-blue-600"
            disabled={isLoading}
          >
            {openSortMenu ? <FiChevronUp /> : <FiChevronDown />}
          </button>
        </div>

        {openSortMenu && !isLoading && (
          <div className="absolute z-10 mt-2 w-40 bg-white border rounded-md shadow">
            <button
              type="button"
              onClick={() => chooseSortBy("time")}
              className={`w-full text-left px-3 py-2 hover:bg-gray-50 ${
                sortBy === "time"
                  ? "text-blue-600 font-medium"
                  : "text-gray-700"
              }`}
            >
              Time
            </button>
            <button
              type="button"
              onClick={() => chooseSortBy("likes")}
              className={`w-full text-left px-3 py-2 hover:bg-gray-50 ${
                sortBy === "likes"
                  ? "text-blue-600 font-medium"
                  : "text-gray-700"
              }`}
            >
              Likes
            </button>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onToggleShow}
        className="text-sm text-blue-600 hover:underline disabled:opacity-50"
        disabled={isLoading}
      >
        {show ? "Hide comments" : "Show comments"}
      </button>
    </div>
  );
};

export default CommentSortBar;
