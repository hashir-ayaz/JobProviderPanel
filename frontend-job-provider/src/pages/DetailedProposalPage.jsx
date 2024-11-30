import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProposalById } from "../services/proposalService"; // Assuming a service function to fetch proposal
import {
  CalendarIcon,
  ClockIcon,
  CurrencyDollarIcon,
  PaperClipIcon,
  UserIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";

const DetailedProposalPage = () => {
  const { proposalId } = useParams();
  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProposal = async () => {
      try {
        const response = await getProposalById(proposalId);
        const fetchedProposal = response.data.proposal; // Adjust if your API returns `proposal`
        console.log("Fetched proposal:", fetchedProposal);
        setProposal(fetchedProposal);
      } catch (error) {
        console.error("Error fetching proposal:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProposal();
  }, [proposalId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-32 h-32 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-red-500">Failed to load proposal details.</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Not available";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };

  const {
    budgetType,
    budgetAmount,
    budgetHourlyRate,
    coverLetterText,
    attachments = [],
    jobId,
    freelancerId = {},
    createdAt,
    updatedAt,
  } = proposal;

  return (
    <div className="container px-4 py-8 mx-auto text-secondary font-custom">
      <div className="overflow-hidden bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h1 className="mb-2 text-3xl font-bold ">Proposal Details</h1>
          <div className="flex items-center mb-4 ">
            <CalendarIcon className="w-5 h-5 mr-2" />
            <span>Submitted on {formatDate(createdAt)}</span>
          </div>
          <div className="flex flex-wrap mb-6 -mx-2">
            <div className="w-full px-2 mb-4 md:w-1/2">
              <div className="flex items-center">
                <CurrencyDollarIcon className="w-5 h-5 mr-2 text-gray-600" />
                <span className="text-gray-700">
                  {budgetType === "Fixed"
                    ? `${budgetAmount} USD (Fixed)`
                    : `${budgetHourlyRate} USD/hour (Hourly)`}
                </span>
              </div>
            </div>
            <div className="w-full px-2 mb-4 md:w-1/2">
              <div className="flex items-center">
                <UserIcon className="w-5 h-5 mr-2 text-gray-600" />
                <span className="text-gray-700">
                  Submitted by {freelancerId?.firstName || "N/A"}{" "}
                  {freelancerId?.lastName || "N/A"}
                </span>
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-gray-200">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Cover Letter
            </h2>
            <p className="mb-6 text-gray-600">{coverLetterText}</p>
          </div>
          {attachments.length > 0 && (
            <div className="pt-6 border-t border-gray-200">
              <h2 className="mb-4 text-xl font-semibold text-gray-800">
                Attachments
              </h2>
              <ul className="list-disc list-inside">
                {attachments.map((attachment, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <PaperClipIcon className="w-5 h-5 text-gray-600" />
                    <a
                      href={attachment.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {attachment.fileName}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="px-6 py-4 mb-5 bg-gray-50">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">
              Last Updated: {formatDate(updatedAt)}
            </span>
            <span className="px-3 py-1 text-sm font-semibold text-green-800 bg-green-100 rounded-full">
              Proposal for Job ID: {jobId || "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedProposalPage;
