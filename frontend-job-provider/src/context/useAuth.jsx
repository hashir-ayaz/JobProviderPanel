import { useState, useContext, createContext } from "react";
import { Provider } from "react";

// Create the AuthContext with default values
const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

// Create a provider to manage auth state
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true); // Update login state
  };

  const logout = () => {
    setIsLoggedIn(false); // Update logout state
  };

  return <Provider value={{ isLoggedIn, login, logout }}>{children}</Provider>;
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
