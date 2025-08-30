import express from "express";
import {
  getUserProfile,
  updateProfile,
} from "../controllers/userProfile.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/profile/:userId", getUserProfile);
router.put("/profile", verifyToken, updateProfile);

export default router;
``;
