import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getAllMessages, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Messages
 *   description: API quản lý tin nhắn
 */

/**
 * @openapi
 * /api/messages/{conversationId}:
 *   get:
 *     summary: Lấy tất cả tin nhắn trong conversation
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của conversation
 *     responses:
 *       200:
 *         description: Trả về danh sách tin nhắn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 messages:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       conversationId:
 *                         type: string
 *                       senderId:
 *                         type: object
 *                         properties:
 *                           email:
 *                             type: string
 *                           profile:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 *                               profile_pic:
 *                                 type: string
 *                       message:
 *                         type: string
 *                         nullable: true
 *                       picture:
 *                         type: string
 *                         nullable: true
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 */

/**
 * @openapi
 * /api/messages:
 *   post:
 *     summary: Gửi tin nhắn mới
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - conversationId
 *             properties:
 *               conversationId:
 *                 type: string
 *                 example: "671cb1a2d55f82bb7b16df20"
 *               message:
 *                 type: string
 *                 example: "Hello!"
 *               picture:
 *                 type: string
 *                 nullable: true
 *                 example: "data:image/png;base64,iVBORw0KGgo..."
 *     responses:
 *       201:
 *         description: Tin nhắn gửi thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 newMessage:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     conversationId:
 *                       type: string
 *                     senderId:
 *                       type: object
 *                       properties:
 *                         email:
 *                           type: string
 *                         profile:
 *                           type: object
 *                           properties:
 *                             name:
 *                               type: string
 *                             profile_pic:
 *                               type: string
 *                     message:
 *                       type: string
 *                       nullable: true
 *                     picture:
 *                       type: string
 *                       nullable: true
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: conversationId hoặc message/picture không hợp lệ
 *       403:
 *         description: Người dùng không thuộc conversation
 *       404:
 *         description: Conversation không tồn tại
 */

router.get("/:conversationId", verifyToken, getAllMessages);
router.post("/", verifyToken, sendMessage);

export default router;
