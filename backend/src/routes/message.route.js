import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  getAllMessages,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/:conversationId", verifyToken, getAllMessages);
router.post("/", verifyToken, sendMessage);

export default router;
