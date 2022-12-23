const User=require('../models/user')

module.exports.profile=(req, res)=>{
    return res.render('profile')
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
            console.log("error in finding user");
            return;
        }
        if(!user){
            User.create(req.body, (err, user)=>{
                if(err){
                    console.log("error in creating user");
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

}