import React from "react";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Register = () => {
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // ✅ rename to avoid clash with useForm's register
  const { register: registerUser } = useContext(AuthContext);

  const onSubmit = async ({ username, email, password }) => {
    setServerError(""); // Clear previous errors
    try {
      await registerUser(username, email, password);
      navigate("/login");
    } catch (error) {
      setServerError(error.message || "Error registering user.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create Account
            </h1>
            <p className="text-gray-600 text-sm">
              Join us and start shopping today
            </p>
          </div>

          {/* Server Error Message */}
          {serverError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700 text-sm flex items-center gap-2">
                <span className="text-lg">⚠</span>
                {serverError}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                {...register("email", { required: "Email is required." })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <span>⚠</span>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Username Field */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                  errors.username ? "border-red-500" : "border-gray-300"
                }`}
                {...register("username", { required: "Username is required." })}
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <span>⚠</span>
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Create a strong password"
                className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                {...register("password", { required: "Password is required." })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <span>⚠</span>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md transition-colors duration-200 mt-6"
            >
              Create Account
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <a
                onClick={() => navigate("/login")}
                className="text-blue-500 font-semibold hover:underline hover:cursor-pointer"
              >
                Sign In
              </a>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center text-xs text-gray-600">
          <p>By registering, you agree to our Terms & Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
