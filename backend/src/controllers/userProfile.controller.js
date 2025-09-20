import UserProfile from "../models/userProfile.model.js";
import mongoose from "mongoose";
import UserAuth from "../models/userAuth.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getUserProfile = async (req, res) => {
  try {
    const userProfile = await UserProfile.findOne({ userId: req.userId });
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

export const getUserProfileByUserId = async (req, res) => {
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

    let updateData = { ...req.body };

    // Nếu client gửi base64 cho profile_pic
    if (updateData.profile_pic && updateData.profile_pic.startsWith("data:")) {
      const uploadResult = await cloudinary.uploader.upload(
        updateData.profile_pic,
        {
          folder: "avatars",
        }
      );
      updateData.profile_pic = uploadResult.secure_url; // chỉ lưu URL
    }

    // Nếu client gửi base64 cho cover_pic
    if (updateData.cover_pic && updateData.cover_pic.startsWith("data:")) {
      const uploadResult = await cloudinary.uploader.upload(
        updateData.cover_pic,
        {
          folder: "covers",
        }
      );
      updateData.cover_pic = uploadResult.secure_url; // chỉ lưu URL
    }

    if (!updateData || Object.keys(updateData).length === 0) {
      return res
        .status(400)
        .json({ success: false, error: "No data provided to update" });
    }

    const updatedProfile = await UserProfile.findOneAndUpdate(
      { userId },
      { $set: updateData },
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

/**
 * Escape các ký tự đặc biệt trong regex để tránh lỗi hoặc regex injection.
 * Ví dụ: query = "a.b*c" => trở thành "a\.b\*c"
 */
const escapeRegex = (s = "") => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * GET /profile/search?query=abc
 * Tìm profile theo "name" (bảng UserProfile) HOẶC "email" (bảng UserAuth) trong MỘT lần query.
 * - Join (lookup) UserProfile -> UserAuth để có trường email.
 * - Loại trừ profile của chính mình (theo userId = _id của UserAuth hiện tại).
 */
export const getUserProfileByQuery = async (req, res) => {
  try {
    // Đọc và kiểm tra query string
    const { query } = req.query;
    const q = (query || "").trim();
    if (!q) {
      return res.status(400).json({ success: false, error: "Missing query" });
    }

    // Tạo regex không phân biệt hoa/thường, có escape ký tự đặc biệt và ép userId về lại objectId.
    const regex = new RegExp(escapeRegex(q), "i");
    const selfAuthId = new mongoose.Types.ObjectId(String(req.userId));

    // tạo pipeline (mảng các stage chạy tuần tự - stage là các object lệnh bắt đầu bằng $) sau đó chạy aggregate (cơ chế xử lý dữ liệu theo pipeline)
    const pipeline = buildPipelineSearchProfile(selfAuthId, regex);
    const results = await UserProfile.aggregate(pipeline);

    if (!results.length) {
      return res
        .status(404)
        .json({ success: false, error: "Profile not found" });
    }

    return res.status(200).json({
      success: true,
      count: results.length,
      results,
    });
  } catch (err) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

function buildPipelineSearchProfile(selfAuthId, regex) {
  return [
    { $match: { userId: { $ne: selfAuthId } } },

    // JOIN sang bảng UserAuth để lấy email
    {
      $lookup: {
        // Lấy đúng tên collection do Mongoose sinh (vd: "userauths")
        from: UserAuth.collection.name,
        localField: "userId", // field ở UserProfile
        foreignField: "_id", // field ở UserAuth
        as: "auth", // kết quả join sẽ nằm trong mảng "auth"
      },
    },

    // Chuyển mảng "auth" thành object. Nếu không có match bên Auth, vẫn giữ document với auth = null
    { $unwind: { path: "$auth", preserveNullAndEmptyArrays: true } },

    // Lọc 1 lần theo OR:
    // - name (trong UserProfile) match regex
    // - hoặc auth.email (trong UserAuth) match regex
    {
      $match: {
        $or: [{ name: { $regex: regex } }, { "auth.email": { $regex: regex } }],
      },
    },

    // Chỉ trả về những trường cần dùng cho FE
    {
      $project: {
        _id: 1,
        userId: 1,
        name: 1,
        headline: 1,
        curr_company: 1,
        curr_location: 1,
        profile_pic: 1,
        cover_pic: 1,
        email: "$auth.email", // email lấy từ bảng UserAuth sau khi lookup
        createdAt: 1,
        updatedAt: 1,
      },
    },

    // Nếu muốn sort nhẹ theo tên cho dễ nhìn:
    { $sort: { name: 1, _id: 1 } },
  ];
}
