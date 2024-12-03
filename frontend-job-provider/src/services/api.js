import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL =
  import.meta.env.VITE_APP_API_URL || "http://localhost:3000/api/v1";

const api = axios.create({
  baseURL: BASE_URL, // Use environment variables
  timeout: 10000, // Set timeout
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Send cookies
});

// Add a request interceptor to dynamically include the token
api.interceptors.request.use(
  (config) => {
    console.log("All cookies:", document.cookie); // Log all cookies
    const token = Cookies.get("token"); // Fetch the token dynamically
    console.log("Fetched token from cookies:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Set Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Handle errors here
  }
);

export default api;
