const mongoose =require('mongoose');

const likeSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    likeable:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        refPath:'onModel'

    },
    onModel:{
        type:String,
        required:true,
        enum:['Post', 'Comment']

    }
},
{
    timestamps:true
});


const Like=mongoose.model('Like', likeSchema);


module.exports=Like;