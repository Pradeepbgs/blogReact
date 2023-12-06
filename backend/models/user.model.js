import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    post: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    }],
    dp: {
        type: String,
        default:"https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
    }
},{timestamps: true})

export const User = mongoose.model("User", userSchema)