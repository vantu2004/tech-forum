import express from "express";
import upload from "../lib/multer.js";
import {
  getUserProfile,
  getUserProfileByUserId,
  updateProfile,
  getUserProfileByQuery,
  uploadUserCV,
  deleteUserCV,
  replaceUserCV,
} from "../controllers/userProfile.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";




const router = express.Router();

// lấy profile của bản thân
router.get("/", verifyToken, getUserProfile);
// lấy profile theo param truyền trong query string (search) (pahir đặt trên URL dưới)
router.get("/search", verifyToken, getUserProfileByQuery);
// lấy profile theo userId truyền dạng dữ liệu động trong URL
router.get("/:userId", getUserProfileByUserId);
router.put("/", verifyToken, updateProfile);
//upload cv
router.post("/resume", 
              verifyToken, 
              upload.single("resumeFile"), // bắt field resumeFile trong form-data
              uploadUserCV);
router.delete("/resume", verifyToken, deleteUserCV);
router.put("/resume", 
            verifyToken, 
            upload.single("resumeFile"), 
            replaceUserCV);


export default router;
