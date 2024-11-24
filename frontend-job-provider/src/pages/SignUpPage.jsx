import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import heroPic from "../assets/hero-section.png";
import { signup } from "../services/signupService"; // Use the Signup service
import AuthContext from "../context/AuthContext";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { setIsLoggedIn, setUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      navigate("/");
    } catch (err) {
      alert(err.message);
      setError(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Column */}
      <div className="relative flex flex-col justify-between p-12 overflow-hidden lg:flex lg:w-1/2 bg-gradient-to-r from-primary-light to-white">
        {/* Text Content */}
        <div>
          <h1 className="mb-4 text-4xl font-bold">SkillConnect.</h1>
          <h2 className="mb-6 font-serif text-5xl leading-tight">
            Connect with top clients and grow your freelance career
          </h2>
          <p className="text-lg text-gray-600">
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
            className="object-contain w-full max-w-xs mx-auto md:max-w-md"
          />
        </div>

        {/* Footer */}
        <div className="text-sm text-gray-500">
          © 2024 SkillConnect. All rights reserved.
        </div>
      </div>

      {/* Right Column */}
      <div className="flex items-center justify-center w-full p-8 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h3 className="mb-2 text-3xl font-bold text-secondary">
              Create your account
            </h3>
            <p className="text-gray-600">Join SkillConnect and start now</p>
          </div>

          {/* Google Sign-up */}
          <Button variant="outline" className="w-full mb-6">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Sign up with Google
          </Button>

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
            <div className="grid grid-cols-2 gap-4">
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
          <p className="mt-6 text-sm text-center text-gray-600">
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
