const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  freelancerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  jobProviderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    maxlength: 100,
  },
  text: {
    type: String,
    required: true,
    minlength: 10,
  },
  attachments: {
    type: [
      {
        fileName: { type: String, required: true },
        fileUrl: { type: String, required: true },
      },
    ],
    default: [],
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected", "Complete"], // Restricts values to "Pending" or "Complete"
    default: "Pending", // Default status is "Pending"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Submission = mongoose.model("Submission", submissionSchema);

module.exports = Submission;
