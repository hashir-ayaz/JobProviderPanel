import "./App.css";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route, Navigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import PostJobPage from "./pages/PostJobPage";
import Dashboard from "./pages/Dashboard";
import DetailedJobPage from "./pages/DetailedJobPage";

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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/job/:jobId"
          element={<DetailedJobPage></DetailedJobPage>}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
      {/* </AuthProvider> */}
    </>
  );
}

export default App;
