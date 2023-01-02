const express=require('express');
const router=express.Router();
const likeController=require('../controllers/like_controller')

router.get('/toggle/:id/:type', likeController.toggleLike);






module.exports=router