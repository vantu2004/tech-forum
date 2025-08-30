import express from "express";
import {
  checkAuth,
  login,
  loginGoogle,
  logout,
  register,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);

router.post("/register", register);
router.post("/login", login);
router.post("/google", loginGoogle);

router.post("/logout", logout);

export default router;
