const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { createProposal } = require("../controllers/proposalController.js");

// Route to create a new proposal
router.post("/", protect, createProposal);

module.exports = router;
