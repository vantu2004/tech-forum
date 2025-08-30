import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { addPost, likeDislikePost } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/", verifyToken, addPost);
router.post("/like-dislike", verifyToken, likeDislikePost);
export default router;
