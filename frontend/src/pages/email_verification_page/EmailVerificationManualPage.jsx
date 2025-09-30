import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { FiLoader } from "react-icons/fi";
import { toast } from "react-hot-toast";
import OTPInput from "../../components/common/OTPInput";
import { useUserAuthStore } from "../../stores/useUserAuthStore";

const EmailVerificationManualPage = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(new Array(6).fill(""));
  const navigate = useNavigate();
  const { isLoading, verifyEmail } = useUserAuthStore();

  const submitCode = async () => {
    try {
      await verifyEmail(email, code.join(""));
      navigate("/login");
    } catch (err) {
      toast.error(err?.message || "Verification failed");
    }
  };

  return (
    <section className="h-full flex items-center justify-center bg-gray-50 px-6 sm:px-12 text-gray-900">
      <motion.div
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
      >
        <h1 className="text-3xl font-bold text-center mb-2">
          Verify Your Email
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Enter your email and the 6-digit code.
        </p>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />

        <OTPInput code={code} setCode={setCode} />

        <button
          onClick={submitCode}
          disabled={isLoading || code.some((d) => !d) || !email}
          className="w-full mt-6 bg-blue-600 text-white py-2 rounded-md flex items-center justify-center disabled:opacity-50"
        >
          {isLoading ? <FiLoader className="animate-spin" /> : "Verify Email"}
        </button>

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-blue-600 hover:underline flex items-center justify-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default EmailVerificationManualPage;
