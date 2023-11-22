const { BadRequestError } = require("../errors");
const UserModel = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  const User = await UserModel.create({ ...req.body });
  const token = User.createJWT();
  res.status(StatusCodes.CREATED).json({ user: User.name, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("please enter email and password");
  }
  const User = await UserModel.findOne({ email });
  if (!User) {
    throw new BadRequestError("invalid user");
  }

  const isPassCorrect = await User.comparePassword(password);

  if (!isPassCorrect) {
    throw new BadRequestError("invalid password");
  }

  const token = User.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: User.name }, token });
};

module.exports = {
  register,
  login,
};
