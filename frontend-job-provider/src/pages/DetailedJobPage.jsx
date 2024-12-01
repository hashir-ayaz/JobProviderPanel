import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchJobById } from "../services/jobService";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import AboutClient from "../components/AboutClient"; // Import the new component
import JobProposalCard from "../components/JobProposalCard";

const DetailedJobPage = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null); // Start with `null` to indicate loading state
  const [loading, setLoading] = useState(true); // Add explicit loading state

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetchJobById(jobId);
        const fetchedJob = response.data.job; // Extract `job` directly
        console.log("Fetched job:", fetchedJob);
        setJob(fetchedJob); // Set only the actual job object in the state
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  if (loading) {
    // Render loading spinner while fetching data
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-32 h-32 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!job) {
    // Render an error message if job data is not available
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
  } = job;

  return (
    <div className="container px-4 py-8 mx-auto text-secondary font-custom">
      <div className="overflow-hidden bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h1 className="mb-2 text-3xl font-bold ">{title}</h1>
          <div className="flex items-center mb-4 ">
            <CalendarIcon className="w-5 h-5 mr-2" />
            <span>Posted on {formatDate(createdAt)}</span>
          </div>
          <div className="flex flex-wrap mb-6 -mx-2">
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
          </div>
          <div className="pt-6 border-t border-gray-200">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Job Description
            </h2>
            <p className="mb-6 text-gray-600 whitespace-pre-line">
              {description}
            </p>
          </div>
          <AboutClient jobProviderId={jobProviderId} />{" "}
          {/* Use the new component */}
        </div>
        <div className="px-6 py-4 mb-5 bg-gray-50">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">
              Deadline: {formatDate(deadline)}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                status === "Open"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {status}
            </span>
          </div>
        </div>
      </div>
      {receivedProposals.length > 0 ? (
        receivedProposals.map((proposal) => (
          <JobProposalCard key={proposal._id} proposal={proposal} />
        ))
      ) : (
        <p className="mt-4 text-lg text-gray-600">No proposals received yet.</p>
      )}
    </div>
  );
};

export default DetailedJobPage;
