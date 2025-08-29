import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserAuth",
      required: true,
    },

    name: { type: String, default: null },
    headline: { type: String, default: null },
    curr_company: { type: String, default: null },
    curr_location: { type: String, default: null },
    about: { type: String, default: null },

    profile_pic: { type: String, default: null },
    cover_pic: { type: String, default: null },

    resume: { type: String, default: null },
  },
  { timestamps: true }
);

const UserProfile = mongoose.model("UserProfile", userProfileSchema);
export default UserProfile;
