import UserAuth from "../models/userAuth.model.js";
import UserProfile from "../models/userProfile.model.js";
import bcryptjs from "bcryptjs";
import { OAuth2Client } from "google-auth-library";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";
import {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendResetSuccessEmail,
} from "../smtp/smtp.send.js";
import crypto from "crypto";

const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  // "postmessage" là redirect URI giả lập do Google cung cấp, dùng cho các ứng dụng muốn lấy code từ popup (FE) rồi tự gửi code về backend để đổi token.
  "postmessage"
);

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

    // Tạo userAuth
    const savedUserAuth = await UserAuth.create({
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt,
    });

    // Tạo userProfile
    const savedProfile = await UserProfile.create({
      userId: savedUserAuth._id,
      name: name || null,
    });

    // Gán profileId vào userAuth
    savedUserAuth.profile = savedProfile._id;
    await savedUserAuth.save();

    generateTokenAndSetCookie(res, savedUserAuth._id);

    await sendVerificationEmail(savedUserAuth.email, verificationToken);

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
      return res
        .status(404)
        .json({ success: false, error: "Invalid credentials" });
    }

    if (!userAuth.isVerified) {
      return res
        .status(403)
        .json({ success: false, error: "Email is not verified" });
    }

    const isMatch = await bcryptjs.compare(password, userAuth.password);
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
  try {
    const { code } = req.body;
    if (!code)
      return res.status(400).json({ success: false, error: "Missing code" });

    // 1) Đổi code -> tokens (access_token, id_token, refresh_token nếu có)
    const { tokens } = await oauth2Client.getToken(code);

    // 2) Verify id_token để lấy profile
    const ticket = await oauth2Client.verifyIdToken({
      // id-token dùng authentication, access-token dùng authorization
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const {
      sub: googleId,
      email,
      email_verified: emailVerified,
      name,
      picture,
    } = payload || {};

    if (!email || !emailVerified) {
      return res
        .status(401)
        .json({ success: false, error: "Unverified Google account" });
    }

    // 3) Upsert user (link theo email nếu có)
    let userAuth = await UserAuth.findOne({ $or: [{ googleId }, { email }] });

    if (!userAuth) {
      userAuth = await UserAuth.create({
        googleId,
        email,
        isVerified: true,
        lastLogin: new Date(),
      });

      await UserProfile.create({
        userId: userAuth._id,
        name: name ?? "User",
        profile_pic: picture ?? null,
      });
    } else {
      let changed = false;
      if (!userAuth.googleId) {
        userAuth.googleId = googleId;
        changed = true;
      }
      if (!userAuth.isVerified) {
        userAuth.isVerified = true;
        changed = true;
      }
      userAuth.lastLogin = new Date();
      if (changed) await userAuth.save();

      // tạo profile nếu chưa có
      await UserProfile.updateOne(
        { userId: userAuth._id },
        {
          $setOnInsert: { name: name ?? "User", profile_pic: picture ?? null },
        },
        { upsert: true }
      );
    }

    // 4) Tạo JWT nội bộ & set cookie HTTP-only
    generateTokenAndSetCookie(res, userAuth._id);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      userAuth: {
        ...userAuth._doc,
        password: undefined,
      },
    });
  } catch (err) {
    console.error("loginGoogleAuthCode error:", err);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
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

export const verifyEmail = async (req, res) => {
  const { email, OTP } = req.body;

  try {
    const userAuth = await UserAuth.findOne({
      email,
      verificationToken: OTP,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });
    if (!userAuth) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid or expired token" });
    }

    userAuth.isVerified = true;
    userAuth.verificationToken = undefined;
    userAuth.verificationTokenExpiresAt = undefined;
    await userAuth.save();

    const userProfile = await UserProfile.findOne({ userId: userAuth._id });

    await sendWelcomeEmail(userAuth.email, userProfile.name);

    // kiểm tra token cookie
    const token = req.cookies?.token;
    if (!token) {
      return res.status(200).json({
        success: true,
        message: "Email verified successfully",
      });
    }

    // 2 field kia đã bị xóa nên chỉ cần ko trả về password là được
    res.status(200).json({
      success: true,
      message: "Email verified successfully",
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

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const userAuth = await UserAuth.findOne({ email });
    if (!userAuth) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    userAuth.resetPasswordToken = resetToken;
    userAuth.resetPasswordExpiresAt = Date.now() + 3600000; // 1 hour
    await userAuth.save();

    await sendPasswordResetEmail(
      userAuth.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );

    res.status(200).json({
      success: true,
      message: "Password reset email sent",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const userAuth = await UserAuth.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
    if (!userAuth) {
      return res.status(400).json({
        success: false,
        error: "Invalid or expired password reset token",
      });
    }

    userAuth.password = await bcryptjs.hash(password, 10);
    userAuth.resetPasswordToken = undefined;
    userAuth.resetPasswordExpiresAt = undefined;
    await userAuth.save();

    await sendResetSuccessEmail(userAuth.email);

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
