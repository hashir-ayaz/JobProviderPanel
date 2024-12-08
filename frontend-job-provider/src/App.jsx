import "./App.css";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route, Navigate } from "react-router-dom";
// import { LogIn } from "lucide-react";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import PostJobPage from "./pages/PostJobPage";
import Dashboard from "./pages/Dashboard";
import DetailedJobPage from "./pages/DetailedJobPage";
import DetailedProposalPage from "./pages/DetailedProposalPage";
import UserProfile from "./pages/user-profile";
import FreelancerProfile from "./pages/FreelancerProfile";
import ProtectedRoute from "./utils/ProtectedRoute";
import FindTalentPage from "./pages/FindTalentPage";
import { Toaster } from "@/components/ui/toaster";
import ReviewFreelancerPage from "./pages/ReviewFreelancerPage";

function App() {
  return (
    <>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/find-talent" element={<FindTalentPage />} />

        <Route
          path="/freelancer/:freelancerId"
          element={<FreelancerProfile></FreelancerProfile>}
        />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* protected routes here */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/review/:freelancerId"
            element={<ReviewFreelancerPage />}
          />
          <Route
            path="/proposal/:proposalId"
            element={<DetailedProposalPage></DetailedProposalPage>}
          />
          <Route path="/post-job" element={<PostJobPage />} />
          <Route
            path="/job/:jobId"
            element={<DetailedJobPage></DetailedJobPage>}
          />
          <Route path="/me" element={<UserProfile />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
