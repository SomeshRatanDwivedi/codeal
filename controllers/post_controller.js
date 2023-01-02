const Comment = require("../models/comment");
const Post = require("../models/post");




module.exports.post=(req, res)=>{
     Post.create({
        content:req.body.content,
        user:req.user._id
     }, (err, post)=>{
        if(err){
            console.log("err in post creation", err);
            return;
        }
        res.redirect('back');
     })
};
module.exports.delete=async (req, res)=>{
    try{
        let post=await Post.findById(req.params.id);
        if(post.user==req.user.id){
            post.remove();
            await Comment.deleteMany({post:req.params.id});
        }
            return res.redirect('back');

    }catch(err){
        console.log("err, in deleting post", err);
    }
}