import UserProfile from "../models/userProfile.model.js";
import mongoose from "mongoose";

export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    // id trong mongo dạng objectId nên phải check định dạng
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, error: "Invalid userId" });
    }

    const userProfile = await UserProfile.findOne({ userId });
    if (!userProfile) {
      return res
        .status(404)
        .json({ success: false, error: "Profile not found" });
    }

    res.status(200).json({
      success: true,
      userProfile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    // Lấy toàn bộ dữ liệu client gửi lên
    const updateData = req.body;

    // Nếu không có field nào trong body
    if (!updateData || Object.keys(updateData).length === 0) {
      return res
        .status(400)
        .json({ success: false, error: "No data provided to update" });
    }

    const updatedProfile = await UserProfile.findOneAndUpdate(
      { userId },
      { $set: updateData }, // update linh hoạt theo dữ liệu client gửi
      { new: true, runValidators: true }
    );

    if (!updatedProfile) {
      return res
        .status(404)
        .json({ success: false, error: "Profile not found" });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      userProfile: updatedProfile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
