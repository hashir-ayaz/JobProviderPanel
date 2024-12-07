import api from "./api"; // Assuming `api` is your configured axios instance

/**
 * Updates the user profile with the provided data.
 * @param {Object} data - The updated user profile data.
 * @returns {Object} - The updated user data.
 * @throws {Error} - Throws an error if the update fails.
 */
export const updateUserProfile = async (data) => {
  console.log("Updating user profile...");
  try {
    const response = await api.patch(`/users/me`, data);
    console.log("User profile updated successfully:", response.data);
    return response.data; // Return the updated user data
  } catch (error) {
    console.error(
      "Error updating user profile:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to update user profile"
    );
  }
};
