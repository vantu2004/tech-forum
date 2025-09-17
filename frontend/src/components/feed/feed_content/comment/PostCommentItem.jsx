import { FaCircleUser } from "react-icons/fa6";

const INDENT_PX = 24; // khoảng thụt mỗi cấp

const PostCommentItem = ({ comment, depth = 0, parentName = null }) => {
  const profile = comment?.userId?.profile || {};
  const avatar = profile?.profile_pic;
  const name = profile?.name || "User";

  return (
    <div
      className="relative mt-2"
      style={{ marginLeft: depth * INDENT_PX }} // 👈 thụt lề theo depth
    >
      {/* Rail trái cho mọi cấp > 0 */}
      {depth > 0 && (
        <>
          <span className="pointer-events-none absolute -left-3 top-0 bottom-0 border-l border-gray-300" />
          <span className="pointer-events-none absolute -left-3 top-4 h-2 w-2 rounded-full border border-gray-300 bg-white" />
        </>
      )}

      <div className="flex gap-2">
        {/* Avatar */}
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="w-9 h-9 rounded-full object-cover"
          />
        ) : (
          <FaCircleUser className="w-9 h-9 rounded-full text-gray-400" />
        )}

        {/* Bubble: giữ màu đồng nhất cho mọi cấp */}
        <div className="flex-1">
          <div className="rounded-xl px-3 py-2 bg-gray-100">
            <h4 className="text-sm font-semibold text-gray-800">{name}</h4>

            {comment?.text && (
              <p className="text-sm text-gray-800 mt-1">
                {depth > 0 && parentName && (
                  <span className="font-semibold text-blue-600">
                    @{parentName}
                  </span>
                )}{" "}
                {comment.text}
              </p>
            )}

            {comment?.image && (
              <img
                src={comment.image}
                alt="comment"
                className="mt-2 max-h-56 rounded-lg object-contain"
              />
            )}
          </div>

          <div className="flex gap-4 text-xs text-gray-500 mt-1">
            <button type="button" className="hover:underline">
              Like
            </button>
            <button type="button" className="hover:underline">
              Reply
            </button>
            {comment?.createdAt && (
              <span>{new Date(comment.createdAt).toLocaleString()}</span>
            )}
          </div>
        </div>
      </div>

      {/* Children: GIỮ phân cấp thật sự (depth + 1) */}
      {Array.isArray(comment.children) && comment.children.length > 0 && (
        <div className="mt-2 space-y-2">
          {comment.children.map((child, idx) => (
            <PostCommentItem
              key={String(child._id)}
              comment={child}
              depth={depth + 1} // 👈 tăng depth thật sự
              parentName={name} // 👈 mention cha
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostCommentItem;
