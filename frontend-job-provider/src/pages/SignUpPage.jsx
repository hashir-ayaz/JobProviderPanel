import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import heroPic from "../assets/hero-section.png";
import { signup } from "../services/signupService"; // Use the Signup service
import AuthContext from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import GoogleLoginButton from "../components/GoogleLoginButton";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { setIsLoggedIn, setUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/api/v1/auth/google";
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signup(
        email,
        password,
        firstName,
        lastName,
        setIsLoggedIn,
        setUser
      );
      alert("Signed up successfully!");
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
      setError(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen lg:flex-row">
      {/* Left Column */}
      <div className="relative flex flex-col justify-between p-6 lg:p-12 bg-gradient-to-r from-primary-light to-white lg:w-1/2">
        {/* Text Content */}
        <div>
          <h1 className="text-3xl font-bold lg:text-4xl">SkillConnect.</h1>
          <h2 className="mt-4 font-serif text-2xl leading-tight lg:text-5xl">
            Connect with top clients and grow your freelance career
          </h2>
          <p className="mt-4 text-base text-gray-600 lg:text-lg">
            Join thousands of freelancers who have found success on our
            platform. Get access to quality projects, secure payments, and
            professional growth opportunities.
          </p>
        </div>

        {/* Image Section */}
        <div className="mt-8">
          <img
            src={heroPic}
            alt="Person Illustration"
            className="object-contain w-full max-w-xs mx-auto md:max-w-md lg:max-w-lg"
          />
        </div>

        {/* Footer */}
        <div className="mt-8 text-xs text-center text-gray-500 lg:text-sm lg:text-left">
          © 2024 SkillConnect. All rights reserved.
        </div>
      </div>

      {/* Right Column */}
      <div className="flex items-center justify-center w-full p-6 bg-white lg:p-12 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h3 className="text-2xl font-bold lg:text-3xl text-secondary">
              Create your account
            </h3>
            <p className="mt-2 text-sm text-gray-600 lg:text-base">
              Join SkillConnect and start now
            </p>
          </div>

          {/* Google Sign-up */}
          <GoogleLoginButton onClick={handleGoogleLogin} />

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-gray-500 bg-white">
                Or continue with
              </span>
            </div>
          </div>

          {/* Sign-up Form */}
          <form onSubmit={handleSignUp} className="space-y-4">
            {/* First and Last Name */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setError("");
                  }}
                  required
                />
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    setError("");
                  }}
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute text-gray-500 -translate-y-1/2 right-3 top-1/2"
              >
                {showPassword ? (
                  <EyeOffIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Sign Up Button */}
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark"
            >
              Create your account
            </Button>
          </form>

          {/* Error Display */}
          {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

          {/* Footer Links */}
          <p className="mt-6 text-xs text-center text-gray-600 lg:text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
