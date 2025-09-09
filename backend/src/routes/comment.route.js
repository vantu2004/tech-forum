import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createComment,
  getAllComments,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/", verifyToken, createComment);
router.get("/:postId", getAllComments);

export default router;
