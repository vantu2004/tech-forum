import express from "express";
import {
  getUserProfile,
  getUserProfileByUserId,
  updateProfile,
  getUserProfileByQuery,
} from "../controllers/userProfile.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";


//upload cv

const router = express.Router();

// lấy profile của bản thân
router.get("/", verifyToken, getUserProfile);
// lấy profile theo param truyền trong query string (search) (pahir đặt trên URL dưới)
router.get("/search", verifyToken, getUserProfileByQuery);
// lấy profile theo userId truyền dạng dữ liệu động trong URL
router.get("/:userId", getUserProfileByUserId);
router.put("/", verifyToken, updateProfile);


export default router;
