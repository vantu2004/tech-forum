import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useGoogleAuth from "../../hooks/useGoogleAuth.js";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 24 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
};

const LandingPage = () => {
  const login = useGoogleAuth();

  return (
    <motion.section
      className="h-full bg-gray-50 flex items-center justify-center"
      initial="hidden"
      animate="show"
    >
      <motion.div
        className="container mx-auto max-w-screen-xl px-4 sm:px-6 flex flex-col md:flex-row items-center"
        variants={container}
      >
        {/* Left Section */}
        <motion.div
          className="flex flex-col justify-center items-center w-full md:w-1/2 px-4 sm:px-8"
          variants={fadeUp}
        >
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center"
            variants={fadeUp}
          >
            Welcome To Your Professional Community
          </motion.h1>

          {/* Sign in buttons */}
          <motion.div
            className="flex flex-col gap-4 w-full max-w-xs sm:max-w-sm"
            variants={fadeUp}
          >
            <motion.button
              onClick={() => login()}
              className="flex items-center justify-center gap-2 border border-gray-300 rounded-md py-3 hover:bg-gray-100 transition"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              <span className="font-medium text-gray-700">
                Sign in with Google
              </span>
            </motion.button>

            <motion.div
              whileHover={{ scale: 1.01, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/login"
                className="border border-gray-800 rounded-md py-3 font-medium text-gray-800 hover:bg-gray-800 hover:text-white transition text-center block"
              >
                Sign in with email
              </Link>
            </motion.div>
          </motion.div>

          {/* Links */}
          <motion.p
            className="text-xs text-gray-500 text-center mt-4 max-w-xs sm:max-w-sm"
            variants={fadeUp}
          >
            By clicking Continue to join or sign in, you agree to TechForum's{" "}
            <a href="#" className="text-blue-600 hover:underline">
              User Agreement
            </a>
            ,{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
            , and{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Cookie Policy
            </a>
            .
          </motion.p>

          <motion.p
            className="mt-4 text-sm text-gray-700 text-center"
            variants={fadeUp}
          >
            New to TechForum?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-medium hover:underline"
            >
              Join now
            </Link>
          </motion.p>
        </motion.div>

        {/* Right Section (Image / Banner) */}
        <motion.div
          className="hidden md:flex w-full md:w-1/2 items-center justify-center"
          variants={fadeRight}
        >
          <motion.img
            src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="TechForum Banner"
            className="object-cover w-full max-h-96 rounded-md"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default LandingPage;
