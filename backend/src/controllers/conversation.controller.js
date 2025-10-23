import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import UserAuth from "../models/userAuth.model.js";
import mongoose from "mongoose";

export const createConversation = async (req, res) => {
  try {
    const senderId = req.userId;
    const { receiverId, message } = req.body;

    // Validate input
    if (!receiverId || !message) {
      return res
        .status(400)
        .json({ success: false, message: "receiverId or message is missing." });
    }

    if (String(receiverId) === String(senderId)) {
      return res
        .status(400)
        .json({ success: false, message: "You cannot chat with yourself." });
    }

    if (!mongoose.isValidObjectId(receiverId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid receiverId." });
    }

    const receiver = await UserAuth.findById(receiverId)
      .select("email")
      .populate({
        path: "profile",
        select: "name profile_pic headline",
        options: { lean: true },
      })
      .lean();

    if (!receiver) {
      return res
        .status(404)
        .json({ success: false, message: "Receiver not found." });
    }

    // Check if conversation exists
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).lean();

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // Create message
    const newMessage = await Message.create({
      conversationId: conversation._id,
      senderId,
      message,
    });

    // Cập nhật lastMessage
    await Conversation.findByIdAndUpdate(conversation._id, {
      lastMessage: newMessage._id,
      updatedAt: Date.now(),
    });

    // Populate conversation (kèm lastMessage)
    const populatedConversation = await Conversation.findById(conversation._id)
      .populate({
        path: "participants",
        select: "email",
        populate: {
          path: "profile",
          select: "name profile_pic headline",
        },
      })
      .populate({
        path: "lastMessage",
        populate: {
          path: "senderId",
          select: "email profile",
          populate: { path: "profile", select: "name profile_pic" },
        },
      })
      .lean();

    res.status(201).json({
      success: true,
      message: "Conversation created successfully",
      conversation: populatedConversation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const getConversation = async (req, res) => {
  try {
    // 1) Lấy user hiện tại từ middleware auth
    const userId = req.userId;

    // 2) Tìm tất cả cuộc trò chuyện có chứa userId trong mảng participants
    // - $in: chỉ cần userId xuất hiện trong mảng là match
    // - sort(updatedAt: -1): đẩy conv hoạt động gần nhất lên đầu (hữu ích cho UI)
    // - populate(participants): thay ObjectId -> document UserAuth (chỉ lấy email)
    // - populate(profile): từ UserAuth.virtual "profile" -> UserProfile (lấy tên, avatar, headline, công ty)
    // - options.lean: yêu cầu Mongoose trả về plain object (nhẹ, nhanh) trong quá trình populate
    // - .lean() cuối: convert toàn bộ query thành plain objects (tối ưu hiệu năng đọc)
    const conversations = await Conversation.find({
      participants: { $in: [userId] },
    })
      .sort({ updatedAt: -1 })
      .populate({
        path: "participants",
        select: "email",
        populate: {
          path: "profile",
          select: "name profile_pic headline",
        },
      })
      .populate({
        path: "lastMessage",
        populate: {
          path: "senderId",
          select: "email profile",
          populate: { path: "profile", select: "name profile_pic" },
        },
      })
      .lean();

    // 3) Trả về danh sách conversation đã kèm thông tin email + profile
    res.status(200).json({ success: true, conversations });
  } catch (error) {
    // 4) Log lỗi server (để debug)
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
