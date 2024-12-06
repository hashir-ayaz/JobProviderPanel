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

export const acceptProposal = async (proposalId) => {
  try {
    const response = await api.put(`/proposals/${proposalId}/accept`);
    return response;
  } catch (error) {
    console.error("Error accepting proposal:", error);
    throw error;
  }
};

export const rejectProposal = async (proposalId) => {
  try {
    const response = await api.put(`/proposals/${proposalId}/reject`);
    return response;
  } catch (error) {
    console.error("Error rejecting proposal:", error);
    throw error;
  }
};
