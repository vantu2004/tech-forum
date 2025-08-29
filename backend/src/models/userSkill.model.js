import mongoose from "mongoose";

const userSkillSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserAuth",
      required: true,
    },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const UserSkill = mongoose.model("UserSkill", userSkillSchema);
export default UserSkill;
