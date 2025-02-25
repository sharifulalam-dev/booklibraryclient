import Lottie from "lottie-react";
import React, { useContext, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Authentication } from "../AuthProvider/AuthProvider";
import animationData from "../assets/animationData.json"; // Update the path to your Lottie JSON file

const Login = () => {
  const { googleLogin, login } = useContext(Authentication);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    const blockBackNavigation = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", blockBackNavigation);

    return () => {
      window.removeEventListener("popstate", blockBackNavigation);
    };
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setError("");
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      navigate(from, { replace: true });
    } catch (err) {
      setError("Google login failed. Please try again.");
      console.error("Google login error:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError("Login failed. Check your credentials and try again.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden container mx-auto">
      <div className="h-full w-full md:w-1/2 flex items-center justify-center p-4">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
            Welcome Back!
          </h1>
          <p className="text-lg text-center text-gray-600 mb-6">
            Log in to continue to your account
          </p>

          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full py-3 bg-gray-100 text-gray-800 rounded-md shadow-md hover:bg-gray-200 transition mb-6"
          >
            <FcGoogle className="text-2xl mr-2" />
            Login with Google
          </button>

          <div className="flex items-center mb-6">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-gray-500">OR</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div>
              <label
                htmlFor="email"
                className="block text-gray-600 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-gray-600 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:underline hover:text-blue-800"
            >
              Register here
            </Link>
          </p>

          <p className="text-center text-gray-600 mt-4">
            <Link
              to="/forget-password"
              className="text-blue-600 hover:underline hover:text-blue-800"
            >
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>

      <div className="h-full w-full md:w-1/2 flex items-center justify-center p-4">
        <Lottie
          animationData={animationData}
          className="max-h-full max-w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
