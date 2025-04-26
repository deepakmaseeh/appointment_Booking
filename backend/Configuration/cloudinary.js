// import {v2 as cloudinary} from 'cloudinary';
var cloudinary= require('cloudinary')


const connectCloudinary = () =>{
try {
    cloudinary.config({
        cloud_name: process.env.CLOUDNERY_NAME ,
        api_key:   process.env.CLOUDNERY_API_KEY   ,
        api_secret: process.env.CLOUDNERY_SECRET_KEY
    })
    console.log('cloudinery setup done');
    
} catch (error) {
    console.log(error.message);
    
}
    
}

module.exports = connectCloudinary;