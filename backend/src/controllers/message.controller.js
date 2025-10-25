import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import mongoose from "mongoose";
import cloudinary from "../lib/cloudinary.js";
import { io } from "../lib/socket.js";
import { getReceiverSocketId } from "../lib/socket.js";

export const getAllMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;

    // 1. Lấy conversation + populate participants
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res
        .status(404)
        .json({ success: false, message: "Conversation not found" });
    }

    // 2. Lấy tất cả messages + populate sender
    const messages = await Message.find({ conversationId })
      .sort({ createdAt: 1 }) // oldest -> newest
      .populate({
        path: "senderId",
        select: "email",
        populate: {
          path: "profile",
          select: "name profile_pic",
        },
      });

    // 3. Trả kết quả
    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const userId = req.userId;
    const { conversationId, message, picture } = req.body;

    // 1️⃣ Validate input
    if (!conversationId || !mongoose.Types.ObjectId.isValid(conversationId)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid conversationId." });
    }
    if ((!message || !message.trim()) && !picture) {
      return res
        .status(400)
        .json({ success: false, error: "Message or picture is required." });
    }

    // 2️⃣ Kiểm tra conversation tồn tại và người gửi có trong participants
    const conversation = await Conversation.findById(conversationId);
    if (!conversation)
      return res
        .status(404)
        .json({ success: false, error: "Conversation not found." });

    if (!conversation.participants.includes(userId))
      return res
        .status(403)
        .json({ success: false, error: "Not your conversation." });

    // 3️⃣ Upload ảnh nếu có
    let pictureUrl = null;
    if (picture) {
      const upload = await cloudinary.uploader.upload(picture, {
        folder: "messages",
        resource_type: "image",
      });
      pictureUrl = upload.secure_url;
    }

    // 4️⃣ Tạo tin nhắn mới
    let newMessage = await Message.create({
      conversationId,
      senderId: userId,
      message: message?.trim() || null,
      picture: pictureUrl,
    });

    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: newMessage._id,
      updatedAt: Date.now(),
    });

    // 5️⃣ Populate sender
    newMessage = await newMessage.populate({
      path: "senderId",
      select: "email",
      populate: { path: "profile", select: "name profile_pic" },
    });

    // 6️⃣ Lấy conversation mới nhất (đã có lastMessage populate)
    const updatedConversation = await Conversation.findById(conversationId)
      .populate({
        path: "participants",
        select: "email profile",
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
          populate: {
            path: "profile",
            select: "name profile_pic",
          },
        },
      });

    // 7️⃣ Gửi realtime cho A & B
    for (const participantId of conversation.participants) {
      const socketId = getReceiverSocketId(participantId.toString());
      if (socketId) {
        io.to(socketId).emit("newMessage", newMessage); // cập nhật nội dung chat
        io.to(socketId).emit("conversationUpdated", updatedConversation); // cập nhật lastMessage ở sidebar
      }
    }

    // 8️⃣ Response
    res.status(201).json({ success: true, newMessage });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
