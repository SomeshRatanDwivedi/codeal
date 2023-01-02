const Comment=require('../models/comment');
const Post=require('../models/post');
const commentsMailer=require('../mailers/comments_mailer');

module.exports.createComment=(req, res)=>{
    
    const commentBody={
        content:req.body.content,
        user:req.user._id,
        post:req.query.id
    }
    Comment.create(commentBody, (err, comment)=>{
        if(err){
            console.log("err in create comment function", err);
            return;
        }
        Post.updateOne({_id:req.query.id},{
            $push:{comment:comment._id}
        },(err, success)=>{
            if(err){
                console.log("err in creating comment in post",err );
                return;
            }
    

    })
    //commentsMailer.newComment(req.user)
        return res.redirect('back');
    })

};

module.exports.delete=(req, res)=>{
    Comment.findById(req.params.id, (err, comment)=>{
        if(err){
            console.log("err in deleteing comment", err);
            return;
        }
        if(comment.user==req.user.id){
            Post.updateOne({_id:comment.post}, {$pull:{comment:comment._id}},(err, success)=>{
                if(err){
                    console.log("err in updating post", err);
                    return;
                }
                comment.remove();
                return res.redirect('back');           
            });

        }
        else{
            return res.redirect('back');  

        }
    })
}