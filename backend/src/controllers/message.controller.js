import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import mongoose from "mongoose";

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

    // Validate: must have conversationId
    if (!conversationId || !mongoose.Types.ObjectId.isValid(conversationId)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid conversationId." });
    }

    // Validate: message or picture required
    if ((!message || !message.trim()) && !picture) {
      return res.status(400).json({
        success: false,
        error: "Message or picture is required.",
      });
    }

    // Check conversation exists
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res
        .status(404)
        .json({ success: false, error: "Conversation not found." });
    }

    // Check if sender belongs to this conversation
    // some() dùng để kiểm tra xem có ít nhất một phần tử trong mảng thỏa mãn điều kiện hay không.
    if (
      !conversation.participants.some((p) => p.toString() === userId.toString())
    ) {
      return res.status(403).json({
        success: false,
        error: "You are not a participant of this conversation.",
      });
    }

    // Create message
    let newMessage = await Message.create({
      conversationId,
      senderId: userId,
      message: message?.trim() || null,
      picture: picture || null,
    });

    // Populate sender info
    newMessage = await newMessage.populate({
      path: "senderId",
      select: "email",
      populate: {
        path: "profile",
        select: "name profile_pic",
      },
    });

    // Update conversation (bump updatedAt + save lastMessage)
    await Conversation.findByIdAndUpdate(conversationId, {
      $currentDate: { updatedAt: true },
    });

    // Response
    res.status(201).json({
      success: true,
      newMessage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
