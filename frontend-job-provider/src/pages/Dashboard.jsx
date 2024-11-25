import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import PostJobCard from "../components/PostJobCard";
import { fetchPostedJobs } from "../services/jobService";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetchPostedJobs();
        setJobs(response.data);
        console.log("Jobs fetched:", response.data);
      } catch (error) {
        console.error("Failed to fetch posted jobs:", error.message);
      }
    };

    fetchJobs();
  }, []);

  if (!jobs || jobs.length === 0) {
    return <div className="py-12 text-lg text-center">Loading Jobs...</div>;
  }

  return (
    <div className="px-16 py-12 font-custom">
      <h1 className="mb-6 text-2xl font-bold text-secondary">Your Jobs</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {/* Render the job cards */}
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
