import jwt from 'jsonwebtoken'

function createToken(user){
    return jwt.sign({
        _id: user._id,
        email: user.email,
        name: user.name,
    }, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    } )
}

function validateToken(token){
  try {
    if(!token) return null;
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
  } catch (error) {
    console.log("error in getUser, JWT Verification error::",error)
    throw error;
  }

}

export {createToken, validateToken}