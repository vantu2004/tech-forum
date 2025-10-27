import express from "express"; 
import upload from "../lib/multer.js";
import {
  getUserProfile,
  getUserProfileByUserId,
  updateProfile,
  getUserProfileByQuery,
  uploadUserCV,
  deleteUserCV,
  replaceUserCV,
  setCVAsDefault,
} from "../controllers/userProfile.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: UserProfile
 *   description: API quản lý profile và CV của người dùng
 */

/**
 * @openapi
 * /api/users/profile:
 *   get:
 *     summary: Lấy profile của chính user
 *     tags: [UserProfile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile của user
 */

/**
 * @openapi
 * /api/users/profile/{userId}:
 *   get:
 *     summary: Lấy profile của user theo userId
 *     tags: [UserProfile]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của user cần lấy profile
 *     responses:
 *       200:
 *         description: Profile của user
 */

/**
 * @openapi
 * /api/users/profile:
 *   put:
 *     summary: Cập nhật profile
 *     tags: [UserProfile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Các field cần update (có thể bao gồm profile_pic base64, cover_pic base64)
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Profile updated successfully
 */

/**
 * @openapi
 * /api/users/profile/search:
 *   get:
 *     summary: Tìm kiếm profile theo name hoặc email
 *     tags: [UserProfile]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Chuỗi tìm kiếm
 *     responses:
 *       200:
 *         description: Danh sách profile khớp query
 */

/**
 * @openapi
 * /api/users/profile/resume:
 *   post:
 *     summary: Upload CV mới
 *     tags: [UserProfile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               resumeFile:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: CV uploaded successfully
 *
 *   delete:
 *     summary: Xóa CV
 *     tags: [UserProfile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - resumeUrl
 *             properties:
 *               resumeUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: CV deleted successfully
 *
 *   put:
 *     summary: Thay thế CV cũ bằng CV mới
 *     tags: [UserProfile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - oldResumeUrl
 *               - resumeFile
 *             properties:
 *               oldResumeUrl:
 *                 type: string
 *               resumeFile:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: CV replaced successfully
 */

/**
 * @openapi
 * /api/users/profile/resume/default:
 *   put:
 *     summary: Đặt CV mặc định
 *     tags: [UserProfile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               resumeUrl:
 *                 type: string
 *                 description: URL của CV muốn đặt làm mặc định
 *     responses:
 *       200:
 *         description: CV set as default successfully
 */

router.get("/", verifyToken, getUserProfile);
router.get("/search", verifyToken, getUserProfileByQuery);
router.get("/:userId", getUserProfileByUserId);
router.put("/", verifyToken, updateProfile);
router.post("/resume", verifyToken, upload.single("resumeFile"), uploadUserCV);
router.delete("/resume", verifyToken, deleteUserCV);
router.put("/resume", verifyToken, upload.single("resumeFile"), replaceUserCV);
router.put("/resume/default", verifyToken, setCVAsDefault);

export default router;
