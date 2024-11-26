import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchJobById } from "../services/jobService";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  UserIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";

const DetailedJobPage = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null); // Start with `null` to indicate loading state
  const [loading, setLoading] = useState(true); // Add explicit loading state

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetchJobById(jobId);
        console.log("job response is ", response);
        const fetchedJob = response.data.job; // Extract `job` directly
        console.log("Job fetched:", fetchedJob);
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
  } = job;

  console.log("Rendered Job isss:", job.data); // Debugging: Check if `job` is populated properly

  return (
    <div className="container px-4 py-8 mx-auto font-custom">
      <div className="overflow-hidden bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h1 className="mb-2 text-3xl font-bold text-gray-800">{title}</h1>
          <div className="flex items-center mb-4 text-gray-600">
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
            <p className="mb-6 text-gray-600">{description}</p>
          </div>
          <div className="pt-6 border-t border-gray-200">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              About the Client
            </h2>
            <div className="flex items-center mb-2">
              <BriefcaseIcon className="w-5 h-5 mr-2 text-gray-600" />
              <span className="text-gray-700">
                {jobProviderId?.firstName || "N/A"}{" "}
                {jobProviderId?.lastName || "N/A"}
              </span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-1 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-gray-700">
                {(jobProviderId?.avgRating || 0).toFixed(1)} Average Rating
              </span>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-50">
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
    </div>
  );
};

export default DetailedJobPage;
