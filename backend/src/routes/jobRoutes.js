const express = require("express");
const {
  createJob,
  getJobById,
  getAllJobs,
  updateJob,
  deleteJob,
  getJobsPostedByUser,
} = require("../controllers/jobController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Route to create a new job
router.post("/", protect, createJob);

router.get("/me", protect, getJobsPostedByUser);
// Route to get a specific job by ID
router.get("/:id", getJobById);

// Route to get all jobs
router.get("/", getAllJobs);

// Route to update a job by ID
router.patch("/:id", updateJob);

// Route to delete a job by ID
router.delete("/:id", deleteJob);

// // route to get all proposals for a job
// router.get("/:id/proposals", getProposals);

module.exports = router;
