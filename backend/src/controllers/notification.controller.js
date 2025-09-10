import Notification from "../models/notification.model.js";

export const getAllNotifications = async (req, res) => {
  try {
    const userId = req.userId;
    const notifications = await Notification.find({
      receiverId: userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const userId = req.userId;
    const { notificationId } = req.body;

    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    );

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
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getUnreadNotifications = async (req, res) => {
  try {
    const userId = req.userId;
    const notifications = await Notification.find({
      receiverId: userId,
      isRead: false,
    }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
