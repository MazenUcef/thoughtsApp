import mongoose from "mongoose";


const Schema = mongoose.Schema;


const postSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
    },
    img: {
        type: String
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    comments: [
        {
            text: {
                type: String,
                required: true
            },
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            }
        }
    ]
}, { timestamps: true });



const Post = mongoose.model("Post", postSchema)

export default Post;