const express = require("express");
const router = express.Router();

const {
  embedUsers,
  getRecommendedFreelancersForJob,
  peekAtCollection,
} = require("../controllers/matchingController");

// gets the matched freelancers for this specific job
router.get("/matched-freelancers/:jobId", getRecommendedFreelancersForJob);
router.get("/peek/:name", peekAtCollection);
router.post("/embed-freelancers-and-store", embedUsers);

module.exports = router;
