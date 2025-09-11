import Notification from "../models/notification.model.js";
import UserAuth from "../models/userAuth.model.js";
import UserFriendship from "../models/userFriendship.model.js";
import UserProfile from "../models/userProfile.model.js";
import mongoose from "mongoose";

export const getPendingSentFriendships = async (req, res) => {
  try {
    const userId = String(req.userId);

    const friendships = await UserFriendship.find({
      requester: userId, // mình là người gửi
      status: "PENDING", // trạng thái đang chờ
    });

    return res.status(200).json({ success: true, friendships });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const getPendingReceivedFriendships = async (req, res) => {
  try {
    const userId = String(req.userId);

    const friendships = await UserFriendship.find({
      receiver: userId, // mình là người nhận
      status: "PENDING", // trạng thái đang chờ
    });

    return res.status(200).json({ success: true, friendships });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const getAcceptedFriendships = async (req, res) => {
  try {
    const userId = String(req.userId);
    const friendships = await UserFriendship.find({
      $or: [
        { requester: userId, status: "ACCEPTED" },
        { receiver: userId, status: "ACCEPTED" },
      ],
    });

    res.status(200).json({ success: true, friendships });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const addFriendship = async (req, res) => {
  try {
    const requesterId = String(req.userId);
    const { receiver } = req.body;

    // 1) Validate input
    if (!receiver) {
      return res
        .status(400)
        .json({ success: false, error: "Missing receiver" });
    }
    if (!mongoose.isValidObjectId(receiver)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid receiver id" });
    }
    if (receiver === requesterId) {
      return res
        .status(400)
        .json({ success: false, error: "Cannot send request to yourself" });
    }

    // 2) Tồn tại requester profile & receiver auth?
    const [requesterProfile, receiverAuth] = await Promise.all([
      UserProfile.findOne({ userId: requesterId }).select("name"),
      UserAuth.findById(receiver).select("_id email"),
    ]);
    if (!receiverAuth) {
      return res
        .status(404)
        .json({ success: false, error: "Receiver user not found" });
    }

    // 3) Kiểm tra quan hệ đã tồn tại ở CẢ HAI CHIỀU
    const existing = await UserFriendship.findOne({
      $or: [
        { requester: requesterId, receiver },
        { requester: receiver, receiver: requesterId },
      ],
    });

    if (existing) {
      // Tuỳ chính sách:
      // - Nếu đã có PENDING từ receiver -> requester, ta auto-accept thay vì tạo mới.
      const isReversePending =
        existing.status === "PENDING" &&
        String(existing.requester) === String(receiver) &&
        String(existing.receiver) === String(requesterId);

      if (isReversePending) {
        existing.status = "ACCEPTED";
        await existing.save();

        await Notification.create({
          senderId: requesterId,
          receiverId: receiver,
          content: `${
            requesterProfile?.name || "Someone"
          } accepted your friend request`,
          type: "FRIEND_REQUEST",
          commonId: existing._id,
        });

        return res.status(200).json({
          success: true,
          message: "Friend request accepted",
          friendship: existing,
        });
      }

      // Các trạng thái còn lại coi như đã tồn tại
      return res.status(409).json({
        success: false,
        error: "Friendship already exists",
        status: existing.status,
      });
    }

    // 4) Tạo mới PENDING
    const friendship = await UserFriendship.create({
      requester: requesterId,
      receiver,
      status: "PENDING",
    });

    await Notification.create({
      senderId: requesterId,
      receiverId: receiver,
      content: `${
        requesterProfile?.name || "Someone"
      } sent you a friend request`,
      type: "FRIEND_REQUEST",
      commonId: friendship._id,
    });

    return res.status(201).json({
      success: true,
      message: "Friend request sent",
      friendship: friendship,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const acceptFriendRequest = async (req, res) => {
  try {
    const { friendshipId } = req.body;

    const friendship = await UserFriendship.findById(friendshipId);
    if (!friendship) {
      return res
        .status(404)
        .json({ success: false, error: "Friendship not found" });
    }

    const receiver = await UserProfile.findOne({
      userId: String(friendship.receiver),
    });

    // Chỉ người nhận mới có quyền accept
    if (String(friendship.receiver) !== String(req.userId)) {
      return res.status(403).json({
        success: false,
        error: "Not authorized to accept this request",
      });
    }

    if (friendship.status !== "PENDING") {
      return res.status(400).json({
        success: false,
        error: `Cannot accept friendship with status ${friendship.status}`,
      });
    }

    friendship.status = "ACCEPTED";
    friendship.acceptedAt = new Date();
    await friendship.save();

    await Notification.create({
      senderId: friendship.receiver, // người accept
      receiverId: friendship.requester, // người gửi lời mời gốc
      content: `${receiver?.name || "Someone"} accepted your friend request`,
      type: "FRIEND_REQUEST",
      commonId: friendship._id,
    });

    return res.status(200).json({
      success: true,
      message: "Friend request accepted",
      friendship,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const declineFriendRequest = async (req, res) => {
  try {
    const { friendshipId } = req.body;

    const friendship = await UserFriendship.findById(friendshipId);
    if (!friendship) {
      return res
        .status(404)
        .json({ success: false, error: "Friendship not found" });
    }

    if (String(friendship.receiver) !== String(req.userId)) {
      return res.status(403).json({
        success: false,
        error: "Not authorized to decline this request",
      });
    }

    if (friendship.status !== "PENDING") {
      return res.status(400).json({
        success: false,
        error: `Cannot decline friendship with status ${friendship.status}`,
      });
    }

    await UserFriendship.findByIdAndDelete(friendshipId);
    return res
      .status(200)
      .json({ success: true, message: "Friend request declined" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const removeFriendship = async (req, res) => {
  try {
    const { friendshipId } = req.body;

    const friendship = await UserFriendship.findById(friendshipId);
    if (!friendship) {
      return res
        .status(404)
        .json({ success: false, error: "Friendship not found" });
    }

    // cả requester và receiver có quyền xóa
    if (
      String(friendship.requester) !== String(req.userId) &&
      String(friendship.receiver) !== String(req.userId)
    ) {
      return res.status(403).json({
        success: false,
        error: "Not authorized to remove this friendship",
      });
    }

    if (friendship.status !== "ACCEPTED") {
      return res.status(400).json({
        success: false,
        error: `Cannot remove friendship with status ${friendship.status}`,
      });
    }

    await UserFriendship.findByIdAndDelete(friendshipId);
    return res
      .status(200)
      .json({ success: true, message: "Friendship removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
