const express=require('express');
const cookieParser=require('cookie-parser');
const port=8000;
const app=express();
const db=require('./config/mongoose');
const expressLayouts=require('express-ejs-layouts');
app.use(expressLayouts);

app.set('view engine', 'ejs');

app.set('views', './views');

app.set('layout extractStyles', true);

app.set('layout extractScripts', true);

app.use(cookieParser())
app.use(express.urlencoded());

app.use(express.static('./assets'))

app.use('/', require('./routes'))









app.listen(port, (err)=>{
    if(err){
        console.log("err", err);
        return;
    }
    console.log("server running successfully on port: ", port);

})