import mongoose from "mongoose";

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['follow', 'like', 'comment'] // Added 'comment' to the enum
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        required: function () {
            return this.type === 'comment';
        }
    },
    read: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
