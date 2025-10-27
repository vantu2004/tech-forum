import express from "express";
import {
  checkAuth,
  login,
  loginGoogle,
  logout,
  register,
  verifyEmail,
  forgotPassword,
  resetPassword,
} from "../controllers/userAuth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API xác thực người dùng
 */

/**
 * @swagger
 * /api/users/check-auth:
 *   get:
 *     summary: Kiểm tra trạng thái xác thực JWT
 *     description: Xác minh token JWT hợp lệ. Nếu hợp lệ, trả thông tin người dùng hiện tại.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []   # Gửi header Authorization: Bearer <token>
 *     responses:
 *       200:
 *         description: Token hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 userAuth:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "66f09b9186e6f4bbd4500e12"
 *                     name:
 *                       type: string
 *                       example: "Nguyen Van A"
 *                     email:
 *                       type: string
 *                       example: "a@gmail.com"
 *                     role:
 *                       type: string
 *                       example: "user"
 *       401:
 *         description: Token không hợp lệ hoặc hết hạn
 */
router.get("/check-auth", verifyToken, checkAuth);

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Đăng ký tài khoản mới
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Nguyễn Văn A
 *               email:
 *                 type: string
 *                 example: example@gmail.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Đăng ký thành công và gửi email xác minh
 *       400:
 *         description: Thiếu dữ liệu hoặc tài khoản đã tồn tại
 */
router.post("/register", register);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Đăng nhập bằng email và mật khẩu
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: example@gmail.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Đăng nhập thành công, trả JWT qua cookie
 *       403:
 *         description: Email chưa xác minh
 *       404:
 *         description: Thông tin đăng nhập không hợp lệ
 */
router.post("/login", login);

/**
 * @swagger
 * /api/users/google:
 *   post:
 *     summary: Đăng nhập bằng Google OAuth2
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *             properties:
 *               code:
 *                 type: string
 *                 example: "4/0AfJohXx..."
 *     responses:
 *       200:
 *         description: Đăng nhập Google thành công
 *       400:
 *         description: Thiếu code hoặc tài khoản Google không hợp lệ
 */
router.post("/google", loginGoogle);

/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     summary: Đăng xuất người dùng hiện tại
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Đăng xuất thành công (xóa cookie JWT)
 */
router.post("/logout", logout);

/**
 * @swagger
 * /api/users/verify-email:
 *   post:
 *     summary: Xác minh email người dùng bằng OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - OTP
 *             properties:
 *               email:
 *                 type: string
 *                 example: example@gmail.com
 *               OTP:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Xác minh email thành công
 *       400:
 *         description: Mã OTP không hợp lệ hoặc đã hết hạn
 */
router.post("/verify-email", verifyEmail);

/**
 * @swagger
 * /api/users/forgot-password:
 *   post:
 *     summary: Gửi email khôi phục mật khẩu
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: example@gmail.com
 *     responses:
 *       200:
 *         description: Đã gửi email khôi phục mật khẩu
 *       404:
 *         description: Không tìm thấy người dùng
 */
router.post("/forgot-password", forgotPassword);

/**
 * @swagger
 * /api/users/reset-password/{token}:
 *   post:
 *     summary: Đặt lại mật khẩu bằng token trong email
 *     tags: [Auth]
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         description: Token khôi phục mật khẩu
 *         schema:
 *           type: string
 *           example: "7b9a5c8f..."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 example: "newpassword123"
 *     responses:
 *       200:
 *         description: Đặt lại mật khẩu thành công
 *       400:
 *         description: Token không hợp lệ hoặc đã hết hạn
 */
router.post("/reset-password/:token", resetPassword);

export default router;
