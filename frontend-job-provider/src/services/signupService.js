import axios from "axios";
import Cookies from "js-cookie"; // Assuming you're using js-cookie for token storage

// Define the base API URL (use environment variables for flexibility)
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Function to handle signup
export const signup = async (
  email,
  password,
  firstName,
  lastName,
  setIsLoggedIn,
  setUser
) => {
  try {
    // Logging request details
    console.log(`Attempting signup request to ${BASE_URL}/users/signup`);
    console.log(`Email: ${email}, Full Name: ${firstName} ${lastName}`);

    // Sending API request
    const response = await axios.post(`${BASE_URL}/users/signup`, {
      email,
      password,
      firstName,
      lastName,
    });

    // Log the successful response
    console.log("Signup successful. Response:", response.data);

    // Extract user and token from the response
    const { user, token } = response.data;

    // Save the token in cookies or localStorage
    Cookies.set("authToken", token, { expires: 7 }); // Token expires in 7 days
    console.log("Auth token stored in cookies");

    // Update the auth context
    setIsLoggedIn(true);
    setUser(user);
    console.log("Auth context updated with user data");

    // Return the user data for further use
    return user;
  } catch (error) {
    // Enhanced error handling
    console.error("Error during signup:", error);

    if (error.response) {
      // Handle server errors (4xx or 5xx status codes)
      console.error(
        "Server responded with error:",
        error.response.status,
        error.response.data
      );
      throw new Error(error.response.data.message || "Signup failed");
    } else if (error.request) {
      // Handle no response from the server
      console.error("No response received from server");
      throw new Error("No response from the server. Please try again later.");
    } else {
      // Handle other types of errors (e.g., network issues)
      console.error("Unexpected error:", error.message);
      throw new Error(error.message || "An unexpected error occurred.");
    }
  }
};

// Optional: Function to store the token
export const storeToken = (token) => {
  localStorage.setItem("token", token);
};

// Optional: Function to remove the token (for logout)
export const removeToken = () => {
  localStorage.removeItem("token");

  // Remove token from cookies
  Cookies.remove("authToken");
};

// Optional: Function to retrieve the token
export const getToken = () => {
  return Cookies.get("authToken") || localStorage.getItem("token");
};
