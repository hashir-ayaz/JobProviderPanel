const express = require("express");
const {
  createJob,
  getJobById,
  getAllJobs,
  updateJob,
  deleteJob,
  getAllSubmissionsForJob,
  getJobsPostedByUser,
  rejectSubmission,
  acceptSubmission,
} = require("../controllers/jobController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Route to create a new job
router.post("/", protect, createJob);

router.get("/me", protect, getJobsPostedByUser);
// Route to get a specific job by ID
router.get("/:id", getJobById);
router.get("/:jobId/submissions", getAllSubmissionsForJob);

router.patch(`/submissions/:submissionId/reject`, rejectSubmission);
router.patch(`/submissions/:submissionId/accept`, acceptSubmission);
// Route to get all jobs
router.get("/", getAllJobs);

// Route to update a job by ID
router.patch("/:id", updateJob);

// Route to delete a job by ID
router.delete("/:id", deleteJob);

// // route to get all proposals for a job
// router.get("/:id/proposals", getProposals);

module.exports = router;
