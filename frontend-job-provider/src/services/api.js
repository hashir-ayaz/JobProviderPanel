import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_APP_API_URL || "http://localhost:3000/api/v1";
const api = axios.create({
  baseURL: BASE_URL, // Use environment variables
  timeout: 10000, // Set timeout
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
