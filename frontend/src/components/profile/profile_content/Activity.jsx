import logo from "../../../assets/navbar/logo.png";
import { FiThumbsUp, FiMessageCircle } from "react-icons/fi";

const Activity = () => {
  // giả lập data
  const posts = [
    {
      id: 1,
      author: "Mashhood Ahmad Danish",
      title: "SDE-2 Engineer @Infosys",
      avatar: logo,
      text: "This is the only text Image mhkkgg hkjbhj jbhjbh j...",
      image: null,
      likes: 0,
      comments: 4,
    },
    {
      id: 2,
      author: "Mashhood Ahmad Danish",
      title: "SDE-2 Engineer @Infosys",
      avatar: logo,
      text: "This is the post for react Developer Tool and that...",
      image: logo,
      likes: 2,
      comments: 5,
    },
    {
      id: 3,
      author: "Mashhood Ahmad Danish",
      title: "SDE-2 Engineer @Infosys",
      avatar: logo,
      text: "This is the post for react Developer Tool and that...",
      image: logo,
      likes: 2,
      comments: 5,
    },
  ];

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Activities</h2>

      <div className="flex gap-5 overflow-x-auto pb-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md min-w-[calc(50%-0.5rem)] max-w-[calc(50%-0.5rem)] flex-shrink-0 transition"
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-gray-200">
              <img
                src={post.avatar}
                alt={post.author}
                className="w-11 h-11 rounded-full"
              />
              <div>
                <h3 className="font-semibold text-sm">{post.author}</h3>
                <p className="text-xs text-gray-500">{post.title}</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <p className="text-gray-700 text-sm mb-3">{post.text}</p>
              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full h-48 object-cover rounded-md"
                />
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center px-4 py-3 text-sm text-gray-600 border-t border-gray-200">
              <span className="flex items-center gap-1">
                <FiThumbsUp className="text-blue-500" /> {post.likes} Likes
              </span>
              <span className="flex items-center gap-1">
                <FiMessageCircle className="text-gray-500" /> {post.comments}{" "}
                Comments
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Show all link */}
      <div className="text-center mt-4">
        <button className="text-blue-500 font-medium hover:text-blue-700 transition">
          Show all posts →
        </button>
      </div>
    </div>
  );
};

export default Activity;
