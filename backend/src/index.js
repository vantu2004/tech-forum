import express from "express";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import cookieParser from "cookie-parser";
import userAuthRoutes from "./routes/userAuth.route.js";
import userProfileRoutes from "./routes/userProfile.route.js";
import postRoutes from "./routes/post.route.js";
import notificationRoutes from "./routes/notification.route.js";
import commentRoutes from "./routes/comment.route.js";
import userFriendshipRoutes from "./routes/userFriendship.route.js";
import conversationRoutes from "./routes/conversation.route.js";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";
import userSkillRoutes from "./routes/userSkill.route.js";
import userExperienceRoutes from "./routes/userExperience.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/users", userAuthRoutes);
app.use("/api/users/profile", userProfileRoutes);
app.use("/api/users/friends", userFriendshipRoutes);
app.use("/api/users/skills", userSkillRoutes);
app.use("/api/users/experiences", userExperienceRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});
