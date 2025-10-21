import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  getSkills,
  getSkillsByUserId,
  updateSkills,
} from "../controllers/userSkill.controller.js";

const router = express.Router();

router.get("/", verifyToken, getSkills);
router.get("/:userId", verifyToken, getSkillsByUserId);
router.put("/", verifyToken, updateSkills);

export default router;
