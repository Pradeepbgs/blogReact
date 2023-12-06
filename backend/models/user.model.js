import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        index: true
    },
    password:{
        type: String,
        required: [true, "Password is required"],
    },
    post: [{
        type: Schema.Types.ObjectId,
        ref: "Post",
    }],
    dp: {
        type: String,
        default:"https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
    },
    refreshToken: {
        type: String,
    }
},{timestamps: true})

// userSchema.pre("save", async function(next){
//     if(!this.isModified("password")) return next()
    
//     this.password = await bcrypt.hash(this.password, 10)
//     next()
// })

// userSchema.methods.isPasswordCorrect = async function(password){
//     return await bcrypt.compare(password, this.password)
// }

// userSchema.methods.generateAccessToken = async function(){
//    return jwt.sign(
//         {
//             _id: this._id,
//             email: this.email,
//             name: this.name,
//         },
//         process.env.ACCESS_TOKEN_SECRET,
//         {
//             expiresIn: process.env.ACCESS_TOKEN_EXPIRY
//         }
//     )
// }

// userSchema.methods.generateRefreshToken = async function(){
//     return jwt.sign(
//         {
//             _id: this._id,
//             email: this.email,
//             name: this.name,
//         },
//         process.env.REFRESH_TOKEN_SECRET,
//         {
//             expiresIn: process.env.REFRESH_TOKEN_EXPIRY
//         }
//     )
// }

export const User = mongoose.model("User", userSchema)