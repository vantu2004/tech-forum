import { FiThumbsUp, FiMessageCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import { usePostStore } from "../../stores/usePostStore";
import { useUserAuthStore } from "../../stores/useUserAuthStore"; // lấy user hiện tại
import { formatDate } from "../../utils/date";
import ShowMoreText from "../common/ShowMoreText.jsx";

const Activity = ({ id, onOpenPostedModal }) => {
  const { isLoading, posts } = usePostStore();
  const { userAuth } = useUserAuthStore();

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Activities</h2>

      {isLoading ? (
        <p className="text-gray-400 text-sm">Loading...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-400 text-sm">No activities yet</p>
      ) : (
        <div className="flex gap-5 overflow-x-auto pb-3">
          {posts.map((post) => {
            const uid = userAuth?._id;
            const isLiked = uid
              ? post.likes.some(
                  (like) => String(like?._id ?? like) === String(uid)
                )
              : false;

            return (
              <div
                onClick={() => onOpenPostedModal(post)}
                key={post._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md min-w-[calc(50%-0.5rem)] max-w-[calc(50%-0.5rem)] flex-shrink-0 transition hover:bg-gray-100 cursor-pointer"
              >
                {/* Header */}
                <div className="flex items-center gap-3 p-4 border-b border-gray-200">
                  <img
                    src={post.userId.profile.profile_pic}
                    className="w-11 h-11 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-sm">
                      {post.userId.profile.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {formatDate(post.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <ShowMoreText text={post.desc || ""} maxWords={20} />
                  {Array.isArray(post.images) && post.images.length > 0 && (
                    <img
                      src={post.images[0]}
                      alt="Post"
                      className="w-full h-48 object-cover rounded-md"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  )}
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center px-4 py-3 text-sm text-gray-600 border-t border-gray-200">
                  <span
                    className={`flex items-center gap-1 ${
                      isLiked ? "text-blue-600" : "text-gray-600"
                    }`}
                  >
                    <FiThumbsUp />{" "}
                    {post.likes.length <= 1
                      ? `${post.likes.length} Like`
                      : `${post.likes.length} Likes`}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiMessageCircle className="text-gray-500" />{" "}
                    {post.comments <= 1
                      ? `${post.comments} Comment`
                      : `${post.comments} Comments`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!isLoading && posts.length > 0 && (
        <div className="text-center mt-4">
          <Link
            to={`/profile/activities`}
            className="text-blue-500 font-medium hover:text-blue-700 transition"
          >
            Show all posts →
          </Link>
        </div>
      )}
    </div>
  );
};

export default Activity;
