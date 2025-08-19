import { Link } from "react-router-dom";
import useGoogleAuth from "../../hooks/useGoogleAuth.js";

const LandingPage = () => {
  const login = useGoogleAuth();

  return (
    <section className="h-full bg-gray-50 flex items-center justify-center">
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 flex flex-col md:flex-row items-center">
        {/* Left Section */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-4 sm:px-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
            Welcome To Your Professional Community
          </h1>

          {/* Sign in buttons */}
          <div className="flex flex-col gap-4 w-full max-w-xs sm:max-w-sm">
            <button
              onClick={() => login()}
              className="flex items-center justify-center gap-2 border border-gray-300 rounded-md py-3 hover:bg-gray-100 transition"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              <span className="font-medium text-gray-700">
                Sign in with Google
              </span>
            </button>

            <Link
              to="/login"
              className="border border-gray-800 rounded-md py-3 font-medium text-gray-800 hover:bg-gray-800 hover:text-white transition text-center block"
            >
              Sign in with email
            </Link>
          </div>

          {/* Links */}
          <p className="text-xs text-gray-500 text-center mt-4 max-w-xs sm:max-w-sm">
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
          </p>

          <p className="mt-4 text-sm text-gray-700 text-center">
            New to TechForum?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-medium hover:underline"
            >
              Join now
            </Link>
          </p>
        </div>

        {/* Right Section (Image / Banner) */}
        <div className="hidden md:flex w-full md:w-1/2 items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="TechForum Banner"
            className="object-cover w-full max-h-96 rounded-md"
          />
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
