import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  addPost,
  likeDislikePost,
  getAllPosts,
  getPostById,
  getPostsByUser,
  getPostsByUserId,
  searchPosts,
} from "../controllers/post.controller.js";

const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Posts
 *   description: API quản lý bài viết (Post)
 */

/**
 * @openapi
 * /api/posts:
 *   get:
 *     summary: Lấy danh sách tất cả bài viết (phân trang)
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Thành công
 */

/**
 * @openapi
 * /api/posts:
 *   post:
 *     summary: Thêm bài viết mới
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               desc:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Tạo bài viết thành công
 *       400:
 *         description: Thiếu mô tả hoặc ảnh
 *       500:
 *         description: Lỗi server
 */

/**
 * @openapi
 * /api/posts/{postId}:
 *   get:
 *     summary: Lấy chi tiết một bài viết theo ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công
 *       404:
 *         description: Không tìm thấy bài viết
 */

/**
 * @openapi
 * /api/posts/like-dislike:
 *   post:
 *     summary: Like hoặc bỏ like bài viết
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật trạng thái like thành công
 *       404:
 *         description: Không tìm thấy bài viết
 */

/**
 * @openapi
 * /api/posts/owner:
 *   get:
 *     summary: Lấy tất cả bài viết của người dùng hiện tại
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Thành công
 */

/**
 * @openapi
 * /api/posts/user/{userId}:
 *   get:
 *     summary: Lấy bài viết của người dùng theo ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công
 */

/**
 * @openapi
 * /api/posts/search:
 *   get:
 *     summary: Tìm kiếm bài viết theo từ khóa
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công
 *       400:
 *         description: Thiếu query tìm kiếm
 */

router.post("/", verifyToken, addPost);
router.post("/like-dislike", verifyToken, likeDislikePost);
router.get("/owner", verifyToken, getPostsByUser);
router.get("/user/:userId", getPostsByUserId);
router.get("/", getAllPosts);
router.get("/search", searchPosts);
router.get("/:postId", getPostById);

export default router;
