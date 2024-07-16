import express from "express";
import { signin, signout, signup, getMe } from "../controllers/auth.controller.js";
import { protectedRoute } from "../middleware/protectedRoute.js";




const router = express.Router();

router.get('/me', protectedRoute, getMe)
router.post('/signup', signup)
router.post('/signin', signin)
router.post('/signout', signout)


export default router