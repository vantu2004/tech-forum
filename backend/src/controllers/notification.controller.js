import Notification from "../models/notification.model.js";

export const getAllNotifications = async (req, res) => {
  try {
    const userId = req.userId;

    const notifications = await Notification.find({
      receiverId: userId,
    })
      .sort({ createdAt: -1 })
      .populate({
        path: "senderId",
        select: "email profile",
        populate: {
          path: "profile",
          select: "name profile_pic headline",
          options: { lean: true },
        },
      })
      .lean(); // Trả object thuần cho performance

    res.status(200).json({ success: true, notifications });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.body;

    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    )
      .populate({
        path: "senderId",
        select: "email profile",
        populate: {
          path: "profile",
          select: "name profile_pic headline",
        },
      })
      .lean();

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Notification marked as read",
      notification,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const getUnreadNotifications = async (req, res) => {
  try {
    const userId = req.userId;

    const notifications = await Notification.find({
      receiverId: userId,
      isRead: false,
    })
      .sort({ createdAt: -1 })
      .populate({
        path: "senderId",
        select: "email profile",
        populate: {
          path: "profile",
          select: "name profile_pic headline",
        },
      })
      .lean();

    res.status(200).json({ success: true, notifications });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
