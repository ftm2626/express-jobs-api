const express = require("express");
const router = express.Router();
const {
  getAllJobs,
  getJob,
  deleteJob,
  editJob,
  createJob,
} = require("../controllers/jobs");

// router.get("/", getAllJobs).post("/create", createJob);
router.route('/').get(getAllJobs).post(createJob)
// router.get("/:id", getJob).delete("/:id", deleteJob).put("/:id", editJob);
router.route('/:id').get(getJob).delete(deleteJob).put(editJob)

module.exports = {
  JobRouter: router,
};
