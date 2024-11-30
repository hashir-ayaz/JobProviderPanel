import api from "./api";

export const postJob = async (formData) => {
  try {
    // API endpoint for posting a job
    const response = await api.post("/jobs", formData);

    // Log the response for debugging
    console.log("Job successfully posted:", response.data);

    // Return the response data for further use
    return response.data;
  } catch (error) {
    // Handle errors and log them
    console.error("Error posting the job:", error);
    alert("Failed to post the job. Please try again.");

    // Throw the error to notify the caller
    throw error;
  }
};

export const fetchSkills = async () => {
  try {
    const response = await api.get("/skills");
    return response.data;
  } catch (error) {
    console.error("Error fetching skills:", error);
    throw error;
  }
};

// gets all the jobs posted by the specific user (must be logged in)
export const fetchPostedJobs = async () => {
  try {
    const response = await api.get("/jobs/me");
    return response;
  } catch (error) {
    console.error("Error fetching posted jobs:", error);
    throw error;
  }
};

export const fetchJobById = async (jobId) => {
  try {
    const response = await api.get(`/jobs/${jobId}`);
    return response;
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    throw error;
  }
};

export const deleteJob = async (jobId) => {
  try {
    const response = await api.delete(`/jobs/${jobId}`);
    return response;
  } catch (error) {
    console.error("Error deleting job:", error);
    throw error;
  }
};
