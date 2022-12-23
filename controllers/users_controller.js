const User=require('../models/user')

module.exports.profile=(req, res)=>{
    const id=req.cookies.user_id
    if(id){
        User.findOne({_id:id}, (err, user)=>{
            if(err){
                console.log("err in profile function");
                return;
            }
            if(!user){
                return res.redirect('/users/sign-in');
            }
            return res.render('profile', {
                name:user.name,
                email:user.email
            })
        })
    }
    else{

        return res.redirect('/users/sign-in')
    }
   
}

module.exports.signIn=(req, res)=>{
    return res.render('user_sign_in')
}

module.exports.sinUp=(req, res)=>{
    return res.render('user_sign_up')
}

module.exports.create=(req, res)=>{
     if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
     }
     User.findOne({email:req.body.email},(err, user)=>{
        if(err){
            console.log("error in finding user in create function");
            return;
        }
        if(!user){
            User.create(req.body, (err, user)=>{
                if(err){
                    console.log("error in creating user in create function");
                    return;
                }
                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }
     })
}

module.exports.createSession=(req, res)=>{
    User.findOne({email:req.body.email}, (err, user)=>{
        if(err){
            console.log("error in creating user in createSession function");
            return;
        }
        if(user){
            if(user.password!=req.body.password){
                return res.redirect('back');
            }
            res.cookie('user_id', user._id);
            res.redirect('/users/profile');
        }
        else{
            return res.redirect('back')
        }
    })


}