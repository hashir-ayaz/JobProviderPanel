import api from "./api";

export const fetchFreelancerById = async (freelancerId) => {
  try {
    const response = await api.get(`/users/profile/${freelancerId}`);
    console.log("Fetched freelancer by ID:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch freelancer by ID:", error.message);
    throw error;
  }
};
