const express=require('express');
const router=express.Router();

const {addevent,getlistofevents}=require('../controllers/home');


router.post('/addevent',addevent);
router.get('/getlistofevents',getlistofevents);
module.exports=router;