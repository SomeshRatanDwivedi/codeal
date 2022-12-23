const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/codeal_development');
const db=mongoose.connection;
db.on('error', console.error.bind(console, 'error occured'));
db.once('open', ()=>{
    console.log("database connected successfully");
})


module.exports=db;