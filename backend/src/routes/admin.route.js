import express from "express";
import { adminLogin, getAllUsers, getUserById, updateUser, deleteUser

 } from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/users", getAllUsers);
router.get("/users/:userId", getUserById);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;