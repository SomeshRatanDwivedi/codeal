const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/user')
passport.use(new LocalStrategy({
    usernameField:'email'
},
(email, password, done)=>{
    User.findOne({email:email}, (err, user)=>{
        if(err){
            console.log("err in passport");
            return done(err);
        }
        if(!user || user.password!=password){
            console.log("invalid username/password");
            return done(null, false);
        }
        return done(null, user);
    })

}));


//saving the id in cookies(serializing the use to decide which key is to be kept in cookies)

passport.serializeUser((user, done)=>{
    done(null, user.id)
})





//getting the id from cookies (deserializing the use from the try in cookies)
passport.deserializeUser((id, done)=>{
    User.findById(id, (err, user)=>{
        if(err){
            console.log("err in deserialize function");
            return ;
        }
        return done(null, user);
    })

})

passport.checkAuthentication=(req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser=(req, res, next)=>{
    if(req.isAuthenticated()){
       res.locals.user=req.user;
    }
    next();
}


module.exports=passport;