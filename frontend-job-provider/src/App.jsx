import "./App.css";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Import the AuthProvider

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        {/* <Footer /> */}
      </AuthProvider>
    </>
  );
}

export default App;
