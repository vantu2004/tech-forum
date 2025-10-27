import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";
import UserProfile from "../models/userProfile.model.js";
import Notification from "../models/notification.model.js";
import cloudinary from "../lib/cloudinary.js";
import mongoose from "mongoose";

/* =========================
 * Helpers
 * ========================= */
async function getPostOr404(postId, res) {
  const post = await Post.findById(postId).select("_id userId");
  if (!post) {
    res.status(404).json({ success: false, error: "Post not found" });
    return null;
  }
  return post;
}

async function getParentCommentOr400(parentId, postId, res) {
  if (!parentId) return null;
  const parent = await Comment.findById(parentId).select("_id postId userId");
  if (!parent) {
    res.status(400).json({ success: false, error: "Parent comment not found" });
    return null;
  }
  if (String(parent.postId) !== String(postId)) {
    res.status(400).json({
      success: false,
      error: "Parent comment does not belong to this post",
    });
    return null;
  }
  return parent;
}

function approxBase64Bytes(b64) {
  // chấp nhận chuỗi có hoặc không có prefix data:mime;base64,
  const data = b64.includes("base64,") ? b64.split("base64,")[1] : b64;
  const len = data.length;
  const padding = data.endsWith("==") ? 2 : data.endsWith("=") ? 1 : 0;
  return Math.floor((len * 3) / 4) - padding;
}

async function uploadBase64ImageToCloudinary(imageBase64, folder = "comments") {
  // Validate nhanh kích thước ~5MB
  const bytes = approxBase64Bytes(imageBase64);
  const FIVE_MB = 5 * 1024 * 1024;
  if (bytes > FIVE_MB) {
    const err = new Error("Image too large (>5MB)");
    err.status = 400;
    throw err;
  }

  // Nếu không có prefix thì mặc định coi là jpeg
  const hasPrefix = imageBase64.startsWith("data:image/");
  const payload = hasPrefix
    ? imageBase64.trim()
    : `data:image/jpeg;base64,${imageBase64.trim()}`;

  const result = await cloudinary.uploader.upload(payload, {
    folder,
    resource_type: "image",
    // auto optimize
    transformation: [{ quality: "auto:good", fetch_format: "auto" }],
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
    bytes: result.bytes,
    format: result.format,
  };
}

async function getSenderName(userId) {
  const sender = await UserProfile.findOne({ userId }).select("name");
  return sender?.name || "Người dùng";
}

function buildReceivers({
  isReply,
  senderId,
  postOwnerId,
  parentOwnerId,
  senderName,
}) {
  const receivers = new Map();
  const senderStr = String(senderId);
  const postOwnerStr = String(postOwnerId);
  const parentOwnerStr = parentOwnerId ? String(parentOwnerId) : null;

  if (!isReply) {
    if (postOwnerStr !== senderStr) {
      receivers.set(postOwnerStr, {
        receiverId: postOwnerId,
        content: `${senderName} commented on your post`,
        type: "COMMENT",
      });
    }
  } else {
    if (postOwnerStr !== senderStr) {
      receivers.set(postOwnerStr, {
        receiverId: postOwnerId,
        content: `${senderName} replied in your post`,
        type: "REPLY",
      });
    }
    if (parentOwnerStr && parentOwnerStr !== senderStr) {
      receivers.set(parentOwnerStr, {
        receiverId: parentOwnerId,
        content: `${senderName} replied to your comment`,
        type: "REPLY",
      });
    }
  }

  return Array.from(receivers.values());
}

async function createNotifications({
  senderId,
  notificationsPayload,
  commonId,
}) {
  if (!notificationsPayload.length) return;
  await Promise.all(
    notificationsPayload.map((n) =>
      new Notification({
        senderId,
        receiverId: n.receiverId,
        content: n.content,
        type: n.type,
        commonId, // commentId
      }).save()
    )
  );
}

/* =========================
 * Controller
 * ========================= */
export const createComment = async (req, res) => {
  try {
    const { postId, text = "", image, parentId } = req.body;
    const userId = req.userId;

    // Input validation: cần ít nhất text hoặc image
    const hasText = typeof text === "string" && text.trim().length > 0;
    const hasImage = typeof image === "string" && image.trim().length > 0;
    if (!hasText && !hasImage) {
      return res.status(400).json({
        success: false,
        error: "Either text or image is required",
      });
    }

    // 1) Kiểm tra post & parent
    const post = await getPostOr404(postId, res);
    if (!post) return;

    const parentComment = await getParentCommentOr400(parentId, postId, res);
    // nghĩa là parentId thì có nhưng tìm trong db thì ko -> lỗi
    if (parentId && !parentComment) return;

    // 2) Nếu có ảnh → upload Cloudinary
    let imageUrl = null;
    if (hasImage) {
      try {
        const imageObj = await uploadBase64ImageToCloudinary(image, "comments");
        imageUrl = imageObj?.url || null; // an toàn
      } catch (e) {
        const status = e.status || 500;
        return res
          .status(status)
          .json({ success: false, error: e.message || "Upload failed" });
      }
    }

    // 3) Tạo comment
    const newComment = new Comment({
      postId,
      userId,
      text: hasText ? text.trim() : "",
      image: imageUrl, // giờ chỉ truyền string/null
      parentId: parentId || null,
    });

    const savedComment = await newComment.save();

    // 4) Tăng bộ đếm comment cho Post (sau khi tạo thành công để tránh lệch)
    await Post.findByIdAndUpdate(post._id, { $inc: { comments: 1 } }).lean();

    // 5) Gửi thông báo
    const senderName = await getSenderName(userId);
    const notificationsPayload = buildReceivers({
      isReply: !!parentId,
      senderId: userId,
      postOwnerId: post.userId,
      parentOwnerId: parentComment?.userId,
      senderName,
    });
    await createNotifications({
      senderId: userId,
      notificationsPayload,
      commonId: savedComment._id,
    });

    // 6) (tuỳ chọn) populate nhẹ để FE hiển thị
    const populated = await Comment.findById(savedComment._id)
      .populate({
        path: "userId",
        select: "email profile",
        populate: { path: "profile", select: "name headline profile_pic" },
      })
      .lean();

    return res.status(201).json({
      success: true,
      comment: populated,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ postId })
      .sort({ createdAt: -1 })
      .populate({
        path: "userId",
        select: "email profile",
        populate: { path: "profile", select: "name headline profile_pic" },
      })
      .lean();

    res.status(200).json({ success: true, comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const getCommentsPaginated = async (req, res) => {
  try {
    const { postId } = req.params;
    let { parentId, page = 1, limit = 5 } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;
    const skip = (page - 1) * limit;

    // Chuẩn hóa parentId
    if (parentId === "null" || parentId === "" || parentId === undefined) {
      parentId = null;
    }

    // Xây filter
    const filter = { postId, parentId };

    const [comments, totalComments] = await Promise.all([
      Comment.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate({
          path: "userId",
          select: "email profile",
          populate: { path: "profile", select: "name headline profile_pic" },
        })
        .lean(),

      // tính tổng bộ comment chứ ko phải tính tổng comment theo trang
      Comment.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      comments,
      pagination: {
        page,
        limit,
        totalComments,
        totalPages: Math.ceil(totalComments / limit),
        hasMore: page * limit < totalComments,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const likeDislikeComment = async (req, res) => {
  try {
    const userId = req.userId;
    const { commentId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid commentId" });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res
        .status(404)
        .json({ success: false, error: "Comment not found" });
    }

    let updatedComment;

    if (comment.likes.includes(userId)) {
      // Nếu user đã like thì bỏ like
      updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { $pull: { likes: userId } },
        { new: true }
      );
    } else {
      // Nếu chưa like thì thêm like
      updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { $addToSet: { likes: userId } }, // tránh trùng
        { new: true }
      );
    }

    return res.status(200).json({ success: true, comment: updatedComment });
  } catch (error) {
    console.error("likeDislikeComment error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
