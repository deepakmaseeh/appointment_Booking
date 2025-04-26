const express  = require("express");
const jwt = require("jsonwebtoken") 
const validator = require("validator")
var bcrypt = require("bcrypt");
var cloudinary= require('cloudinary')
const doctor = require("../Model/doctorModel")
var upload =require('../Middleware/multer')
 

exports.addDoctor  =async(req,res)=>{
    try {
        const{name ,email, password ,speciality ,degree,   experience ,about ,fees ,address}= req.body
        const imageFile = req.file
        console.log({name ,email, password ,speciality ,degree,  experience ,about ,fees ,address});

        if(!name||!email||! password ||!speciality ||!degree||!experience ||!about||!fees ||!address){
            // console.log("pw skill");
            
            return res.json({success:false, message:"missing details"})
            // console.log("hiii");
            
        }
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"plz enter valid email"})
        }
        if(password.length <8){
            return res.json({success:false, message:"enter a strong password"})
        }
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
            resource_type: "image",
          });

        // const imageUplode = await cloudinary.Uploader.upload(imageFile.path, {resource_type:"image"})
        const imageUrl = imageUpload.secure_url

        const doctorData ={
            name,
            email,
            image:imageUrl,
            // password:hashedPasswod,
            password,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date:Date.now()
        }
        const newDoctor= new doctor(doctorData)
        await newDoctor.save()
        res.json({success:true, message:"new Doctor is added"})

    } catch (error)
     {
        console.log(error);
        res.status(500).json({message: error.message})
        
    }
}


 
exports.adminLogin =async(req,res)=>{
  const { email,password}=req.body;
  // res.status(200).json({username, email,password})
   
  try {
   if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
    //  res.json({success:true, message:"correct details"})
     let token = await jwt.sign(email+password, process.env.JWT_SECRET_KEY)
        res.json({success:true, token})  
   }

   else{
    return res.json({success:false, message:"OOps! somthing went wrong "})
   }
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

exports.allDoctors =async(req,res)=>{
    try {
        const doctors = await  doctor.find({}).select('-password')
        res.json({success:true, doctors })
        
    } catch (error) {
        res.status(500).json({message: error.message})

    }
}
