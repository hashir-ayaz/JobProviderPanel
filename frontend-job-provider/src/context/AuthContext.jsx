import { createContext, useState } from "react";

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider to wrap the application
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User object
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login status

  return (
    <AuthContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
