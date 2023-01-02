let Post=require('../../../models/post');
let Comment=require('../../../models/comment')

module.exports.index=async (req, res)=>{
    try{

        let posts=await Post.find({})
        .populate('user')
        .populate({
            path:'comment',
            populate:({
                path:'user'
            })
        });
        return res.json(200, {
            message:"List of post",
            posts:posts
        })
    }catch(err){
        return res.json(500, {
            message:'internal server error'
        })
    }
    
}


module.exports.delete=async (req, res)=>{
    try{
        let post=await Post.findById(req.params.id);
            post.remove();
            await Comment.deleteMany({post:req.params.id});
    
            return res.json(200,{
                message:'post deleted'
            });

    }catch(err){
        return res.json(500, {
            message:'internal server error'
        })
    }
}