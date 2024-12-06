import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import PostJobCard from "../components/PostJobCard";
import { fetchPostedJobs, deleteJob, editJob } from "../services/jobService";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const { setIsLoggedIn, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthentication = () => {
      const params = new URLSearchParams(window.location.search);
      // const token = params.get("token");
      const user = params.get("user");
      // console.log("token", token);
      console.log("user", user);

      if (user) {
        try {
          // Store token and user in localStorage
          // localStorage.setItem("jwt", token);
          localStorage.setItem("user", user);

          // Update AuthContext
          setIsLoggedIn(true);
          setUser(JSON.parse(decodeURIComponent(user)));

          // Clear query parameters
          window.history.replaceState({}, document.title, "/dashboard");
        } catch (err) {
          console.error("Error parsing user data:", err);
        }
      }
    };

    const fetchJobs = async () => {
      try {
        const response = await fetchPostedJobs();
        setJobs(response.data);
        console.log("Jobs fetched:", response.data);
      } catch (error) {
        console.error("Failed to fetch posted jobs:", error.message);
      }
    };

    handleAuthentication();
    fetchJobs();
  }, [setIsLoggedIn, setUser]);

  const markCompletedHandler = async (jobId) => {
    try {
      await editJob(jobId, { status: "Completed" });
      console.log("Job marked as completed successfully:", jobId);
      const response = await fetchPostedJobs();
      setJobs(response.data);
    } catch (error) {
      console.error("Failed to mark the job as completed:", error.message);
    }
  };

  const deleteHandler = async (jobId) => {
    try {
      await deleteJob(jobId);
      console.log("Job deleted successfully:", jobId);
      const response = await fetchPostedJobs();
      setJobs(response.data);
    } catch (error) {
      console.error("Failed to delete the job:", error.message);
    }
  };

  if (!jobs) {
    return <div className="py-12 text-lg text-center">Loading Jobs...</div>;
  }

  if (jobs.length === 0) {
    return (
      <div className="px-16 py-12 font-custom">
        <h1 className="mb-6 text-2xl font-bold text-secondary">Your Jobs</h1>
        <div className="text-lg text-center">
          No jobs found. Post a job to get started.
        </div>
        <PostJobCard />
      </div>
    );
  }

  return (
    <div className="px-16 py-12 font-custom">
      <h1 className="mb-6 text-2xl font-bold text-secondary">Your Jobs</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {jobs.map((job) => (
          <JobCard
            key={job._id}
            job={job}
            onDelete={deleteHandler}
            onMarkCompleted={markCompletedHandler}
          />
        ))}
        <PostJobCard />
      </div>
    </div>
  );
};

export default Dashboard;
