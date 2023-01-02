const User = require('../models/user')
const fs=require('fs');
const path=require('path');

module.exports.profile = async (req, res) => {
    const user = await User.find({ _id: req.params.id });
    return res.render('profile', {
        profile: user[0]
    })
}

module.exports.signIn = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile')
    }
    return res.render('user_sign_in')
}

module.exports.sinUp = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile')
    }
    return res.render('user_sign_up')
}

module.exports.create = async (req, res) => {

    try {
        if (req.body.password != req.body.confirm_password) {
            return res.redirect('back');
        }
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            await User.create(req.body);
            return res.redirect('/users/sign-in');

        }

    } catch (err) {
        console.log("error in finding user", err);
    }
}

module.exports.createSession = (req, res) => {
    req.flash('success', 'Logged in Successfully')
    res.redirect('/')
}
module.exports.destroySession = (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
        req.flash('success', 'Logged out Successfully')
        res.redirect('/');
    });
}


module.exports.update = async (req, res) => {
    if (req.user.id == req.params.id) {
        try {
            let user = await User.findById(req.params.id);
            User.uploadAvtar(req, res,(err) => {
                if (err) {
                    console.log("multer err", err);
                }
                user.name = req.body.name;
                user.email = req.body.email;
                if (req.file) {
                    let imagePath=path.join(__dirname, '..', user.avtar);
                    if(user.avtar && fs.existsSync(imagePath)){
                        fs.unlinkSync(imagePath);
                    }

                    user.avtar =User.avtarPath+'/'+req.file.filename;
                }
                user.save();

            })
            res.redirect('back')

        } catch (err) {
            console.log("err in update function", err);
            return res.redirect('back');
        }

    }
    else {
        res.redirect('back');

    }

}