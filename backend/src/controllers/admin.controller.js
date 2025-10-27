import UserAuth from "../models/userAuth.model.js";
import UserProfile from "../models/userProfile.model.js";
import Comment from "../models/comment.model.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email and password are required",
      });
    }

    const adminAuth = await UserAuth.findOne({ email });
    if (!adminAuth) {
      return res.status(404).json({ success: false, error: "Admin not found" });
    }

    // Kiểm tra role
    if (adminAuth.role !== "admin") {
      return res.status(403).json({
        success: false,
        error: "Access denied: not an admin account",
      });
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcryptjs.compare(password, adminAuth.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid credentials" });
    }

    // Gửi JWT / Cookie
    generateTokenAndSetCookie(res, adminAuth._id);

    adminAuth.lastLogin = Date.now();
    await adminAuth.save();

    return res.status(200).json({
      success: true,
      message: "Admin login successful",
      userAuth: {
        ...adminAuth._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const adminId = req.user?._id;

    const users = await UserAuth.find({
      _id: { $ne: adminId },
      role: { $ne: "admin" },
    }) // loại trừ admin hiện tại
      .populate("profile")
      .select("-password"); // ẩn password

    return res.status(200).json({ success: true, users });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to fetch users" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await UserAuth.findById(userId)
      .populate("profile")
      .select("-password"); // ẩn password
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to fetch user" });
  }
};

export const addUser = async (req, res) => {
  try {
    const { email, password, role = "user" } = req.body;

    if (!email || !password)
      return res.status(400).json({
        success: false,
        error: "Email and password are required",
      });

    const existingUser = await UserAuth.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ success: false, error: "Email already registered" });

    const hashedPassword = await bcryptjs.hash(password, 12);
    const newUser = await UserAuth.create({
      email,
      password: hashedPassword,
      role,
      isVerified: true,
    });

    return res
      .status(201)
      .json({ success: true, message: "User created successfully", newUser });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to create user" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      email,
      role,
      name,
      headline,
      curr_company,
      curr_location,
      about,
      profile_pic,
      cover_pic,
    } = req.body;

    // Update UserAuth
    const userAuth = await UserAuth.findById(id);
    if (!userAuth) {
      return res.status(404).json({ message: "User not found" });
    }

    if (email) userAuth.email = email;
    if (role) userAuth.role = role;
    await userAuth.save();

    // Update or create UserProfile
    let profile = await UserProfile.findOne({ userId: id });
    if (!profile) {
      profile = new UserProfile({ userId: id });
    }

    if (name !== undefined) profile.name = name;
    if (headline !== undefined) profile.headline = headline;
    if (curr_company !== undefined) profile.curr_company = curr_company;
    if (curr_location !== undefined) profile.curr_location = curr_location;
    if (about !== undefined) profile.about = about;
    if (profile_pic !== undefined) profile.profile_pic = profile_pic;
    if (cover_pic !== undefined) profile.cover_pic = cover_pic;

    await profile.save();

    return res.status(200).json({
      message: "User updated successfully",
      user: {
        ...userAuth.toObject(),
        profile: profile.toObject(),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent deleting admins
    const user = await UserAuth.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    if (user.role === "admin") {
      return res
        .status(403)
        .json({ success: false, error: "Cannot delete admin accounts" });
    }

    await UserAuth.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to delete user" });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find()
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


