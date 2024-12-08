import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchJobById } from "../services/jobService";
import SubmissionsList from "../components/SubmissionsList";

import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import AboutClient from "../components/AboutClient";
import JobProposalCard from "../components/JobProposalCard";
import { motion } from "framer-motion";
import emptyProposalsImg from "../assets/post-job-aunty.png";

const DetailedJobPage = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Details"); // New state for active tab

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetchJobById(jobId);
        const fetchedJob = response.data.job;
        console.log("Fetched job:", fetchedJob);
        setJob(fetchedJob);
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-32 h-32 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-red-500">Failed to load job details.</p>
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
    title = "No title provided",
    description = "No description available",
    budgetAmount = "Budget not specified",
    budgetType = "Type not specified",
    preferredLocation = "Location not specified",
    experienceLevel = "Experience level not specified",
    estimatedTime = "Duration not specified",
    deadline = "Deadline not specified",
    createdAt = "Not available",
    status = "Status not specified",
    jobProviderId = {},
    receivedProposals = [],
    freelancerId = null,
  } = job;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="container px-4 py-8 mx-auto text-secondary font-custom"
    >
      {/* Tabs for navigation */}
      <div className="mb-6 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
          <li className="mr-2">
            <button
              onClick={() => setActiveTab("Details")}
              className={`inline-block px-4 py-2 border-b-2 ${
                activeTab === "Details"
                  ? "text-blue-600 border-blue-600"
                  : "border-transparent hover:text-gray-600 hover:border-gray-300"
              }`}
            >
              Job Details
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => setActiveTab("Proposals")}
              className={`inline-block px-4 py-2 border-b-2 ${
                activeTab === "Proposals"
                  ? "text-blue-600 border-blue-600"
                  : "border-transparent hover:text-gray-600 hover:border-gray-300"
              }`}
            >
              Proposals
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("SubmittedWork")}
              className={`inline-block px-4 py-2 border-b-2 ${
                activeTab === "SubmittedWork"
                  ? "text-blue-600 border-blue-600"
                  : "border-transparent hover:text-gray-600 hover:border-gray-300"
              }`}
            >
              Submitted Work
            </button>
          </li>
        </ul>
      </div>

      {/* Render content based on active tab */}
      {activeTab === "Details" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden bg-white rounded-lg shadow-sm"
        >
          <div className="p-6">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-2 text-3xl font-bold "
            >
              {title}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center mb-4 "
            >
              <CalendarIcon className="w-5 h-5 mr-2" />
              <span>Posted on {formatDate(createdAt)}</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap mb-6 -mx-2"
            >
              {/* Job Details */}
              <div className="w-full px-2 mb-4 md:w-1/2">
                <div className="flex items-center">
                  <MapPinIcon className="w-5 h-5 mr-2 text-gray-600" />
                  <span className="text-gray-700">{preferredLocation}</span>
                </div>
              </div>
              <div className="w-full px-2 mb-4 md:w-1/2">
                <div className="flex items-center">
                  <CurrencyDollarIcon className="w-5 h-5 mr-2 text-gray-600" />
                  <span className="text-gray-700">
                    {budgetAmount} USD ({budgetType})
                  </span>
                </div>
              </div>
              <div className="w-full px-2 mb-4 md:w-1/2">
                <div className="flex items-center">
                  <UserIcon className="w-5 h-5 mr-2 text-gray-600" />
                  <span className="text-gray-700">{experienceLevel} Level</span>
                </div>
              </div>
              <div className="w-full px-2 mb-4 md:w-1/2">
                <div className="flex items-center">
                  <ClockIcon className="w-5 h-5 mr-2 text-gray-600" />
                  <span className="text-gray-700">
                    Est. Time: {estimatedTime}
                  </span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="pt-6 border-t border-gray-200"
            >
              <h2 className="mb-4 text-xl font-semibold text-gray-800">
                Job Description
              </h2>
              <p className="mb-6 text-gray-600 whitespace-pre-line">
                {description}
              </p>
            </motion.div>
            <AboutClient jobProviderId={jobProviderId} />
          </div>

          {/* Assigned Freelancer Section */}
          {freelancerId && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="p-6 mt-6 border-t border-gray-200"
            >
              <h2 className="mb-4 text-xl font-semibold text-gray-800">
                Assigned Freelancer
              </h2>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    src={freelancerId.profilePicture || "/default-avatar.png"}
                    alt={freelancerId.firstName}
                    className="w-16 h-16 rounded-full"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {freelancerId.firstName} {freelancerId.lastName}
                  </h3>
                  <p className="text-gray-600">{freelancerId.email}</p>
                  <p className="text-gray-600">{freelancerId.location}</p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {activeTab === "Proposals" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {receivedProposals.length > 0 ? (
            receivedProposals.map((proposal) => (
              <JobProposalCard key={proposal._id} proposal={proposal} />
            ))
          ) : (
            <p className="min-h-screen mt-4 text-lg text-gray-600">
              No proposals received yet.
              <img className="w-1/3" src={emptyProposalsImg} />
            </p>
          )}
        </motion.div>
      )}

      {activeTab === "SubmittedWork" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SubmissionsList jobId={jobId} />
        </motion.div>
      )}
    </motion.div>
  );
};

export default DetailedJobPage;
