import { useContext } from "react";
import AuthContext from "../context/AuthContext.jsx"; // Import the context you created

// Custom hook to access AuthContext
const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export default useAuth;
