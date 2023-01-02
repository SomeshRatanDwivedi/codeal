const mongoose=require('mongoose');
const env=require('./environment');
mongoose.connect(`mongodb://localhost/${env.db}`);
const db=mongoose.connection;
db.on('error', console.error.bind(console, 'error occured'));
db.once('open', ()=>{
    console.log("database connected successfully");
})


module.exports=db;