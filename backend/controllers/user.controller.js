import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import {apiResponse}  from '../utils/apiResponse.js'
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Post } from "../models/post.model.js";


const generateAccessAndRefreshToken = async (userId) => {
   try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    user.save({validateBeforeSave: false});
    return { accessToken, refreshToken };
   } catch (error) {
     throw error("something went wrong while generating access and refresh token")
   }
}

async function handleSubmitRegister(req, res, next) {
  try {
    const { name, email, password } = req.body;

    if ([name, email, password].some((field) => field?.trim() === "")) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existedUser = await User.findOne({ email });

    if (existedUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    const user = await User.create({
      name,
      email,
      password,
    });
    if (!user) {
      return res.status(400).json({ error: "User not created" });
    }
    res.status(201).json({ user, message: "User created successfully" });
  } catch (error) {
    console.error("Error in user.controllers.js: while registering", error);
    // Pass the error to the error-handling middleware
    next(error);
  }
}

async function handleSubmitLogin(req, res) {
  const { email, password } = req.body;

  if(!(email || password)){
    throw new apiError(400,"email or password is required")
  }

   const user = await User.findOne({ email });
   if(!user) throw new apiError(404, "User not found")

   const isPasswordCorrect = await user.isPasswordCorrect(password)
   if(!isPasswordCorrect) throw new apiError(401, "Invalid password")
   
   const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

   const loggedUser = await User.findById(user._id).select("-password -refreshToken")

   const options = {
    httpOnly: true,
    secure: true,
   }

   return res.status(200)
   .cookie("refreshToken", refreshToken, options)
   .cookie("accessToken", accessToken, options)
   .json(
    new apiResponse(
    200,
    {
      user: loggedUser,
      accessToken: accessToken,
      refreshToken: refreshToken,
    },
    "User logged in successfully"
   ))
}

async function handleSubmitLogout(req, res) {
   await User.findByIdAndUpdate(req.user?._id, {
    $set: { refreshToken: null },
   }, { new : true });

   const options = {
    httpOnly: true,
    secure: true,
   }

   return res.status(200)
   .clearCookie("refreshToken", options)
   .clearCookie("accessToken", options)
   .json(
    new apiResponse(200, {}, "User logged out successfully")
   )
}

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
     res.json(400, error?.message || "something went wrong while adding post , pls try again")
  }
}

async function allpost(req, res){

  try {
    if(!req.user){
        return res.status(400).json({message: "User not found"});
    }
  
    const user = await User.findById(req.user._id).populate("post");
  
    return res
    .status(200)
    .json(200 , {posts: user.post}, "Post find successfully");
    
  } catch (error) {
    res.status(400).json({message: "something went wrong while finding post"})
  }
}

const editPost = async (req, res) => {
    const { id } = req.params;
    const { title, description} = req.body;
    const {image} = req.file;
    
   try {

     if(!id) return res.status(400).json({message: "Post id is required"})

    const post = await Post.findById(id);
    if(!post) return res.status(400).json({message: "Post not found"})

    if(title) post.title = title;
    if(description) post.description = description;

    if(image){
      const imagePath = req.file.path;
      const postImage = await uploadOnCloudinary(imagePath)

      if(!postImage){
        return res
        .status(400)
        .json({message: "image uploading problem on cloudinary"})
      }

      post.image = postImage.url;
    }

    await post.save();

    return res
    .status(200)
    .json( {post}, "Post updated successfully");


   } catch (error) {
    console.log("error in server user.controller.js")
    res.json(400, error?.message || "something went wrong while editing post , pls try again")
   }
}



export { 
  handleSubmitLogin, 
  handleSubmitRegister , 
  handleSubmitLogout,
  addPost,
  allpost,
  editPost,
};
