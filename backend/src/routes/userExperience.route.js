import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  getExperience,
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
  getExperiencesByUserId,
} from "../controllers/userExperience.controller.js";

const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: UserExperiences
 *   description: API quản lý kinh nghiệm làm việc của người dùng
 */

/**
 * @openapi
 * /api/experiences:
 *   get:
 *     summary: Lấy tất cả kinh nghiệm của người dùng hiện tại
 *     tags: [UserExperiences]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách kinh nghiệm
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 experiences:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       userId:
 *                         type: string
 *                       designation:
 *                         type: string
 *                       company_name:
 *                         type: string
 *                       duration:
 *                         type: string
 *                       location:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 */

/**
 * @openapi
 * /api/experiences/user/{userId}:
 *   get:
 *     summary: Lấy kinh nghiệm theo userId
 *     tags: [UserExperiences]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách kinh nghiệm
 */

/**
 * @openapi
 * /api/experiences/{experienceId}:
 *   get:
 *     summary: Lấy chi tiết một kinh nghiệm
 *     tags: [UserExperiences]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: experienceId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chi tiết kinh nghiệm
 *       404:
 *         description: Không tìm thấy kinh nghiệm
 *   put:
 *     summary: Cập nhật một kinh nghiệm
 *     tags: [UserExperiences]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: experienceId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               designation:
 *                 type: string
 *               company_name:
 *                 type: string
 *               duration:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy kinh nghiệm
 *   delete:
 *     summary: Xóa một kinh nghiệm
 *     tags: [UserExperiences]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: experienceId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy kinh nghiệm
 */

/**
 * @openapi
 * /api/experiences:
 *   post:
 *     summary: Tạo kinh nghiệm mới
 *     tags: [UserExperiences]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - designation
 *               - company_name
 *               - duration
 *               - location
 *             properties:
 *               designation:
 *                 type: string
 *                 example: "Fullstack Developer"
 *               company_name:
 *                 type: string
 *                 example: "Tech Company"
 *               duration:
 *                 type: string
 *                 example: "Jan 2022 - Dec 2023"
 *               location:
 *                 type: string
 *                 example: "Ho Chi Minh City"
 *     responses:
 *       201:
 *         description: Tạo kinh nghiệm thành công
 *       500:
 *         description: Lỗi server
 */

router.get("/", verifyToken, getExperiences);
router.get("/user/:userId", verifyToken, getExperiencesByUserId);
router.get("/:experienceId", verifyToken, getExperience);
router.post("/", verifyToken, createExperience);
router.put("/:experienceId", verifyToken, updateExperience);
router.delete("/:experienceId", verifyToken, deleteExperience);

export default router;
