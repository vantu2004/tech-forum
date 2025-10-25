import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

// key: userId -> socketId
const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  // gửi event danh sách user online cho tất cả client để FE bắt
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Khi user join một cuộc trò chuyện, lắng nghe event "joinConversation"
  socket.on("joinConversation", (conversationId) => {
    socket.join(conversationId);
    console.log(`👥 User ${userId} joined conversation ${conversationId}`);
  });

  // Khi rời cuộc trò chuyện, lắng nghe event "leaveConversation"
  socket.on("leaveConversation", (conversationId) => {
    socket.leave(conversationId);
    console.log(`🚪 User ${userId} left conversation ${conversationId}`);
  });

  // Khi user disconnect, lắng nghe sự kiện "disconnect"
  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}
