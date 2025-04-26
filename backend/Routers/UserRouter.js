const express = require('express');
const router = express.Router();
const  userloginAuth  = require("../Middleware/userloginAuth");
const upload =require('../Middleware/multer')

const {signUp,
    signIn,
    getUserProfile,
    updateProfile,
    bookAppointment,
    listOfAppointment,
    cancelAppointment
    } =require('../Controller/userController')

router.post('/userSignUp', signUp)

router.post("/signIn",signIn)

router.get("/getUserProfile" ,userloginAuth ,getUserProfile)

router.post('/updateProfile',upload.single('image'), userloginAuth, updateProfile)  
    
router.post('/bookAppointment', userloginAuth, bookAppointment) 

router.get('/listOfAppointment',userloginAuth , listOfAppointment) 

router.post('/cancelAppointment', userloginAuth ,cancelAppointment) 

module.exports = router




