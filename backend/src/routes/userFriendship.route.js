import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  getPendingSentFriendships,
  getPendingReceivedFriendships,
  getAcceptedFriendships,
  getPeopleYouMayKnow,
  addFriendRequest,
  acceptFriendRequest,
  cancelFriendRequest,
  declineFriendRequest,
  removeFriendship,
} from "../controllers/userFriendship.controller.js";

const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Friendships
 *   description: API quản lý quan hệ bạn bè
 */

/**
 * @openapi
 * /api/users/friends/pending-sent:
 *   get:
 *     summary: Lấy danh sách friend requests mà user đã gửi
 *     tags: [Friendships]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Số trang
 *     responses:
 *       200:
 *         description: Danh sách friend requests đã gửi
 */

/**
 * @openapi
 * /api/users/friends/pending-received:
 *   get:
 *     summary: Lấy danh sách friend requests mà user nhận
 *     tags: [Friendships]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Số trang
 *     responses:
 *       200:
 *         description: Danh sách friend requests nhận
 */

/**
 * @openapi
 * /api/users/friends/accepted:
 *   get:
 *     summary: Lấy danh sách bạn bè đã chấp nhận
 *     tags: [Friendships]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách bạn bè
 */

/**
 * @openapi
 * /api/users/friends/related:
 *   get:
 *     summary: Lấy danh sách gợi ý kết bạn (People You May Know)
 *     tags: [Friendships]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách gợi ý
 */

/**
 * @openapi
 * /api/users/friends/add:
 *   post:
 *     summary: Gửi friend request
 *     tags: [Friendships]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - receiver
 *             properties:
 *               receiver:
 *                 type: string
 *                 description: userId người nhận
 *     responses:
 *       201:
 *         description: Gửi friend request thành công
 *       409:
 *         description: Friend request đã tồn tại
 */

/**
 * @openapi
 * /api/users/friends/accept:
 *   post:
 *     summary: Chấp nhận friend request
 *     tags: [Friendships]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - friendshipId
 *             properties:
 *               friendshipId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Friend request accepted
 */

/**
 * @openapi
 * /api/users/friends/cancel:
 *   delete:
 *     summary: Hủy friend request đã gửi
 *     tags: [Friendships]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - friendshipId
 *             properties:
 *               friendshipId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Friend request canceled
 */

/**
 * @openapi
 * /api/users/friends/decline:
 *   delete:
 *     summary: Từ chối friend request nhận được
 *     tags: [Friendships]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - friendshipId
 *             properties:
 *               friendshipId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Friend request declined
 */

/**
 * @openapi
 * /api/users/friends/remove:
 *   delete:
 *     summary: Xóa bạn bè
 *     tags: [Friendships]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - friendshipId
 *             properties:
 *               friendshipId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Friendship removed
 */

router.get("/pending-sent", verifyToken, getPendingSentFriendships);
router.get("/pending-received", verifyToken, getPendingReceivedFriendships);
router.get("/accepted", verifyToken, getAcceptedFriendships);
router.get("/related", verifyToken, getPeopleYouMayKnow);
router.post("/add", verifyToken, addFriendRequest);
router.post("/accept", verifyToken, acceptFriendRequest);
router.delete("/cancel", verifyToken, cancelFriendRequest);
router.delete("/decline", verifyToken, declineFriendRequest);
router.delete("/remove", verifyToken, removeFriendship);

export default router;
