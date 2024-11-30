import api from "./api";

export const getProposalById = async (proposalId) => {
  try {
    const response = await api.get(`/proposals/${proposalId}`);
    return response;
  } catch (error) {
    console.error("Error fetching proposal by ID:", error);
    throw error;
  }
};
