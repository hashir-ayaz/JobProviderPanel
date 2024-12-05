import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import heroPic from "../assets/hero-section.png";
import { useNavigate } from "react-router-dom";
import { login } from "../services/loginService";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import GoogleLoginButton from "../components/GoogleLoginButton";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn, setUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/api/v1/auth/google";
  };

  const handleLogin = async () => {
    try {
      await login(email, password, setIsLoggedIn, setUser);
      alert("Logged in successfully :)");
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
      setError(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen font-custom">
      {/* Left Column */}
      <div className="relative flex flex-col justify-between p-12 overflow-hidden lg:flex lg:w-1/2 bg-gradient-to-r from-primary-light to-white">
        {/* Text Content */}
        <div>
          <h1 className="mb-4 text-4xl font-bold text-secondary">
            SkillConnect.
          </h1>
          <h2 className="mb-6 text-5xl font-bold leading-tight text-secondary">
            Welcome back to SkillConnect
          </h2>
          <p className="text-lg text-gray-600">
            Log in to access your account, manage projects, and connect with
            clients or freelancers.
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
              Log in to your account
            </h3>
            <p className="text-gray-600">Access your SkillConnect dashboard</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="space-y-4"
          >
            {/* Email Input */}
            <div>
              <Input
                type="email"
                placeholder="Email address"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            {/* Login Button */}
            <Button
              //   onClick={handleLogin}
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark"
            >
              Log In
            </Button>
          </form>
          <GoogleLoginButton onClick={handleGoogleLogin} />

          <p className="mt-6 text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
          <p className="mt-4 text-sm text-center text-gray-600">
            Forgot your password?{" "}
            <Link
              href="/forgot-password"
              className="text-primary hover:underline"
            >
              Reset it here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
