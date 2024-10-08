import Notification from "../models/notificationModel.js";

export const getNotifications = async (req, res) => {
    try {
        const userId = req.user._id;
        const notifications = await Notification.find({ to: userId })
            .populate({
                path: "from",
                select: "username profileImage"
            })
            .populate({
                path: "comment",
                select: "text postId",
                populate: {
                    path: "postId",
                    select: "title"
                }
            });

        await Notification.updateMany({ to: userId }, { read: true });
        
        // console.log(notifications); // Log the notifications
        
        res.status(200).json(notifications);
    } catch (error) {
        console.log("Error in getNotifications Controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};




export const deleteNotifications = async (req, res) => {
    try {
        const userId = req.user._id;
        await Notification.deleteMany({ to: userId });
        res.status(200).json({ message: "Notifications deleted successfully" });
    } catch (error) {
        console.log("Error in deleteNotifications Controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });

    }
}


export const deleteOneNotifications = async (req, res) => {
    try {
        const notificationId = req.params.id;
        const userId = req.user._id;
        const notification = await Notification.findById(notificationId);
        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }

        if (notification.to.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Unauthorized to delete this notification" });
        }

        await Notification.findByIdAndDelete(notificationId);
        res.status(200).json({ message: "Notification deleted successfully" });

    } catch (error) {
        console.log("Error in deleteOneNotifications Controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });

    }
}