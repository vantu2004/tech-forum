import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createComment,
  getAllComments,
  getCommentsPaginated,
  likeDislikeComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: API quản lý comment
 */

/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Tạo comment mới
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - postId
 *             properties:
 *               postId:
 *                 type: string
 *               text:
 *                 type: string
 *               image:
 *                 type: string
 *               parentId:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       400:
 *         description: Thiếu text hoặc image
 *       404:
 *         description: Post not found
 */

/**
 * @swagger
 * /api/comments/{postId}:
 *   get:
 *     summary: Lấy tất cả comment của 1 post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công
 */

/**
 * @swagger
 * /api/comments/pagination/{postId}:
 *   get:
 *     summary: Lấy comment theo phân trang
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: parentId
 *         schema:
 *           type: string
 *           nullable: true
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 5
 *     responses:
 *       200:
 *         description: Thành công
 */

/**
 * @swagger
 * /api/comments/like-dislike:
 *   put:
 *     summary: Like/Dislike comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - commentId
 *             properties:
 *               commentId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       400:
 *         description: commentId không hợp lệ
 *       404:
 *         description: Comment không tồn tại
 */

router.post("/", verifyToken, createComment);
router.get("/pagination/:postId", getCommentsPaginated);
router.get("/:postId", getAllComments);
router.put("/like-dislike", verifyToken, likeDislikeComment);

export default router;
