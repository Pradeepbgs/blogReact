import { Post } from "../models/post.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";

async function addPost(req, res){
    try {
        const {title, description, image, createdBy} = req.body;
        const user = req.user;

        const imagePath = req.files?.image[0].path;

        if(!imagePath) return res.status(400).json({message: "Image is required"})

        const post = await uploadOnCloudinary(imagePath)
        if(!post) res.status(400).json({message: "image uploading problem on cloudinary"})
       const createdPost =  await Post.create({
            title,
            description,
            image: post.url,
            createdBy: user._id,
        })
        if(!createdPost) res.status(400).json({message: "post not created"})
        res.status(200),json({message: "post created successfully", post: createdPost})
    } catch (error) {
        console.log("error in server, addpost.js")
        throw error;
    }
}

export {addPost}