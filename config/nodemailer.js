const { Template } = require('ejs');
const nodemailer=require('nodemailer');
const env=require('./environment')

let transporter=nodemailer.createTransport(env.smtp)


let renderTemplate=(data, reletivePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', reletivePath),
        data,
        (err, template)=>{
            if(err){
                console.log("err in render template");
                return;
            }
            mailHTML=template
        }
    )
    return mailHTML;
}




module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}


// client-id=412702894988-fv422g41iearb7f5br2n113o1civk1o8.apps.googleusercontent.com
// secret-key=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