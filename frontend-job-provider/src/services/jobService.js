import api from "./api";

export const postJob = async (formData) => {
  try {
    // API endpoint for posting a job
    const response = await api.post("/jobs", formData);

    // Log the response for debugging
    console.log("Job successfully posted:", response.data);
    alert("Job posted successfully!");

    // Return the response data for further use
    return response.data;
  } catch (error) {
    // Handle errors and log them
    console.error("Error posting the job:", error);

    // Throw the error to notify the caller
    throw error;
  }
};

export const fetchSkills = async () => {
  try {
    const response = await api.get("/skills");
    console.log("Fetched skills in jobservice", response.data);
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

export const editJob = async (jobId, formData) => {
  try {
    const response = await api.patch(`/jobs/${jobId}`, formData);
    return response;
  } catch (error) {
    console.error("Error editing job:", error);
    throw error;
  }
};

export const fetchSubmissionsByJobId = async (jobId) => {
  try {
    const response = await api.get(`/jobs/${jobId}/submissions`);
    return response;
  } catch (error) {
    console.error("Error fetching submissions by job ID:", error);
    throw error;
  }
};

export const acceptSubmission = async (submissionId) => {
  try {
    const response = await api.patch(
      `/jobs/submissions/${submissionId}/accept`
    );
    return response;
  } catch (error) {
    console.error("Error accepting submission:", error);
    throw error;
  }
};

export const rejectSubmission = async (submissionId) => {
  try {
    const response = await api.patch(
      `/jobs/submissions/${submissionId}/reject`
    );
    return response;
  } catch (error) {
    console.error("Error rejecting submission:", error);
    throw error;
  }
};
