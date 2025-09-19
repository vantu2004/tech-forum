import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createComment,
  getAllComments,
  getCommentsPaginated,
  likeDislikeComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/", verifyToken, createComment);
router.get("/pagination/:postId", getCommentsPaginated);
router.get("/:postId", getAllComments);
router.put("/like-dislike", verifyToken, likeDislikeComment);

export default router;
