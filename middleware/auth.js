// middleware is a function which has acces  to request and response cycle and object
const jwt = require("jsonwebtoken");
const config = require("config");
// we use to check if there is any token in header
module.exports = function (req, res, next) {
  //get token header
  const token = req.header("x-auth-token");
  // check if not token
  if (!token) {
    return res.status(401).json({
      msg: "No token, authorization denied",
    });
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({
      msg: "Token is not valid",
    });
  }
};
