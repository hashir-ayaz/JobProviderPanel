import "./App.css";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext"; // Import the AuthProvider
import { LogIn } from "lucide-react";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import PostJobPage from "./pages/PostJobPage";

function App() {
  return (
    <>
      {/* <AuthProvider> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/post-job" element={<PostJobPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
      {/* </AuthProvider> */}
    </>
  );
}

export default App;
