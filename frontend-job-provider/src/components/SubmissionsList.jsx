import { useEffect, useState } from "react";
import SubmissionCard from "./SubmissionCard";
import { fetchSubmissionsByJobId } from "../services/jobService";

const SubmissionsList = ({ jobId }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading as true

  // Fetch submissions when the component mounts or when jobId changes
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetchSubmissionsByJobId(jobId);
        console.log("Fetched submissions by job ID:", response);
        setSubmissions(response.data.submissions || []); // Fallback to an empty array
      } catch (error) {
        console.error("Error fetching submissions:", error);
      } finally {
        setLoading(false); // Ensure loading state is set to false
      }
    };

    fetchSubmissions();
  }, [jobId]);

  // Handle status change for a specific submission
  const handleStatusChange = (submissionId, newStatus) => {
    setSubmissions((prevSubmissions) =>
      prevSubmissions.map((submission) =>
        submission._id === submissionId
          ? { ...submission, status: newStatus }
          : submission
      )
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="w-8 h-8 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
        <p className="ml-4 text-gray-600">Loading submissions...</p>
      </div>
    );
  }

  if (!submissions || submissions.length === 0) {
    return (
      <div className="p-4 text-lg text-center text-gray-600">
        <p>No submissions available for this job.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {submissions.map((submission) => (
        <SubmissionCard
          key={submission._id}
          submission={submission}
          onStatusChange={handleStatusChange} // Pass the status change handler
        />
      ))}
    </div>
  );
};

export default SubmissionsList;
