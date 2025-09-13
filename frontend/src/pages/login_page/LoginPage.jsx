import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useGoogleAuth from "../../hooks/useGoogleAuth";
import { useUserAuthStore } from "../../stores/useUserAuthStore";
import { FiLoader } from "react-icons/fi";
import { toast } from "react-hot-toast";

const LoginPage = () => {
  const { login, isLoading } = useUserAuthStore();
  const loginGoogle = useGoogleAuth();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      toast.error(error?.message || "Error logging in user");
    }
  };

  return (
    <section className="h-full flex items-center justify-center bg-gray-50 px-6 sm:px-12">
      <motion.div
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
      >
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Welcome Back
        </h1>

        {/* Google Login */}
        <button
          onClick={() => loginGoogle()}
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
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 
                       focus:ring-2 focus:ring-blue-500 outline-none 
                       placeholder-gray-400 text-gray-900 bg-white"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 
                       focus:ring-2 focus:ring-blue-500 outline-none 
                       placeholder-gray-400 text-gray-900 bg-white"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition flex items-center justify-center"
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? <FiLoader className="animate-spin" /> : "Sign In"}
          </button>

          {/* Verify + Forgot */}
          <div className="flex justify-between -mt-1">
            <Link
              to="/verify-email"
              className="text-sm text-blue-600 hover:underline"
            >
              Verify email
            </Link>
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
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
      </motion.div>
    </section>
  );
};

export default LoginPage;
