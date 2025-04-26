const mongoose = require("mongoose");

const bcrypt = require('bcrypt');
let doctorsSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: [true, "Please input the username"],
    unique: true,
    minLength: 3,
  },
    email: {
        type: String,
        lowercase: true,
        required: [true, "Please enter the email of the user"],
        unique: true,
        match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Please Provide the valid email address",
        ],
      },
      speciality : { type : String , required : true},
      degree : { type : String , required : true},
      experience : { type : String , required : true},
      about : { type : String , required : true},
      availability : { type : Boolean, default: true},
      fees : { type : Number , required : true},
      date : { type : Number , required : true},
      slots_booked : { type : Object , default : {}},
      image : { type : String , required : true},





      password: {
        type: String,
        required: [true, "Please input the user Password"],
      },
      address: {
        type: Object,
      required: true
      }
      // gender: {
      //   type: String,
      //   default: "not selected",
      // },
      // dob: {
      //   type: String,
      //   default: "not selected",
      // },
      // phone: {
      //   type: String,
      //   default: "00000000000",
      // },

      
     
}

)

doctorsSchema.pre("save", async function (next) {
  if(this.isModified("password")){
  this.password = await bcrypt.hash(this.password, 10);
  next();}
  else{
    next()
  }
}
)
module.exports = mongoose.model('doctor', doctorsSchema);
