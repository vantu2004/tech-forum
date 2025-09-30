import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  getPendingSentFriendships,
  getPendingReceivedFriendships,
  getAcceptedFriendships,
  addFriendship,
  acceptFriendRequest,
  declineFriendRequest,
  removeFriendship,
} from "../controllers/userFriendship.controller.js";

const router = express.Router();

router.get("/pending-sent", verifyToken, getPendingSentFriendships);
router.get("/pending-received", verifyToken, getPendingReceivedFriendships);
router.get("/accepted", verifyToken, getAcceptedFriendships);
router.post("/", verifyToken, addFriendship);
router.post("/accept", verifyToken, acceptFriendRequest);
router.delete("/decline", verifyToken, declineFriendRequest);
router.delete("/remove", verifyToken, removeFriendship);

export default router;
