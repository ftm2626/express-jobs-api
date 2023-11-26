const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  let customeError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong. Try again later.",
  };
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  if (err.code && err.code === 11000) {
    customeError.msg = `Duplicated value for ${Object.keys(err.keyValue)}`;
    customeError.statusCode = StatusCodes.BAD_REQUEST;
  }
  return res.status(customeError.statusCode).json(customeError);
};

module.exports = errorHandlerMiddleware;
