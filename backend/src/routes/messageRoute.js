import express from 'express';
import { protectRoute } from '../middleware/authMiddle.js';
import { getMessages, getUserForSideBar, sendMessage } from '../controllers/messageController.js';

const router = express.Router();

router.get("/user", protectRoute, getUserForSideBar);

router.get("/:id", protectRoute, getMessages);

router.post("/send/:id", protectRoute, sendMessage);

export default router;