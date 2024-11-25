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
      } catch (error) {
        console.error("Failed to fetch posted jobs:", error);
      }
    };

    fetchJobs();
  }, [jobs]);

  return (
    <div className="px-16 py-12 mx-36 font-custom">
      <h1 className="text-2xl font-bold text-secondary">Your Jobs</h1>
      {/* <PostJobCard /> */}
      {/* now render the previous jobs */}
      {jobs && jobs.map((job) => <JobCard key={job._id} job={job} />)}
    </div>
  );
};

export default Dashboard;
