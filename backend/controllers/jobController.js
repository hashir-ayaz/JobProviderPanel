const express = require("express");
const Job = require("../models/Job");

exports.createJob = async (req, res) => {
  try {
    // Extract fields from the request body
    const {
      title,
      description,
      category,
      budgetType,
      budgetAmount,
      deadline,
      experienceLevel,
      preferredLocation,
    } = req.body;

    // Check required fields
    if (
      !title ||
      !description ||
      !category ||
      !budgetType ||
      !budgetAmount ||
      !deadline ||
      !experienceLevel
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

    // Validate experienceLevel
    if (!["Entry", "Intermediate", "Expert"].includes(experienceLevel)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid experience level. Must be 'Entry', 'Intermediate', or 'Expert'.",
      });
    }

    // Validate deadline
    const parsedDeadline = new Date(deadline);
    if (isNaN(parsedDeadline.getTime()) || parsedDeadline < new Date()) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or past deadline." });
    }

    // Create a new job
    const job = new Job({
      title,
      description,
      category,
      budgetType,
      budgetAmount,
      deadline: parsedDeadline,
      experienceLevel,
      preferredLocation,
      jobProviderId: req.user.id, // Assuming job provider info is in `req.user`
    });

    // Save to database
    const savedJob = await job.save();

    // Respond with the created job
    res.status(201).json({
      success: true,
      message: "Job created successfully.",
      data: savedJob,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the job.",
      error: error.message,
    });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    // Validate if the provided job ID is valid
    if (!jobId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID format.",
      });
    }

    // Attempt to find the job by ID
    const job = await Job.findById(jobId).populate(
      "jobProviderId receivedProposals"
    );

    // If the job doesn't exist, return a 404 error
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    // Return the job details
    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    // Log the error to the server console
    console.error(`Error fetching job with ID ${req.params.id}:`, error);

    // Return a 500 Internal Server Error
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the job.",
      error: error.message,
    });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs).message("Jobs fetched successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    // Validate if the provided job ID is valid
    if (!jobId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID format.",
      });
    }

    // Attempt to find and delete the job
    const deletedJob = await Job.findByIdAndDelete(jobId);

    // If the job doesn't exist, return a 404 error
    if (!deletedJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found. No job was deleted.",
      });
    }

    // Return a success response
    res.status(200).json({
      success: true,
      message: "Job deleted successfully.",
      data: deletedJob,
    });
  } catch (error) {
    // Log the error to the server console
    console.error(`Error deleting job with ID ${req.params.id}:`, error);

    // Return a 500 Internal Server Error
    res.status(500).json({
      success: false,
      message: "An error occurred while attempting to delete the job.",
      error: error.message,
    });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    // Validate if the provided job ID is valid
    if (!jobId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID format.",
      });
    }

    // Validate the request body
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided to update.",
      });
    }

    // Find and update the job with only the provided fields
    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      { $set: req.body },
      { new: true, runValidators: true }
    ).populate("jobProviderId receivedProposals");

    // If the job doesn't exist, return a 404 error
    if (!updatedJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    // Return the updated job
    res.status(200).json({
      success: true,
      message: "Job updated successfully.",
      data: updatedJob,
    });
  } catch (error) {
    // Log the error to the server console
    console.error(`Error updating job with ID ${req.params.id}:`, error);

    // Return a 500 Internal Server Error
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the job.",
      error: error.message,
    });
  }
};

exports.getProposals = async (req, res) => {
  /**
   * This function should fetch all proposals for a specific job
   * The job ID is available in req.params.id
   * The user(client) should be able to view proposals for only their job
   * The user(freelancer) should be able to view proposals they have submitted
   */
};
