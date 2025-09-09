import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserAuth",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserAuth",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["MESSAGE", "FRIEND_REQUEST", "COMMENT", "REPLY"],
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    // id này dùng chung cho các type phía trên (vd: messageId, userId)
    commonId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
