import Lottie from "lottie-react";
import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import animationData from "../assets/Register.json"; // Update the path to your Lottie JSON file
import { Authentication } from "../AuthProvider/AuthProvider";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const { createNewUser, manageUser, googleLogin } = useContext(Authentication);
  const navigate = useNavigate();

  function handleChange(e) {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const { email, password, name, imageUrl } = formData;

    if (!email || !password) {
      setError("Please fill email and password fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be 6 characters long.");
      return;
    }

    if (!/[a-z]/.test(password)) {
      setError("Password must contain at least one lowercase letter.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }

    createNewUser(email, password)
      .then(() => {
        return manageUser(name, imageUrl);
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: err.message,
        });
      });
  }

  function handleGoogleLogin() {
    googleLogin()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged in with Google!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Google Login Failed",
          text: err.message,
        });
      });
  }

  return (
    <div className="h-screen flex justify-between">
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Create an Account
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-gray-600 font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

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
                placeholder="Enter your Email"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="imageUrl"
                className="block text-gray-600 font-medium mb-2"
              >
                Image URL
              </label>
              <input
                type="text"
                id="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="Enter image URL"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="block text-gray-600 font-medium mb-2"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <span
                className="absolute right-3 top-11 cursor-pointer text-gray-600"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition"
            >
              Register
            </button>
          </form>

          <button
            onClick={handleGoogleLogin}
            className="mt-4 flex items-center justify-center w-full py-3 bg-gray-100 text-gray-800 rounded-md shadow-md hover:bg-gray-200 transition"
          >
            <FcGoogle className="text-2xl mr-2" />
            Login with Google
          </button>

          <Link
            to="/login"
            className="font-extrabold text-xl text-center text-gray-600 flex items-center justify-center mt-3 bg-gray-300 py-2 rounded-lg"
          >
            Login with Email
          </Link>

          {error && <p className="text-red-500 text-center">{error}</p>}
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <Lottie
          animationData={animationData}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
