import bcryptjs from "bcryptjs";
import User from "../models/userModel.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";

export const signup = async (req, res) => {
    try {
        const { fullName, email, username, password } = req.body;
        // console.log(req.body);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email address' });
        }
        const isUserExist = await User.findOne({ username })
        if (isUserExist) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const isEmailExist = await User.findOne({ email })
        if (isEmailExist) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        if (password.length < 8) {
            return res.status(400).json({ error: 'Password must be at least 8 characters long' });
        }
        const hashedPassword = bcryptjs.hashSync(password, 10);

        const newUser = new User({
            fullName,
            email,
            username,
            password: hashedPassword
        })
        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                fullName: newUser.fullName,
                followers: newUser.followers,
                following: newUser.following,
                profileImage: newUser.profileImage,
                coverImage: newUser.coverImage
            })
        } else {
            res.status(400).json({ error: 'Invalid user data' });
        }

        // res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.log("Error in signUp Controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}



export const signin = async (req, res) => {
    try {
        const { username, password } = req.body
        // console.log(req.body);
        const user = await User.findOne({ username })
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")
        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid password or username" })
        }

        generateTokenAndSetCookie(user._id, res)
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            fullName: user.fullName,
            followers: user.followers,
            following: user.following,
            profileImage: user.profileImage,
            coverImage: user.coverImage
        })
    } catch (error) {
        console.log("Error in signIn Controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}



export const signout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "signed out successfully" })
    } catch (error) {
        console.log("Error in signout Controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password")
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }
        res.status(200).json(user)
    } catch (error) {
        console.log("Error in getMe Controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}