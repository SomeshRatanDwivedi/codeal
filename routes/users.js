const express=require('express');
const router=express.Router();
const usersController=require('../controllers/users_controller')
router.get('/profile', usersController.profile);
router.get('/sign-in', usersController.signIn);
router.get('/sign-up', usersController.sinUp);
router.post('/create', usersController.create);


module.exports=router;