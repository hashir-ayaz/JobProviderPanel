// loginService.js
import api from "./api";
import Cookies from "js-cookie";

export const login = async (email, password, setIsLoggedIn, setUser) => {
  try {
    // Validate inputs
    if (!setIsLoggedIn || !setUser) {
      console.error("Missing required callbacks:", { setIsLoggedIn, setUser });
      throw new Error("Invalid configuration: missing callbacks");
    }

    const response = await api.post("/users/login", { email, password });

    const { user, token } = response.data;

    // Validate response data
    if (!user || !token) {
      console.error("Invalid response data:", response.data);
      throw new Error("Invalid response from server");
    }

    console.log("User logged in successfully:", user);
    console.log("Token received:", token);

    // Store token in cookies
    console.log("Storing token in cookies...");
    storeToken(token);

    console.log("cookies now are", Cookies.get());

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

// Optional: Function to store the token in cookies
export const storeToken = (token) => {
  Cookies.set("token", token, { expires: 7, sameSite: "None", secure: true });
};

// Optional: Function to remove the token (for logout)
export const removeToken = () => {
  localStorage.removeItem("token");
  Cookies.remove("token");
};

// Optional: Function to retrieve the token
export const getToken = () => {
  return Cookies.get("token");
};
