
async function allpost(req, res){
    console.log(req.user)

   return res.json({user: req.user})
}

export default allpost;