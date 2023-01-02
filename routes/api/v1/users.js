const express=require('express');
const router=express.Router();
const userApi=require('../../../controllers/api/v1/user_api')

router.post('/sign-in',userApi.signIn)







module.exports=router