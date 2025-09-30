import mongoose from "mongoose";

const userSkillSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserAuth",
      required: true,
      unique: true, // mỗi user chỉ có 1 document
    },
    skills: {
      type: [String], // mảng string
      default: [],
    },
  },
  { timestamps: true }
);

const UserSkill = mongoose.model("UserSkill", userSkillSchema);
export default UserSkill;
