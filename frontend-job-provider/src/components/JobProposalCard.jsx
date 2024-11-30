import React from "react";

const JobProposalCard = ({ proposal }) => {
  const {
    freelancerId = "No freelancer provided",
    budgetType = "No budget type provided",
    budgetAmount = "No budget amount provided",
    budgetHourlyRate = "No hourly rate provided",
    coverLetterText = "No cover letter provided",
    attachments = "No attachments provided",
    jobId = "No job ID provided",
    createdAt = "No creation date provided",
    updatedAt = "No update date provided",
  } = proposal;

  console.log("proposal", proposal);

  return (
    <div className="p-4 mb-4 bg-white border rounded-lg shadow-sm">
      <h2 className="mb-2 text-xl font-bold text-gray-800">Job Proposal</h2>
      <div className="mb-2">
        <strong>Freelancer:</strong> {freelancerId?.firstName || "N/A"}{" "}
        {freelancerId?.lastName || "N/A"}
      </div>
      <div className="mb-2">
        <strong>Email:</strong> {freelancerId?.email || "N/A"}
      </div>
      <div className="mb-2">
        <strong>Job ID:</strong> {jobId || "N/A"}
      </div>
      <div className="mb-2">
        <strong>Budget Type:</strong> {budgetType}
      </div>
      <div className="mb-2">
        {budgetType === "Fixed" ? (
          <strong>Budget Amount:</strong>
        ) : (
          <strong>Hourly Rate:</strong>
        )}{" "}
        {budgetType === "Fixed"
          ? `$${budgetAmount}`
          : `$${budgetHourlyRate}/hr`}
      </div>
      <div className="mb-2">
        <strong>Cover Letter:</strong>{" "}
        <p className="mt-1 text-gray-700">{coverLetterText}</p>
      </div>
      <div className="mb-2">
        <strong>Attachments:</strong>
        {attachments && attachments.length > 0 ? (
          <ul className="mt-1">
            {attachments.map((attachment, index) => (
              <li key={index}>
                <a
                  href={attachment.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {attachment.fileName}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700">No attachments provided</p>
        )}
      </div>
      <div className="text-sm text-gray-600">
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(createdAt).toLocaleDateString("en-US")}
        </p>
        <p>
          <strong>Updated At:</strong>{" "}
          {new Date(updatedAt).toLocaleDateString("en-US")}
        </p>
      </div>
    </div>
  );
};

export default JobProposalCard;
