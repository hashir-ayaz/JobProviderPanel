const Proposal = require("../models/Proposal");
const Job = require("../models/Job"); // Assuming Job model is used to validate jobId
const mongoose = require("mongoose");

exports.createProposal = async (req, res) => {
  try {
    // Extract freelancerId from req.user
    const freelancerId = req.user.id;

    // Extract other fields from the request body
    const {
      jobId,
      budgetType,
      budgetAmount,
      budgetHourlyRate,
      coverLetterText,
      attachments,
    } = req.body;

    // Validate required fields
    if (
      !jobId ||
      !budgetType ||
      !coverLetterText ||
      (budgetType === "Fixed" && !budgetAmount) ||
      (budgetType === "Hourly" && !budgetHourlyRate)
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided.",
      });
    }

    // Validate budgetType
    if (!["Fixed", "Hourly"].includes(budgetType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid budget type. Must be 'Fixed' or 'Hourly'.",
      });
    }

    // Check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    // Create the proposal object
    const proposalData = {
      freelancerId,
      jobId,
      budgetType,
      budgetAmount: budgetType === "Fixed" ? budgetAmount : null,
      budgetHourlyRate: budgetType === "Hourly" ? budgetHourlyRate : null,
      coverLetterText,
      attachments,
    };

    // Save the proposal to the database
    const proposal = new Proposal(proposalData);
    const savedProposal = await proposal.save();

    // Respond with the created proposal
    res.status(201).json({
      success: true,
      message: "Proposal created successfully.",
      data: savedProposal,
    });
  } catch (error) {
    console.error("Error creating proposal:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the proposal.",
      error: error.message,
    });
  }
};

exports.getProposalById = async (req, res) => {
  try {
    // make sure the id is a valid ObjectId before querying the database
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid proposal ID." });
    }

    const proposalId = req.params.id;
    const proposal = await Proposal.findById(proposalId).populate(
      "freelancerId"
    );
    res.status(200).json({ proposal });
  } catch (error) {
    console.error("Error fetching proposal:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the proposal.",
      error: error.message,
    });
  }
};

exports.acceptProposal = async (req, res) => {
  try {
    const proposalId = req.params.id;

    // Fetch the proposal along with the job and freelancer details
    const proposal = await Proposal.findById(proposalId)
      .populate("jobId")
      .populate("freelancerId");

    if (!proposal) {
      return res.status(404).json({
        success: false,
        message: "Proposal not found.",
      });
    }

    const job = proposal.jobId;

    // Check if the job is already assigned
    if (job.freelancerId) {
      return res.status(400).json({
        success: false,
        message: "Job is already assigned to a freelancer.",
      });
    }

    // Assign the freelancer to the job
    job.freelancerId = proposal.freelancerId._id;
    job.status = "In Progress"; // Update job status to "In Progress"
    await job.save();

    res.status(200).json({
      success: true,
      message: "Proposal accepted successfully.",
      data: {
        jobId: job._id,
        title: job.title,
        freelancer: proposal.freelancerId,
        status: job.status,
      },
    });

    // Optionally, send notifications here
    // Notify the freelancer
    // Notify other freelancers that their proposals were not accepted
  } catch (error) {
    console.error("Error accepting proposal:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while accepting the proposal.",
      error: error.message,
    });
  }
};

// TODO send emails to the freelancer and the client
exports.rejectProposal = async (req, res) => {
  try {
    const proposalId = req.params.id;

    // Fetch the proposal and populate the job details
    const proposal = await Proposal.findById(proposalId).populate("jobId");

    if (!proposal) {
      return res.status(404).json({
        success: false,
        message: "Proposal not found.",
      });
    }

    const job = proposal.jobId;

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Associated job not found.",
      });
    }

    // Remove the proposal ID from the job's receivedProposals
    job.receivedProposals = job.receivedProposals.filter(
      (id) => id.toString() !== proposalId
    );
    await job.save();

    // Optionally delete the proposal document from the database
    await Proposal.findByIdAndDelete(proposalId);

    res.status(200).json({
      success: true,
      message: "Proposal rejected and removed successfully.",
      data: job,
    });

    // Optionally, send a notification to the freelancer about the rejection
  } catch (error) {
    console.error("Error rejecting proposal:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while rejecting the proposal.",
      error: error.message,
    });
  }
};
