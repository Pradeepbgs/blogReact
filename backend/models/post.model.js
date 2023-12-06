import mongoose,{Schema} from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    createBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    date:{
        type: Date,
    }
}, {timestamps: true})

export const Post = mongoose.model('Post', postSchema)