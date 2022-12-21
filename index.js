const express=require('express');
const port=8000;
const app=express();





app.get('/', (req, res)=>{
    res.send("<h1>Success</h1>")
})




app.listen(port, (err)=>{
    if(err){
        console.log("err", err);
        return;
    }
    console.log("server running successfully on port: ", port);

})