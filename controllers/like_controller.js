const Comment = require("../models/comment");
const Like = require("../models/like");
const Post = require("../models/post");
module.exports.toggleLike=async (req, res)=>{
    try{
      
        let likeable;
        if(req.params.type=='Post'){
          likeable=await Post.findById(req.params.id).populate('like');
        }
        else{
          likeable=await Comment.findById(req.params.id).populate('like');
        }
        let isUserLikes=await Like.findOne({
          user:req.user._id,
          likeable:req.params.id,
          onModel:req.params.type
        })
       if(isUserLikes){
           await likeable.updateOne({_id:req.params._id}, {$pull:{like:isUserLikes._id}});
           isUserLikes.remove();
      }
      else{
          const like= await Like.create({
              user:req.user._id,
              likeable:req.params.id,
              onModel:req.params.type
          });
          likeable.like.push(like._id);
          likeable.save();
          // console.log(likeable);
          // await likeable.updateOne({_id:req.params._id}, {$push:{like:like._id}});
          // console.log(likeable)

  
      }
      return res.redirect('back')
    }catch(err){
        console.log("err in liking", err)
        return res.redirect('back')
    }

};

