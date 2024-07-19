import Notification from "../models/notificationModel.js";
import Post from "../models/postModels.js";
import User from "../models/userModel.js";

export const createPost = async (req, res) => {
    try {
        const { text } = req.body;
        let { img } = req.body;
        const userId = req.user._id.toString();
        

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (!text && !img) {
            return res.status(400).json({ error: "Post must have text or image" });
        }

        if (img) {
            const uploadedResponse = await cloudinary.uploader.upload(img);
            img = uploadedResponse.secure_url;
        }

        const newPost = new Post({
            user: userId,
            user,
            
            text,
            img,
        });

        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.log("Error in createPost controller: ", error);
    }
};


export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        if (post.img) {
            const imgId = post.img.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(imgId);
        }
        await Post.findByIdAndDelete(req.params.id)

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.log("Error in deletePost Controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export const commentOnPost = async (req, res) => {
    try {
        const { text } = req.body;
        const postId = req.params.id;
        const userId = req.user._id.toString();
        // console.log(req.body);

        if (!text) {
            return res.status(400).json({ message: "Text is required for comment" });
        }
        const post = await Post.findById(postId)
        if (!post) return res.status(404).json({ message: "Post not found" });



        const comment = { user: userId, text }
        post.comments.push(comment);
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        console.log("Error in commentOnPost Controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });

    }
}


export const likeUnlikePost = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id: postId } = req.params;


        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: "Post not found" });

        const userLikedPost = post.likes?.includes(userId)

        if (userLikedPost) {
            await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
            await User.updateOne({ _id: userId }, { $pull: { likedPosts: userId } });
            res.status(200).json({ message: "Post Unliked successfully" });
        } else {
            post.likes?.push(userId);
            await User.updateOne({ _id: userId }, { $push: { likedPosts: postId } });
            await post.save();
            const notification = new Notification({
                type: "like",
                from: userId,
                to: post.user
            })
            await notification.save();

            res.status(200).json({ message: "Post Liked successfully" });
        }
    } catch (error) {
        console.log("Error in likeUnlikePost Controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .populate({
                path: "user",
                select: "-password",
            })
            .populate({
                path: "comments.user",
                select: "-password",
            });

        if (posts.length === 0) {
            return res.status(200).json([]);
        }

        res.status(200).json(posts);
    } catch (error) {
        console.log("Error in getAllPosts controller: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
};



export const getLikedPosts = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const likedPosts = await Post.find({ _id: { $in: user.likedPosts } })
            .populate({
                path: 'user',
                select: '-password'
            }).populate({
                path: 'comments.user',
                select: '-password'
            })

        res.status(200).json(likedPosts)
    } catch (error) {
        console.log("Error in getLikedPosts Controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });

    }

}

export const getFollowingPosts = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });
        const following = user.following
        const feedPosts = await Post.find({ user: { $in: following } })
            .sort({ createdAt: -1 })
            .populate({
                path: 'user',
                select: '-password'
            }).populate({
                path: 'comments.user',
                select: '-password'
            })

        res.status(200).json(feedPosts)
    } catch (error) {
        console.log("Error in getFollowingPosts Controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });

    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: "User not found" });
        const posts = await Post.find({ user: user._id }).sort({ createdAt: -1 }).populate({
            path: 'user',
            select: '-password'
        }).populate({
            path: 'comments.user',
            select: '-password'
        })

        res.status(200).json(posts)
    } catch (error) {
        console.log("Error in getUserPosts Controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });

    }
}