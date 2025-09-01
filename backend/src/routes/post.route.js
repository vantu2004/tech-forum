import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  addPost,
  likeDislikePost,
  getAllPosts,
  getPostById,
  getPostsByUser,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/", verifyToken, addPost);
router.post("/like-dislike", verifyToken, likeDislikePost);
router.get("/", getAllPosts);
router.get("/:postId", getPostById);

// dùng chung để lấy các post cá nhân (lấy all hoặc giới hạn theo limit/skip)
router.get("/owner/:userId", getPostsByUser);

export default router;
