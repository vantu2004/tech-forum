import mongoose from "mongoose";

const userFriendshipSchema = new mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserAuth",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserAuth",
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

const UserFriendship = mongoose.model("UserFriendship", userFriendshipSchema);
export default UserFriendship;
