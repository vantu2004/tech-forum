import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  getPendingSentFriendships,
  getPendingReceivedFriendships,
  getAcceptedFriendships,
  getPeopleYouMayKnow,
  addFriendRequest,
  acceptFriendRequest,
  cancelFriendRequest,
  declineFriendRequest,
  removeFriendship,
} from "../controllers/userFriendship.controller.js";

const router = express.Router();

router.get("/pending-sent", verifyToken, getPendingSentFriendships);
router.get("/pending-received", verifyToken, getPendingReceivedFriendships);
router.get("/accepted", verifyToken, getAcceptedFriendships);
router.get("/related", verifyToken, getPeopleYouMayKnow);
router.post("/add", verifyToken, addFriendRequest);
router.post("/accept", verifyToken, acceptFriendRequest);
router.delete("/cancel", verifyToken, cancelFriendRequest);
router.delete("/decline", verifyToken, declineFriendRequest);
router.delete("/remove", verifyToken, removeFriendship);

export default router;
