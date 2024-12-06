import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProposalById } from "../services/proposalService";
import { Button } from "@/components/ui/button";
import { toast } from "../hooks/use-toast.js";
import {
  CalendarIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const DetailedProposalPage = () => {
  const { proposalId } = useParams();
  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProposal = async () => {
      try {
        const response = await getProposalById(proposalId);
        const fetchedProposal = response.data.proposal;
        console.log("Fetched proposal:", fetchedProposal);
        setProposal(fetchedProposal);
      } catch (error) {
        console.error("Error fetching proposal:", error);
        toast({
          title: "Error",
          description: "Failed to load proposal details.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProposal();
  }, [proposalId]);

  const handleAcceptProposal = () => {
    toast({
      title: "Proposal Accepted",
      description: "You have accepted this proposal.",
    });
  };

  const handleRejectProposal = () => {
    toast({
      title: "Proposal Rejected",
      description: "You have rejected this proposal.",
      variant: "destructive",
    });
  };

  const handleViewProfile = () => {
    if (proposal && proposal.freelancerId) {
      navigate(`/freelancer/${proposal.freelancerId._id}`);
    } else {
      toast({
        title: "Error",
        description: "Freelancer profile not available.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-32 h-32 border-t-2 border-b-2 rounded-full border-primary animate-spin"></div>
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
    <div className="container px-4 py-8 mx-auto font-custom">
      <div className="overflow-hidden bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h1 className="mb-2 text-3xl font-bold text-gray-800">
            Proposal Details
          </h1>
          <div className="flex items-center mb-4">
            <CalendarIcon className="w-5 h-5 mr-2 text-gray-600" />
            <span>Submitted on {formatDate(createdAt)}</span>
          </div>
          <div className="flex flex-wrap mb-6 -mx-2">
            <div className="w-full px-2 mb-4 md:w-1/2">
              <div className="flex items-center">
                <CurrencyDollarIcon className="w-5 h-5 mr-2 text-gray-600" />
                <span className="text-gray-700">
                  {budgetType === "Fixed"
                    ? `$${budgetAmount} (Fixed)`
                    : `$${budgetHourlyRate}/hour (Hourly)`}
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
            <span className="px-3 py-1 text-sm font-semibold rounded-full text-primary-foreground bg-primary">
              Proposal for Job ID: {jobId || "N/A"}
            </span>
          </div>
        </div>
        <div className="flex justify-between px-6 py-4 bg-gray-100">
          <Button
            onClick={handleAcceptProposal}
            className="bg-green-500 hover:bg-green-600"
          >
            Accept Proposal
          </Button>
          <Button onClick={handleRejectProposal} variant="destructive">
            Reject Proposal
          </Button>
          <Button onClick={handleViewProfile} variant="outline">
            View Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetailedProposalPage;
