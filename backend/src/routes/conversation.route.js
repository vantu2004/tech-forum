import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createConversation,
  getConversation,
} from "../controllers/conversation.controller.js";

const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Conversations
 *   description: API quản lý cuộc trò chuyện
 */

/**
 * @openapi
 * /api/conversations:
 *   post:
 *     summary: Tạo cuộc trò chuyện mới kèm tin nhắn đầu tiên
 *     tags: [Conversations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               receiverId:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Conversation created successfully
 *       400:
 *         description: receiverId hoặc message thiếu / không hợp lệ
 *       404:
 *         description: Receiver not found
 */

/**
 * @openapi
 * /api/conversations:
 *   get:
 *     summary: Lấy tất cả cuộc trò chuyện của người dùng hiện tại
 *     tags: [Conversations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách cuộc trò chuyện
 *       500:
 *         description: Lỗi server
 */

router.post("/", verifyToken, createConversation);
router.get("/", verifyToken, getConversation);

export default router;
