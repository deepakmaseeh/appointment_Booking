var express = require("express");
const bodyParser = require('body-parser');
const { dbConfig } = require("./Configuration/db.config");
const bcrypt = require('bcrypt');
var app = express();
var dotenv = require("dotenv");

const users = require('./Routers/UserRouter')
var admin = require('./Routers/AdminRoute')
// var doctor = require('./Routers/doctorRoute')
var doctorRouter= require('./Routers/doctorRoute')
var jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const multer = require ('multer')

const connectCloudinary= require('./Configuration/cloudinary')

dotenv.config();

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors())

let PORT = process.env.PORT || 3000;

app.use("/api/user",users);
app.use("/api/admin",admin);
app.use("/api/doctor",doctorRouter);





app.listen(PORT, () => {
  dbConfig();
  connectCloudinary()

  console.log(`Listening to the port ${PORT}`);
});

