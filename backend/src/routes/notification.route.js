import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  getAllNotifications,
  getUnreadNotifications,
  markAsRead,
} from "../controllers/notification.controller.js";

const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Notifications
 *   description: API quản lý thông báo
 */

/**
 * @openapi
 * /api/notifications:
 *   get:
 *     summary: Lấy tất cả thông báo của người dùng
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Trả về danh sách thông báo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 notifications:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
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
 *                               headline:
 *                                 type: string
 *                       content:
 *                         type: string
 *                       type:
 *                         type: string
 *                       isRead:
 *                         type: boolean
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 */

/**
 * @openapi
 * /api/notifications/unread:
 *   get:
 *     summary: Lấy các thông báo chưa đọc
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Trả về danh sách thông báo chưa đọc
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 notifications:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
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
 *                               headline:
 *                                 type: string
 *                       content:
 *                         type: string
 *                       type:
 *                         type: string
 *                       isRead:
 *                         type: boolean
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 */

/**
 * @openapi
 * /api/notifications/mark-as-read:
 *   put:
 *     summary: Đánh dấu một thông báo là đã đọc
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - notificationId
 *             properties:
 *               notificationId:
 *                 type: string
 *                 example: "671cb1a2d55f82bb7b16df20"
 *     responses:
 *       200:
 *         description: Đánh dấu thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Notification marked as read"
 *                 notification:
 *                   type: object
 *                   properties:
 *                     _id:
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
 *                             headline:
 *                               type: string
 *                     content:
 *                       type: string
 *                     type:
 *                       type: string
 *                     isRead:
 *                       type: boolean
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: Notification không tồn tại
 */

router.get("/", verifyToken, getAllNotifications);
router.get("/unread", verifyToken, getUnreadNotifications);
router.put("/mark-as-read", verifyToken, markAsRead);

export default router;
