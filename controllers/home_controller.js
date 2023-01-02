const Post=require('../models/post');

module.exports.home=async (req, res)=>{
    try{

        let post=await Post.find({})
        .populate('user')
        .populate({
            path:'comment',
            populate:({
                path:'user'
            }),
            populate:({
                path:'like'
            })
        })
        .populate('like');
        return res.render('home',{
            posts:post,
        });
    }catch(err){
        console.log("err in home", err)
    }

}