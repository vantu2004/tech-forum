import mongoose from "mongoose";

const userExperienceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserAuth",
      required: true,
    },

    designation: { type: String, default: null },
    company_name: { type: String, default: null },
    duration: { type: String, default: null },
    location: { type: String, default: null },
  },
  { timestamps: true }
);

const UserExperience = mongoose.model("UserExperience", userExperienceSchema);
export default UserExperience;
