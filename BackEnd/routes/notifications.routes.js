import express from "express";
import { protectedRoute } from "../middleware/protectedRoute.js";
import { deleteNotifications, deleteOneNotifications, getNotifications } from "../controllers/notifications.controller.js";

const router = express.Router();


router.get("/", protectedRoute, getNotifications)
router.delete("/", protectedRoute, deleteNotifications)
router.delete("/:id", protectedRoute, deleteOneNotifications)

export default router;