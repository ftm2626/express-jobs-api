const JobSchema = require("../models/Job");
const { StatusCodes } = require("http-status-codes");

const getAllJobs = async (req, res) => {
  const jobs = await JobSchema.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};
const getJob = async (req, res) => {
  res.send("");
};
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await JobSchema.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};
const editJob = async (req, res) => {
  res.send("");
};
const deleteJob = async (req, res) => {
  res.send("");
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  editJob,
  deleteJob,
};
