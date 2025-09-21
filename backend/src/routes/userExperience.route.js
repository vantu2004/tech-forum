import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  getExperience,
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/userExperience.controller.js";

const router = express.Router();

router.get("/:experienceId", verifyToken, getExperience);
router.get("/", verifyToken, getExperiences);
router.post("/", verifyToken, createExperience);
router.put("/:experienceId", verifyToken, updateExperience);
router.delete("/:experienceId", verifyToken, deleteExperience);

export default router;
