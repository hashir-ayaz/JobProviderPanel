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

export const fetchPostedJobs = async () => {
  try {
    const response = await api.get("/jobs/me");
    return response;
  } catch (error) {
    console.error("Error fetching posted jobs:", error);
    throw error;
  }
};
