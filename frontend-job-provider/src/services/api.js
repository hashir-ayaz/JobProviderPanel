import axios from "axios";
const api = axios.create({
  baseURL: import.meta.VITE_API_URL || "https://api.example.com", // Use environment variables
  timeout: 10000, // Set timeout
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
