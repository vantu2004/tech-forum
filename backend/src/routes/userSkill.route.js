import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  getSkills,
  getSkillsByUserId,
  updateSkills,
} from "../controllers/userSkill.controller.js";

const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: UserSkill
 *   description: API quản lý kỹ năng của người dùng
 */

/**
 * @openapi
 * /api/skills:
 *   get:
 *     summary: Lấy danh sách skills của chính user
 *     tags: [UserSkill]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách skills
 */

/**
 * @openapi
 * /api/skills/{userId}:
 *   get:
 *     summary: Lấy danh sách skills của user theo userId
 *     tags: [UserSkill]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của user cần lấy skills
 *     responses:
 *       200:
 *         description: Danh sách skills
 */

/**
 * @openapi
 * /api/skills:
 *   put:
 *     summary: Cập nhật danh sách skills của chính user
 *     tags: [UserSkill]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Mảng skills mới
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - skills
 *             properties:
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["JavaScript", "React", "Node.js"]
 *     responses:
 *       200:
 *         description: Skills updated successfully
 */

router.get("/", verifyToken, getSkills);
router.get("/:userId", verifyToken, getSkillsByUserId);
router.put("/", verifyToken, updateSkills);

export default router;
  