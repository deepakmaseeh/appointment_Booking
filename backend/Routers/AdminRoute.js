const express = require('express');
// const { loginAuth } = require("../Middleware/loginAuth");
const upload =require('../Middleware/multer')
const router = express.Router();
const multer = require("multer");
var isLoggedIn= require('../Middleware/loginAuth')
const {changeAvailability} = require('../Controller/doctorController')


const {addDoctor,adminLogin,allDoctors} =require('../Controller/admincontroller')


router.post('/addDoctor',isLoggedIn,upload.single('image'),addDoctor)
router.post('/adminLogin',adminLogin)
router.get('/allDoctors', isLoggedIn, allDoctors)
router.post('/changeAvailability',isLoggedIn,changeAvailability)



module.exports = router