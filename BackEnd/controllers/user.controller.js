import bcryptjs from "bcryptjs";
import Notification from "../models/notificationModel.js";
import User from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";

export const getUserProfile = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username })
        if (!user) return res.status(404).json({ error: "User not found" })
        res.status(200).json(user)
    } catch (error) {
        console.log("Error in getUserProfile Controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


export const followUnfollowUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id);

        if (id === req.user._id.toString()) {
            return res.status(400).json({ error: "You can't follow or unfollow yourself" })
        }

        if (!userToModify || !currentUser) return res.status(404).json({ error: "user not found" })

        const isFollowing = currentUser.following.includes(id)
        if (isFollowing) {
            await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } })
            await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } })
            res.status(200).json({ message: "User Unfollowed successfully" })

        } else {
            await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } })
            await User.findByIdAndUpdate(req.user._id, { $push: { following: id } })
            // send notification
            const newNotification = new Notification({
                type: "follow",
                from: req.user._id,
                to: userToModify._id
            })
            await newNotification.save()

            // TODO: send the id as a response the respnse
            res.status(200).json({ message: "User Followed successfully" })
        }
    } catch (error) {
        console.log("Error in followUnfollowUser Controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


export const getSuggestedUsers = async (req, res) => {
    try {
        const userId = req.user._id;

        const usersFollowedByMe = await User.findById(userId).select('following')

        const users = await User.aggregate([
            {
                $match: {
                    _id: { $ne: userId },
                }
            },
            { $sample: { size: 10 } }
        ])


        const filterUsers = users.filter(user => !usersFollowedByMe.following.includes(user._id))
        const suggestedUsers = filterUsers.slice(0, 4)

        suggestedUsers.forEach(user => user.password = null)
        res.status(200).json(suggestedUsers)
    } catch (error) {
        console.log("Error in getSuggestedUsers Controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });

    }
}


export const updateUser = async (req, res) => {
    const { username, email, fullName, currentPassword, newPassword, bio, link } = req.body;
    let { profileImage, coverImage } = req.body;
    // console.log(req.body);

    const userId = req.user._id;
    try {
        let user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }
        if ((currentPassword && !newPassword) || (!currentPassword && newPassword)) {
            return res.status(400).json({ error: "Please provide both currentPassword and newPassword or neither" })
        }
        if (currentPassword && newPassword) {
            const isMatch = await bcryptjs.compare(currentPassword, user.password)
            if (!isMatch) {
                return res.status(401).json({ error: "Incorrect current password" })
            }
            if (newPassword.length < 8) {
                return res.status(400).json({ error: "New password should be at least 8 characters long" })
            }
            user.password = bcryptjs.hashSync(newPassword, 10)
        }



        if (profileImage) {
            if (user.profileImage) {
                await cloudinary.uploader.destroy(user.profileImage.split("/").pop().split(".")[0]);
            }
            const uploadedResponse = await cloudinary.uploader.upload(profileImg);
            user.profileImage = uploadedResponse.secure_url;
        }


        if (coverImage) {
            if (user.coverImage) {
                await cloudinary.uploader.destroy(user.coverImage.split("/").pop().split(".")[0]);
            }
            const uploadedResponse = await cloudinary.uploader.upload(coverImg);
            user.coverImage = uploadedResponse.secure_url
        }
        user.fullName = fullName || user.fullName;
        user.username = username || user.username;
        user.email = email || user.email;;
        user.bio = bio || user.bio;;
        user.link = link || user.link;
        user.coverImage = coverImage || user.coverImage;
        user.profileImage = profileImage || user.profileImage


        // Exclude the password from the response
        const { password, ...userWithoutPassword } = user.toObject();


        user = await user.save();
        return res.status(200).json(userWithoutPassword)
    } catch (error) {
        console.log("Error in updateUser Controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });

    }
}