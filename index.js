const express=require('express');
const env=require('./config/environment')
const cookieParser=require('cookie-parser');
const port=8000;
const app=express();
const db=require('./config/mongoose');
const expressLayouts=require('express-ejs-layouts');
const session=require('express-session')
const passport=require('passport');
const passportJWT=require('./config/passport-jwt-strategy');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore=require("connect-mongo");
const flash=require('connect-flash');
const customMware=require('./config/middleware');
const passportGoogle=require('./config/passport-google-oauth2-strategy');

const chatServer=require('http').Server(app);
const chatSocket=require('./config/chat_socket').chatSocket(chatServer);
chatServer.listen(5000);
console.log("chat server is listening on port 5000")



app.use(express.urlencoded());
app.use(cookieParser())
app.use(express.static(env.asset_path));
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.set('view engine', 'ejs');
app.set('views', './views');
//mongo store is used to store the session cookie in db
app.use(session({
    name:'codeal',
    secret:env.session_cookie_key,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: MongoStore.create ({
        
        mongoUrl:`mongodb://localhost/codeal_development`,
        autoRemove:'disabled'
    
}, (err)=>{
        console.log("err in Mongostore")
    })
}));

app.use(passport.initialize());

app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);
app.use('/uploads', express.static(__dirname+'/uploads'))

app.use('/', require('./routes'))


















app.listen(port, (err)=>{
    if(err){
        console.log("err", err);
        return;
    }
    console.log("server running successfully on port: ", port);

})