import { useState } from "react";

const ShowMoreText = ({ text = "", maxWords = 20 }) => {
  const [expanded, setExpanded] = useState(false);
  const words = text.split(" ");
  const showSeeMore = words.length > maxWords;

  const displayText = expanded
    ? text
    : words.slice(0, maxWords).join(" ") + (showSeeMore ? "..." : "");

  return (
    <p className="text-gray-700 text-sm mb-2">
      {displayText}{" "}
      {showSeeMore && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="text-blue-600 font-medium text-xs hover:underline"
        >
          {expanded ? "See less" : "See more"}
        </button>
      )}
    </p>
  );
};

export default ShowMoreText;
