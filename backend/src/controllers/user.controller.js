import UserAuth from "../models/userAuth.model.js";
import UserProfile from "../models/userProfile.model.js";
import bcryptjs from "bcryptjs";
import { OAuth2Client } from "google-auth-library";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const checkAuth = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    const userAuth = await UserAuth.findById(userId).select("-password");
    if (!userAuth) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    res.status(200).json({
      success: true,
      userAuth: userAuth,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }

    const userAuth = await UserAuth.findOne({ email });
    if (userAuth) {
      return res
        .status(400)
        .json({ success: false, error: "User already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString(); // Generate a 6-digit verification token
    const verificationTokenExpiresAt = Date.now() + 3600000; // 1 hour

    const savedUserAuth = await UserAuth.create({
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt,
    });

    const savedUserProfile = await UserProfile.create({
      userId: savedUserAuth._id,
      name: name || null,
    });

    generateTokenAndSetCookie(res, savedUserAuth._id);

    // await sendVerificationEmail(savedUser.email, verificationToken);

    // console.log("Cookie header:", res.getHeader("Set-Cookie"));

    res.status(201).json({
      success: true,
      message: "Registration successful",
      userAuth: {
        ...savedUserAuth._doc,
        password: undefined,
        verificationToken: undefined,
        verificationTokenExpiresAt: undefined,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "Email and password are required" });
    }

    const userAuth = await UserAuth.findOne({ email });
    if (!userAuth) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    if (!userAuth.isVerified) {
      return res
        .status(403)
        .json({ success: false, error: "Email is not verified" });
    }

    const isMatch = bcryptjs.compare(password, userAuth.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid credentials" });
    }

    generateTokenAndSetCookie(res, userAuth._id);

    userAuth.lastLogin = Date.now();
    await userAuth.save();

    res.status(200).json({
      success: true,
      message: "Login successful",
      userAuth: {
        ...userAuth._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const loginGoogle = async (req, res) => {
  const { idToken } = req.body;

  try {
    if (!idToken) {
      return res.status(400).json({
        success: false,
        error: "ID token is required",
      });
    }

    // Verify token
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { sub, email, name, picture } = ticket.getPayload();

    // Tìm user theo googleId
    const userAuth = await UserAuth.findOne({ googleId: sub });

    if (!userAuth) {
      // Nếu chưa có thì tạo mới
      userAuth = await UserAuth.create({
        googleId: sub,
        email,
        isVerified: true,
      });

      await UserProfile.create({
        userId: userAuth._id,
        name,
        profile_pic: picture,
      });
    }

    generateTokenAndSetCookie(res, userAuth._id);

    // Cập nhật lastLogin
    userAuth.lastLogin = Date.now();
    await userAuth.save();

    // Trả về dữ liệu an toàn
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        ...userAuth._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({ success: true, message: "Logout successful" });
};
