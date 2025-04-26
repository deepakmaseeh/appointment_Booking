const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
let userSchema = new mongoose.Schema(
{
  username: {
    type: String,
    required: [true, "Please input the username"],
    // unique: true,
    // sparse: true,
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
      password: {
        type: String,
        required: [true, "Please input the user Password"],
      },
      // address: {
      //   type: Object,
      //  default: {line1,line2}
      // },
      address: {
        type: Object,
        default: {
          line1: "",
          line2: ""
        }
      },
      
      gender: {
        type: String,
        default: "not selected",
      },
      dob: {
        type: String,
        default: "not selected",
      },
      phone: {
        type: String,
        default: "00000000000",
      },

      
     
}

)

userSchema.pre("save", async function (next) {
  if(this.isModified("password")){
  this.password = await bcrypt.hash(this.password, 10);
  next();}
  else{
    next()
  }
})
module.exports = mongoose.model('Client', userSchema);

