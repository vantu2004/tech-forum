import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  addPost,
  likeDislikePost,
  getAllPosts,
  getPostById,
  getPostsByUser,
  getPostsByUserId,
  searchPosts,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/", verifyToken, addPost);
router.post("/like-dislike", verifyToken, likeDislikePost);
router.get("/owner", verifyToken, getPostsByUser);
router.get("/user/:userId", getPostsByUserId);
router.get("/", getAllPosts);
router.get("/search", searchPosts);
router.get("/:postId", getPostById);

export default router;
