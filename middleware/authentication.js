const userModel = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");
const secret = "jwtSecret";
const authMiddleware = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer")) {
    throw new UnauthenticatedError("no token provided");
  }
  const token = auth.split(" ")[1];
  try {
    const decoded = jwt.verify(token, secret);
    const { userId,name } = decoded;
    req.user = { userId,name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("you can not access this route");
  }
};

module.exports = { authMiddleware };
