import { useState } from "react";
import {
  FiThumbsUp,
  FiMessageCircle,
  FiShare2,
  FiImage,
  FiSend,
} from "react-icons/fi";
import logo from "../../../assets/navbar/logo.png";
import { FaCircleUser } from "react-icons/fa6";
import { formatDate } from "../../../utils/date.js";
import MediaGrid from "../../common/MediaGrid.jsx";

const PostItem = ({ post, onOpenImageViewer }) => {
  const [expanded, setExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const text = post.desc;

  const maxWords = 20; // giới hạn số từ
  const words = text.split(" ");
  const showSeeMore = words.length > maxWords;

  const displayText = expanded
    ? text
    : words.slice(0, maxWords).join(" ") + (showSeeMore ? "..." : "");

  const userName = post.userId.profile.name;
  const userHeadline = post.userId.profile.healine;
  const userAvatar = post.userId.profile.profile_pic;

  const [comments] = useState([
    {
      id: 1,
      name: "Hrishikrishnan R Menon",
      title:
        "Lawyer - High Court of Kerala / CRM - Team Lead / Business setup advisor",
      avatar: logo,
      time: "56s",
      text: "The opportunity to set your own rates on Preply is an excellent feature for tutors seeking more control over their earnings",
    },
    {
      id: 2,
      name: "POOJA RAINA",
      title: "Building Personal Brands That Attract, Not Chase",
      avatar: logo,
      time: "16m",
      text: "This is a great selection of remote work opportunities. Very helpful list",
      verified: true,
    },
  ]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        {userAvatar ? (
          <img src={userAvatar} alt="User" className="w-10 h-10 rounded-full" />
        ) : (
          <FaCircleUser className="w-10 h-10 rounded-full text-gray-400" />
        )}
        <div>
          <h3 className="font-semibold text-gray-800">{userName}</h3>
          <p className="text-xs text-gray-500">
            {userHeadline ? `${userHeadline} - ` : ""}Created at{" "}
            {formatDate(post.createdAt)}
          </p>
        </div>
      </div>

      {/* Nội dung */}
      <p className="text-sm text-gray-700 mb-2">
        {displayText}{" "}
        {showSeeMore && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-blue-600 font-medium text-xs hover:underline"
          >
            {expanded ? "See less" : "See more"}
          </button>
        )}
      </p>

      {/* Media */}
      <MediaGrid
        images={post.images}
        onOpenImage={(idx) => onOpenImageViewer?.(post.images, idx, post)} // 👈 truyền đủ data
      />

      {/* Actions */}
      <div className="flex justify-between text-gray-600 text-sm border-t pt-2">
        <button className="flex items-center gap-1 hover:text-blue-600">
          <FiThumbsUp /> <span>{post.likes.length}</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1 hover:text-blue-600"
        >
          <FiMessageCircle /> <span>{post.comments}</span>
        </button>
        <button className="flex items-center gap-1 hover:text-blue-600">
          <FiShare2 /> <span>12</span>
        </button>
      </div>

      {/* Comments Section */}
      <div className="mt-3">
        {/* Ô nhập comment */}
        <div className="flex items-center gap-2 mb-4 text-gray-500">
          {/* Avatar */}
          <img src={logo} alt="me" className="w-9 h-9 rounded-full" />

          {/* Input + nút */}
          <div className="flex items-center flex-1 border rounded-full px-3 py-2">
            <input
              type="text"
              placeholder="Add a comment..."
              className="flex-1 text-sm outline-none bg-transparent"
            />

            {/* Upload image */}
            <button className="p-1 hover:text-blue-600">
              <FiImage className="w-5 h-5" />
            </button>

            {/* Send */}
            <button className="p-1 hover:text-blue-600">
              <FiSend className="w-5 h-5" />
            </button>
          </div>
        </div>

        {showComments && (
          <div>
            {/* Dropdown giả lập Most relevant */}
            <div className="text-sm text-gray-500 mb-3">Most relevant ▼</div>

            {/* Danh sách comment */}
            <div className="space-y-4">
              {comments.map((c) => (
                <div key={c.id} className="flex gap-2">
                  <img
                    src={c.avatar}
                    alt={c.name}
                    className="w-9 h-9 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-xl px-3 py-2">
                      <h4 className="text-sm font-semibold text-gray-800 flex items-center gap-1">
                        {c.name}
                        {c.verified && (
                          <span className="text-blue-600 font-bold">✔</span>
                        )}
                      </h4>
                      <p className="text-xs text-gray-500">{c.title}</p>
                      <p className="text-sm text-gray-800 mt-1">{c.text}</p>
                    </div>
                    {/* Like - Reply */}
                    <div className="flex gap-4 text-xs text-gray-500 mt-1">
                      <button className="hover:underline">Like</button>
                      <button className="hover:underline">Reply</button>
                      <span>{c.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load more */}
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:underline mt-4">
              ↩ Load more comments
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostItem;
