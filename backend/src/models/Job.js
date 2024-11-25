const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  // Basic Job Information
  title: {
    type: String,
    required: true,
    maxlength: 100, // Limit to 100 characters
  },
  description: {
    type: String,
    required: true,
    minlength: 10, // Ensure meaningful descriptions
  },
  category: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Skill",
    default: [],
  },

  // Budget and Payment Details
  budgetType: {
    type: String,
    required: true,
    enum: ["Fixed", "Hourly"], // Fixed price or hourly rate
  },
  budgetAmount: {
    type: Number,
    required: true,
    min: 1, // Minimum value for a job budget
  },
  hourlyRate: {
    type: Number, // Only applicable for hourly jobs
    min: 1,
  },
  estimatedTime: {
    type: String, // Estimated hours for hourly jobs
    default: "Less than 1 month",
  },
  paymentMilestones: {
    type: [
      {
        milestoneTitle: { type: String, required: true },
        amount: { type: Number, required: true, min: 1 },
        dueDate: { type: Date, required: true },
      },
    ],
    default: [], // Optional, used for fixed-price jobs with milestones
  },

  // Timeline
  deadline: {
    type: Date,
    required: true,
  },

  // Attachments
  attachments: {
    type: [
      {
        fileName: { type: String, required: true },
        fileUrl: { type: String, required: true },
      },
    ],
    default: [], // List of attached files
  },

  // Job Requirements
  requiredSkills: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Skill", // Array of skills (e.g., "React", "Node.js", "Photoshop")
    default: [],
  },
  experienceLevel: {
    type: String,
    enum: ["Entry", "Intermediate", "Expert"], // Freelancer experience level
    required: true,
  },
  preferredLocation: {
    type: String, // Optional field for location-specific jobs
  },

  // Job Status
  status: {
    type: String,
    enum: ["Open", "In Progress", "Completed", "Cancelled"], // Current status of the job
    default: "Open",
  },
  proposalsCount: {
    type: Number,
    default: 0, // Count of freelancer proposals
  },

  // Relationships
  jobProviderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the Job Provider (Client)
    required: true,
  },
  freelancerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the assigned Freelancer (if any)
    default: null,
  },

  // Reviews and Ratings
  review: {
    type: {
      rating: { type: Number, min: 1, max: 5 }, // Rating out of 5
      comments: { type: String }, // Review comments
    },
    default: null, // Added after job completion
  },

  // Metadata
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  receivedProposals: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Proposal",
    default: [],
  },
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
