import express from "express";
import { protectedRoute } from "../middleware/protectedRoute.js";
import { commentOnPost, createPost, deletePost, getAllPosts, getFollowingPosts, getLikedPosts, getUserPosts, likeUnlikePost } from "../controllers/post.controller.js";

const router = express.Router();


router.get('/all' , protectedRoute , getAllPosts)
router.get('/following' , protectedRoute , getFollowingPosts)
router.get('/user/:username' , protectedRoute , getUserPosts)
router.get('/likes/:id' , protectedRoute , getLikedPosts)
router.post("/create", protectedRoute, createPost)
router.delete("/:id", protectedRoute, deletePost)
router.post("/comment/:id", protectedRoute, commentOnPost)
router.post("/like/:id", protectedRoute, likeUnlikePost)

export default router