const mongoose = require("mongoose");

const proposalSchema = new mongoose.Schema({
  freelancerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the Freelancer
    required: true,
  },
  budgetType: {
    type: String,
    enum: ["Fixed", "Hourly"], // Fixed price or hourly rate
    required: true,
  },
  budgetAmount: {
    type: Number,
    required: function () {
      return this.budgetType === "Fixed";
    },
    min: 1, // Minimum valid amount
  },
  budgetHourlyRate: {
    type: Number,
    required: function () {
      return this.budgetType === "Hourly";
    },
    min: 1, // Minimum hourly rate
  },
  coverLetterText: {
    type: String,
    required: true,
    minlength: 10, // Minimum length for a meaningful cover letter
  },
  attachments: {
    type: [
      {
        fileName: { type: String, required: true },
        fileUrl: { type: String, required: true },
      },
    ],
    default: [], // Optional, stores file attachments
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job", // Reference to the related Job
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Auto-assign creation date
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Auto-assign update date
  },
});

const Proposal = mongoose.model("Proposal", proposalSchema);

module.exports = Proposal;
