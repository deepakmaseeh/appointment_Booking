var jwt = require("jsonwebtoken");
async function authUser(req, res, next) {
  try {
    let {token } = req.headers;
    if (!token) {
      res.status(401).json({
        Message: "Kindly Login!!",
      });
      return;
    }
 
    decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.body.userId = decoded.id;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ Message: "Something went wrong", error: err });
  }
}

module.exports =  authUser ;