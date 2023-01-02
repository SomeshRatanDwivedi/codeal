const nodeMailer=require('../config/nodemailer');



exports.newComment=(user)=>{
    console.log("inside comment");
    nodeMailer.transporter.sendMail({
        from:'ratandubeysomesh@gmail.com',
        to:user.email,
        subject:"New comment published",
        html:'<h1>Yup your comment is published</h1>'
    },
    (err, info)=>{
        if(err){
            console.log("err in sending mail", err);
            return;
        }
        console.log("mail sent", info)
    }
    );
}