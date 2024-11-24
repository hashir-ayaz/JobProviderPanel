import api from "./api";

export const postJob = async (formData) => {};

export const fetchSkills = async () => {
  try {
    const response = await api.get("/skills");
    return response.data;
  } catch (error) {
    console.error("Error fetching skills:", error);
    throw error;
  }
};
