import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createConversation,
  getConversation,
} from "../controllers/conversation.controller.js";

const router = express.Router();

router.post("/", verifyToken, createConversation);
router.get("/", verifyToken, getConversation);

export default router;
