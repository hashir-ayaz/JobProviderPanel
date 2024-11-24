// loginService.js
import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const login = async (email, password, setIsLoggedIn, setUser) => {
  try {
    // Validate inputs
    if (!setIsLoggedIn || !setUser) {
      console.error("Missing required callbacks:", { setIsLoggedIn, setUser });
      throw new Error("Invalid configuration: missing callbacks");
    }

    const response = await axios.post(`${BASE_URL}/users/login`, {
      email,
      password,
    });

    const { user, token } = response.data;

    // Validate response data
    if (!user || !token) {
      console.error("Invalid response data:", response.data);
      throw new Error("Invalid response from server");
    }

    // Store token
    Cookies.set("authToken", token, { expires: 7 });

    // Update context (wrapped in try-catch for debugging)
    try {
      console.log("Attempting to update isLoggedIn state...");
      setIsLoggedIn(true);

      console.log("Attempting to update user state...", user);
      setUser(user);

      console.log("Context updates completed successfully");
    } catch (contextError) {
      console.error("Error updating context:", contextError);
      throw new Error("Failed to update authentication state");
    }

    return user;
  } catch (error) {
    console.error("Login error:", {
      message: error.message,
      response: error.response?.data,
      stack: error.stack,
    });
    throw error;
  }
};

// Optional: Function to store the token
export const storeToken = (token) => {
  localStorage.setItem("token", token);
};

// Optional: Function to remove the token (for logout)
export const removeToken = () => {
  localStorage.removeItem("token");

  //   remove token from cookies
};

// Optional: Function to retrieve the token
export const getToken = () => {
  return localStorage.getItem("token");

  //
};
