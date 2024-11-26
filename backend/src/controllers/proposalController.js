const Proposal = require("../models/Proposal");
const Job = require("../models/Job"); // Assuming Job model is used to validate jobId

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