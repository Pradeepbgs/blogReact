import { User } from "../models/user.model";
import { Post } from "../models/post.model";


async function allpost(req, res){
    const {_id} = req.user;

    if(!_id){
        return res.status(400).json({message: "User not found"});
    }

    const user = await User.findById(_id).populate("post");

    return res
    .status(200)
    .json(200 , {posts: user.post}, "Post find successfully");
    
}

export default allpost;