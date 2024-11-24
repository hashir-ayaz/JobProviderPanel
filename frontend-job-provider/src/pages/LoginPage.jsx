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

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn, setUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(email, password, setIsLoggedIn, setUser);
      alert("Logged in successfully :)");
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
              Continue with Google
            </Button>
          </form>

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
