import Cookies from "js-cookie";
import api from "./api";

export const signup = async (
  email,
  password,
  firstName,
  lastName,
  setIsLoggedIn,
  setUser
) => {
  try {
    // Validate inputs
    if (!setIsLoggedIn || !setUser) {
      console.error("Missing required callbacks:", { setIsLoggedIn, setUser });
      throw new Error("Invalid configuration: missing callbacks");
    }

    const response = await api.post("/users/signup", {
      email,
      password,
      firstName,
      lastName,
    });

    const { user, token } = response.data;

    // Validate response data
    if (!user || !token) {
      console.error("Invalid response data:", response.data);
      throw new Error("Invalid response from server");
    }

    console.log("User signed up successfully:", user);
    console.log("Token received:", token);

    // Store token in cookies
    console.log("Storing token in cookies...");
    storeToken(token);

    console.log("Cookies now are", Cookies.get());

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
    console.error("Signup error:", {
      message: error.message,
      response: error.response?.data,
      stack: error.stack,
    });
    throw error;
  }
};

// Function to store the token in cookies
export const storeToken = (token) => {
  Cookies.set("token", token, {
    expires: 7, // Token expires in 7 days
    sameSite: "None", // Ensure cross-site cookie is sent over HTTPS
    secure: true, // Enforce secure cookies (HTTPS only)
  });
  console.log("Token stored securely in cookies.");
};

// Function to remove the token (for logout)
export const removeToken = () => {
  Cookies.remove("token", {
    sameSite: "None", // Ensure the removal works across HTTPS
    secure: true, // Enforce secure removal
  });
  console.log("Token removed from cookies.");
};

// Function to retrieve the token
export const getToken = () => {
  return Cookies.get("token");
};
