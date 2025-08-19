import React from "react";
import { Link } from "react-router-dom";
import useGoogleAuth from "../../hooks/useGoogleAuth";

const LoginPage = () => {
  const login = useGoogleAuth();

  return (
    <section className="h-full flex items-center justify-center bg-gray-50 px-6 sm:px-12">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Welcome Back
        </h1>

        {/* Google Login */}
        <button
          onClick={() => login()}
          className="flex items-center justify-center gap-2 w-full border border-gray-300 rounded-md py-3 hover:bg-gray-100 transition mb-4"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="font-medium text-gray-700">Sign in with Google</span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Login form */}
        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter your email address"
            className="border border-gray-300 rounded-md px-4 py-2 
                       focus:ring-2 focus:ring-blue-500 outline-none 
                       placeholder-gray-400 text-gray-900 bg-white"
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="border border-gray-300 rounded-md px-4 py-2 
                       focus:ring-2 focus:ring-blue-500 outline-none 
                       placeholder-gray-400 text-gray-900 bg-white"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>

        {/* Links */}
        <p className="text-sm text-gray-600 text-center mt-4">
          New to TechForum?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Create an account
          </Link>
        </p>

        {/* Terms */}
        <p className="text-xs text-gray-500 text-center mt-4">
          By signing in, you agree to TechForum's{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </section>
  );
};

export default LoginPage;
