

var jwt = require("jsonwebtoken");
async function isLoggedIn(req, res, next) {
  try {
    let {atoken } = req.headers;
    if (!atoken) {
      res.status(401).json({
        Message: "Kindly Login!!",
      });
      return;
    }
    // const token = authHeader.split(" ")[1]; 
    decoded = await jwt.verify(atoken, process.env.JWT_SECRET_KEY);
    // req.user = decoded;
    
    if(decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
      return res.json({success: false, Message: " not authorized user"})
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ Message: "Something went wrong", error: err });
  }
}

module.exports =  isLoggedIn ;


