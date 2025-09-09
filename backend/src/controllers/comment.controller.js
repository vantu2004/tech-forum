import Comment from "../models/comment.model.js";
import UserProfile from "../models/userProfile.model.js";
import Post from "../models/post.model.js";
import Notification from "../models/notification.model.js";

export const createComment = async (req, res) => {
  try {
    const { postId, content, parentId } = req.body;

    // 1) Kiểm tra post tồn tại
    const post = await Post.findById(postId).select("_id userId comments");
    if (!post) {
      return res.status(404).json({ success: false, error: "Post not found" });
    }

    // 2) Nếu có parentId thì kiểm tra parent comment
    let parentComment = null;
    // Trường hợp parentId != null <=> comment ko phải bậc 1 -> phải tìm comment cha trong db
    if (parentId) {
      parentComment = await Comment.findById(parentId).select(
        "_id postId userId"
      );
      if (!parentComment) {
        return res
          .status(400)
          .json({ success: false, error: "Parent comment not found" });
      }
      // giả sử A comment bài 1 nhưng lại truyền ID bài 2 -> lỗi
      if (String(parentComment.postId) !== String(post._id)) {
        return res.status(400).json({
          success: false,
          error: "Parent comment does not belong to this post",
        });
      }
    }

    // 3) Tăng bộ đếm comment cho Post
    post.comments += 1;
    await post.save();

    // 4) Tạo comment mới
    const newComment = new Comment({
      postId,
      userId: req.userId,
      content,
      parentId: parentId || null,
    });
    const savedComment = await newComment.save();

    // 5) Lấy tên người gửi để hiển thị thông báo
    const sender = await UserProfile.findOne({ userId: req.userId }).select(
      "name"
    );
    const senderName = sender?.name || "Người dùng";

    // 6) Gửi thông báo
    const receivers = new Map();
    const senderIdStr = String(req.userId);
    const postOwnerId = String(post.userId);

    // Bình luận cấp 1 → chỉ báo cho chủ post
    if (!parentId) {
      // tránh trường hợp người comment là chủ post
      if (postOwnerId !== senderIdStr) {
        receivers.set(postOwnerId, {
          receiverId: post.userId,
          content: `${senderName} đã bình luận bài viết của bạn"`,
          type: "COMMENT",
        });
      }
    }
    // Bình luận > cấp 1
    else {
      const parentOwnerId = String(parentComment.userId);

      // tránh trường hợp người comment là chủ post
      if (postOwnerId !== senderIdStr) {
        receivers.set(postOwnerId, {
          receiverId: post.userId,
          content: `${senderName} đã trả lời trong bài viết của bạn"`,
          type: "REPLY",
        });
      }

      // tránh tường hợp người rep là người đã comment trước đó
      if (parentOwnerId !== senderIdStr) {
        receivers.set(parentOwnerId, {
          receiverId: parentComment.userId,
          content: `${senderName} đã trả lời bình luận của bạn"`,
          type: "REPLY",
        });
      }
    }

    // 7) Lưu các thông báo
    const notifications = Array.from(receivers.values()).map((n) =>
      new Notification({
        senderId: req.userId,
        receiverId: n.receiverId,
        content: n.content,
        type: n.type,
        commonId: savedComment._id,
      }).save()
    );
    if (notifications.length > 0) {
      await Promise.all(notifications);
    }

    // 8) Trả về
    res.status(201).json({ success: true, comment: savedComment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ postId }).sort({ createdAt: -1 });

    if (comments.length === 0) {
      return res
        .status(204)
        .json({ success: false, error: "No comments found" });
    }

    res.status(200).json({ success: true, comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
