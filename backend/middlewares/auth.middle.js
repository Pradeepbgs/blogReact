import jwt from "jsonwebtoken"
import { apiError } from "../utils/apiError.js"
import { User } from "../models/user.model.js"


export const verifyToken = async (req, _, next) => {
     try {
        const token = req.cookies.accessToken || req.headers.authorization.split(" ")[1]

        if(!token) throw new apiError(401, "You are not authenticated")

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken.id).select("-password -refreshToken")
        if(!user) throw new apiError(401, "invalid access token")

        req.user = user;
        next()
     
     } catch (error) {
        throw new apiError(401, error.message || "Something went wrong while verifying access token")
     }
}
