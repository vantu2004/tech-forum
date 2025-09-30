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
router.get("/owner", verifyToken, getPostsByUser);
router.get("/", getAllPosts);
router.get("/:postId", getPostById);

export default router;
