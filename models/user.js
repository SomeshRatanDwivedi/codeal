const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const AVATAR_PATH=path.join('/uploads/users/avtars');
const userSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    avtar:{
        type:String
    }
    
},
{
    timestamps:true
})


let storage=multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, path.join(__dirname,'..',AVATAR_PATH))
    },
    filename:(req, file, cb)=>{
        cb(null, file.fieldname+'-'+Date.now());
    }
});

userSchema.statics.uploadAvtar=multer({storage:storage}).single('avtar');
userSchema.statics.avtarPath=AVATAR_PATH;

const User=mongoose.model('User', userSchema);

module.exports=User