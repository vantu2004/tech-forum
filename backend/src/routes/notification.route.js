import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  getAllNotifications,
  getUnreadNotifications,
  markAsRead,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/", verifyToken, getAllNotifications);
router.put("/mark-as-read", verifyToken, markAsRead);
router.get("/unread", verifyToken, getUnreadNotifications);

export default router;
