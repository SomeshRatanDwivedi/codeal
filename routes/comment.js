const express=require('express');
const passport = require('passport');
const router=express.Router();
const commentController=require('../controllers/comment_controller')
router.post('/create', commentController.createComment );
router.get('/delete/:id', passport.checkAuthentication, commentController.delete);




module.exports=router;