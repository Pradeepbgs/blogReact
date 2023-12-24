import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import {apiResponse}  from '../utils/apiResponse.js'

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

async function handleSubmitLogin(req, res, next) {
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


async function handleSubmitLogout(req, res, next) {
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

export { 
  handleSubmitLogin, 
  handleSubmitRegister , 
  handleSubmitLogout
};
