



const development={
    name:'development',
    asset_path:'./assets',
    session_cookie_key:'blahsomething',
    db:'codeal_development',
    smtp:{
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:'somesh.dwivedi@thotnr.com',
            pass:'FirstNaukari@24012022'
        }
    },
    google_client_id: "412702894988-fv422g41iearb7f5br2n113o1civk1o8.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret:'codeal'

}



const production ={
    name:'production'
}


module.exports=development;