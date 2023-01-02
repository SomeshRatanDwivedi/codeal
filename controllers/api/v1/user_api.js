const User=require('../../../models/user');
const jwt=require('jsonwebtoken');
module.exports.signIn=async (req, res)=>{
    try{
        let user=await User.findOne({email:req.body.email});
        if(!user || user.password!=req.body.password){
            return res.json(400, {
                message:"username/password does not match",
            })
        }
        return res.json(200, {
            mesaage:"sign in successfully",
            data:{
                token:jwt.sign(user.toJSON(), 'codeal', {expiresIn:'100000000'})

            }
        })

    }catch(err){
        return res.json(500, {
            message:"Internal server error"
        })
    }
     

}