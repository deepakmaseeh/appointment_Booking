const express  = require("express");
var bcrypt = require("bcrypt");
const Client = require("../Model/UserModel")
const jwt = require("jsonwebtoken")
var cloudinary= require('cloudinary')
var upload =require('../Middleware/multer')
const doctor = require("../Model/doctorModel")
var appointment= require('../Model/apponitmentModel')



exports.signUp =async(req,res)=>{
  const { username, email,password}= req.body
  try {
    const createUser = await Client.create({username, email,password})
     let token = await jwt.sign({id:createUser._id}, process.env.JWT_SECRET_KEY)
            res.json({success:true, token}) 
  
  
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

// exports.signUp = async (req, res) => {
//   const { username, email, password } = req.body;
//   console.log({username,email, password });
  

//   try {
//     // Basic input validation
//     if (!username || !email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields (userName, email, password) are required",
//       });
//     }

//     // Optional: Check if user already exists
//     const existingUser = await Client.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: "Email already in use. Please log in instead.",
//       });
//     }

//     // Create user
//     const createUser = await Client.create({ username, email, password });
//     console.log("User created:", createUser);
//     // Generate token
//     const token = jwt.sign({ id: createUser._id }, process.env.JWT_SECRET_KEY, {
//       // expiresIn: "1d",
//     });
      
//     res.json({ success: true, token });
//   } catch (error) {
//     // Handle duplicate key error
//     if (error.code === 11000) {
//       return res.status(400).json({
//         success: false,
//         message: `Duplicate field value: ${JSON.stringify(error.keyValue)}`,
//       });
//     }

//     console.error("Sign Up Error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Client.findOne({ email });

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email address" });
    }

    const isVerified = await bcrypt.compare(password, user.password);
    console.log("Password match:", isVerified);

    if (!isVerified) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" } // Optional: expires in 1 day
    );

    res.status(200).json({
      success: true,
      message: "User logged in successfully!",
      token,
      user: {
        id: user._id,
        email: user.email,
        userName: user.userName
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Something went wrong", error: err.message });
  }
};


exports.getUserProfile=async(req, res) =>{
     try {
      const {userId} = req.body
      const userData = await Client.findById(userId).select('-password')
      if (!userData) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      res.json({success:true, userData})
     } 
     catch (error) {
      console.log(error);
      res.json({success:false, message:error.message})
      
     }
}

exports.updateProfile = async(req, res) =>{
  try {
    const {userId , username, phone ,address, dob , gender} = req.body
    const imageFile = req.file
    console.log({username, phone, address, dob, gender, userId});
    
    if( !username || !phone || !address|| !dob  || !gender){
      return res.json({success:false, message: "data missing"})
    }
    await Client.findByIdAndUpdate(userId,{ username,phone,address: JSON.parse(address),dob ,gender})
  if(imageFile){
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
const imageURL =imageUpload.secure_url         
await Client.findByIdAndUpdate(userId,{image:imageURL})
  }
    res.json({success:true, message: "Profile updated"})

  } catch (error) {
    console.log(error);
    res.json({success:false, message:error.message})
  }
}


exports.bookAppointment = async(req, res) =>{
  try {
    const {userId,docId, slotDate, slotTime} = req.body
    const docData = await doctor.findById(docId).select("-password")
    if(!docData.availability){
      return res.json({success: false ,message: "Doctor not availble"})
    }
    
let slots_booked = docData.slots_booked

if(slots_booked[slotDate]){
  if(slots_booked[slotDate].includes(slotTime)){
    return res.json({success:false, message: 'slot not available'})
  }else{
    slots_booked[slotDate].push(slotTime)
  }
}else{
  slots_booked[slotDate]= []
  slots_booked[slotDate].push(slotTime)
}

const userData = await  Client.findById(userId).select("-password")
delete docData.slots_booked

const AppointmentData ={
  userId,
  docId,
  userData,
  docData,
  amount: docData.fees,
   slotTime,
  slotDate,
  date: Date.now()

}

const  newAppointment = new  appointment(AppointmentData)
await  newAppointment.save()

await doctor.findByIdAndUpdate(docId,{slots_booked})
res.json({success: true, message: 'Appointment booked'})


  } catch (error) {
    console.log(error);
    res.json({success:false, message:error.message})
  
  }
} 

// exports.listOfAppointment=async(req, res) =>{
//   try {
//     const {userId} = req.body
//     const appointmentData = await appointment.findOne({userId})  
//     // .populate("docId").populate("userId")
//     if(!appointmentData){
//       return res.json({success:false, message: "No appointment found"})
//     }
//     res.json({success:true, appointmentData})
//     console.log(appointmentData);
//   } catch (error) {
//     console.log(error);
//     res.json({success:false, message:error.message})
//   }
// }

exports.listOfAppointment=async(req, res) =>{
  try {
    const { userId} = req.body
    const appointments = await appointment.find({ userId})

    res.json({success:true, appointments})

  } catch (error) {
    console.log(error);
    res.json({success:false, message:error.message})

  }
}

// API to cancel appointment
exports.cancelAppointment = async (req, res) => {
  try {
    const {userId, appointmentId} = req.body

    const appointmentData = await appointment.findById(appointmentId)
    //verfy appointment userId
    if(appointmentData.userId!== userId){
      return res.json({success:false, message: "Unauthorized action"})
    }

    await appointment.findByIdAndUpdate(appointmentId, {cancelled: true})

    // releasing  doctor slot
    const {docId, slotDate, slotTime} = appointmentData
    const doctorData = await doctor.findById(docId)
    let slots_booked = doctorData.slots_booked

    slots_booked[slotDate] = slots_booked[slotDate].filter((e) => e !== slotTime)

    await doctor.findByIdAndUpdate(docId, {slots_booked})
    res.json({success:true, message: "Appointment cancelled"})

  } catch (error) {
    console.log(error);
    res.json({success:false, message:error.message})
  }
}

// exports.deleteUsers=async(req, res) =>{
//   const {username, email,password}=req.body;
//   try {
//     const users =userModel.deleteMany({username, email,password})
//     res.status(200).json({
//         Message: "Users are Successfully deleted!",
//         response: response,
//       });
   
//   } catch (error) {
//     res.status(500).json({  error: error.Message });
//   }

