import api from "./api";

export const submitReview = async (reviewData) => {
  try {
    const response = await api.post("/review", reviewData);
    return response;
  } catch (error) {
    console.error("Error submitting review:", error);
    throw error;
  }
};
