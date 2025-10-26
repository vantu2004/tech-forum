import mongoose from "mongoose";

const userAuthSchema = new mongoose.Schema(
  {
    googleId: { type: String, unique: true, sparse: true }, // optional nếu login Google
    email: { type: String, required: true, unique: true },
    password: { type: String }, // null nếu login Google
    isVerified: { type: Boolean, default: false },
    lastLogin: { type: Date, default: Date.now },

    // role
    role: {
      type: String,
      enum: ["user", "admin"], 
      default: "user",
    },

    // token
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpiresAt: { type: Date, default: null },
    verificationToken: { type: String, default: null },
    verificationTokenExpiresAt: { type: Date, default: null },

    // ref tới UserProfile
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserProfile",
    },
  },
  { timestamps: true }
);

const UserAuth = mongoose.model("UserAuth", userAuthSchema);
export default UserAuth;
