const express=require('express');
const router=express.Router();

const {googlelogin, verifytoken, getpicture}=require('../controllers/auth');


router.post('/googlelogin',googlelogin);
router.post('/verifytoken',verifytoken);
router.get('/getpicture',getpicture)
module.exports=router;