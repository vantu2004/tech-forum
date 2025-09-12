import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const isLoading = false;
  // const { isLoading, error, verifyEmail } = useAuthStore();

  const handleChange = (index, value) => {
    const onlyDigits = value.replace(/\D/g, "");
    const newCode = [...code];
    newCode[index] = onlyDigits.slice(0, 1); // chỉ 1 kí tự
    setCode(newCode);
    if (onlyDigits && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handlePaste = (index, e) => {
    e.preventDefault();
    const text =
      (e.clipboardData || window.clipboardData).getData("text") || "";
    const digits = text
      .replace(/\D/g, "")
      .slice(0, 6 - index)
      .split("");
    if (!digits.length) return;

    const newCode = [...code];
    for (let i = 0; i < digits.length; i++) {
      newCode[index + i] = digits[i];
    }
    setCode(newCode);

    const nextIndex = Math.min(index + digits.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0)
      inputRefs.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < 5)
      inputRefs.current[index + 1]?.focus();
  };

  const submitCode = async () => {
    // await verifyEmail(code.join(""));
    // navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitCode();
  };

  useEffect(() => {
    if (code.every((d) => d !== "") && !isLoading) {
      submitCode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  return (
    <section className="h-full flex items-center justify-center bg-gray-50 px-6 sm:px-12">
      <motion.div
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
          Verify Your Email
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Enter the 6-digit code sent to your email address.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between gap-2">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={(e) => handlePaste(index, e)}
                className="w-12 h-12 text-center text-2xl font-semibold
                           border border-gray-300 rounded-md bg-white text-gray-900
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                autoFocus={index === 0}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isLoading || code.some((d) => !d)}
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-md
                       hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        <div className="mt-6 flex justify-center">
          <Link
            to="/login"
            className="text-sm text-blue-600 hover:underline flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Login
          </Link>
        </div>

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

export default EmailVerificationPage;
