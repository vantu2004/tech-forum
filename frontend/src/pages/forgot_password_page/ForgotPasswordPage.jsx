import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserAuthStore } from "../../stores/useUserAuthStore";
import { FiLoader } from "react-icons/fi";
import toast from "react-hot-toast";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { isLoading, forgotPassword } = useUserAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setIsSubmitted(true);
    } catch (error) {
      toast.error(error?.message || "Error forgot password");
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
          Forgot Password
        </h1>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-gray-600 text-center">
              Enter your email address and we&apos;ll send you a link to reset
              your password.
            </p>

            {/* Email input (themed like Login/SignUp) */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md
                             placeholder-gray-400 text-gray-900 bg-white
                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              aria-busy={isLoading}
              className="w-full bg-blue-600 text-white font-medium py-2 rounded-md
                         hover:bg-blue-700 transition flex items-center justify-center"
            >
              {isLoading ? (
                <FiLoader className="animate-spin" />
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>
        ) : (
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center mx-auto mb-4">
              <Mail className="h-7 w-7 text-blue-600" />
            </div>
            <p className="text-gray-700">
              If an account exists for{" "}
              <span className="font-medium">{email}</span>, you will receive a
              password reset link shortly.
            </p>
          </div>
        )}

        {/* Footer links */}
        <div className="mt-6 flex justify-center">
          <Link
            to="/login"
            className="text-sm text-blue-600 hover:underline flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Login
          </Link>
        </div>

        {/* Terms (optional for consistency) */}
        <p className="text-xs text-gray-500 text-center mt-4">
          By continuing, you agree to TechForum&apos;s{" "}
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

export default ForgotPasswordPage;
