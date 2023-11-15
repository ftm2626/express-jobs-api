const { BadRequestError } = require("../errors");
const UserModel = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const User = await UserModel.create({ ...req.body });
  const token = jwt.sign({ userId: User._id, name: User.name }, "jwtSecret", {
    expiresIn: "30d",
  });
  res.status(StatusCodes.CREATED).json({ user: User, token: token });
};

const login = async (req, res) => {
  res.send("login");
};

module.exports = {
  register,
  login,
};
