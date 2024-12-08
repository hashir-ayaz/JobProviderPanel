import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { acceptSubmission, rejectSubmission } from "../services/jobService";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

const SubmissionCard = ({ submission, onStatusChange }) => {
  const { toast } = useToast();
  const {
    title,
    text,
    attachments,
    status: initialStatus,
    createdAt,
    freelancerId,
  } = submission;

  console.log("submission", submission);
  const [status, setStatus] = useState(initialStatus); // Local state for status
  const navigate = useNavigate(); // Fixed: Removed destructuring

  const handleAccept = async () => {
    try {
      const response = await acceptSubmission(submission._id);
      console.log("Submission accepted successfully:", response);
      setStatus("Accepted"); // Update local state
      toast({
        title: "Submission accepted",
        description: "The submission has been accepted successfully.",
        status: "success",
      });
      if (onStatusChange) {
        onStatusChange(submission._id, "Accepted"); // Notify parent component
      }
    } catch (error) {
      console.error("Error accepting submission:", error);
      toast({
        title: "Error accepting submission",
        description: "An error occurred while accepting the submission.",
        status: "error",
        variant: "destructive",
      });
    }
  };

  const handleReject = async () => {
    try {
      const response = await rejectSubmission(submission._id);
      console.log("Submission rejected successfully:", response);
      setStatus("Rejected"); // Update local state
      toast({
        title: "Submission rejected",
        description: "The submission has been rejected successfully.",
        status: "success",
      });
      if (onStatusChange) {
        onStatusChange(submission._id, "Rejected"); // Notify parent component
      }
    } catch (error) {
      console.error("Error rejecting submission:", error);
      toast({
        title: "Error rejecting submission",
        description: "An error occurred while rejecting the submission.",
        status: "error",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Submission Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        <span
          className={`px-2 py-1 text-sm font-medium rounded-full ${
            status === "Complete" || status === "Accepted"
              ? "bg-green-100 text-green-700"
              : status === "Rejected"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {status}
        </span>
      </div>

      {/* Submission Details */}
      <p className="mb-4 text-gray-700">{text}</p>

      {/* Attachments */}
      {attachments.length > 0 && (
        <div className="mb-4">
          <h3 className="mb-2 text-sm font-semibold text-gray-800">
            Attachments:
          </h3>
          <ul className="space-y-2">
            {attachments.map((attachment, index) => (
              <li key={index} className="text-blue-600 hover:underline">
                <a
                  href={attachment.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {attachment.fileName}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Submission Footer */}
      <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
        <p>
          Submitted by:{" "}
          <Link
            to={`/user/${freelancerId?._id}`}
            className="text-blue-600 hover:underline"
          >
            {freelancerId?.firstName} {freelancerId?.lastName}
          </Link>
        </p>
        <p>
          Submitted on:{" "}
          {new Date(createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Action Buttons */}
      {status === "Pending" && (
        <div className="flex space-x-4">
          <Button
            onClick={handleAccept}
            className="px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded hover:bg-green-700"
          >
            Accept
          </Button>
          <Button
            onClick={handleReject}
            className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded hover:bg-red-700"
          >
            Reject
          </Button>
        </div>
      )}
      {status === "Accepted" && (
        <Button
          onClick={() => navigate(`/review/${freelancerId}`)} // Fixed: Correct use of navigate
          className="px-4 py-2 text-sm font-semibold bg-white border rounded hover:bg-gray-50 border-primary text-primary"
        >
          Review Freelancer
        </Button>
      )}
    </div>
  );
};

export default SubmissionCard;
