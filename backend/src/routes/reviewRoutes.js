const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { createReview } = require("../controllers/reviewController");

router.post("/", protect, createReview);

module.exports = router;
