import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import UserAuth from "../models/userAuth.model.js";
import mongoose from "mongoose";

export const createConversation = async (req, res) => {
  try {
    const senderId = req.userId;
    const { receiverId, message, picture } = req.body;

    // Validate
    if (!receiverId || (!message && !picture)) {
      return res
        .status(400)
        .json({ success: false, message: "receiverId or content is missing." });
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

    const receiver = await UserAuth.findById(receiverId).select("_id");
    if (!receiver) {
      return res
        .status(404)
        .json({ success: false, message: "Receiver not found." });
    }

    const existingConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!existingConversation) {
      const newConversation = new Conversation({
        participants: [senderId, receiverId],
      });
      const savedConversation = await newConversation.save();

      const newMessage = new Message({
        conversationId: savedConversation._id,
        senderId,
        message: message,
      });
      await newMessage.save();
    } else {
      const newMessage = new Message({
        conversationId: existingConversation._id,
        senderId,
        message: message,
      });
      await newMessage.save();
    }

    res
      .status(200)
      .json({ success: true, message: "Message sent successfully" });
  } catch (err) {
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
        path: "participants", // participants là ref tới UserAuth
        select: "email", // chỉ lấy email, tránh kéo password/token
        populate: {
          path: "profile", // Virtual populate: UserAuth.profile -> UserProfile
          select: "name profile_pic",
          options: { lean: true }, // trả profile dạng plain object
        },
        options: { lean: true }, // trả UserAuth dạng plain object
      })
      .lean(); // trả conv dạng plain object

    // 3) Trả về danh sách conversation đã kèm thông tin email + profile
    res.status(200).json({ success: true, conversations });
  } catch (err) {
    // 4) Log lỗi server (để debug)
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
