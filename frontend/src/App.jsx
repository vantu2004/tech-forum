import Footer from "./components/footer/Footer.jsx";
import Navbar_v1 from "./components/navbar/Navbar_v1.jsx";
import LandingPage from "./pages/landing_page/LandingPage.jsx";
import { Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/signup_page/SignUpPage.jsx";
import LoginPage from "./pages/login_page/LoginPage.jsx";
import Navbar_v2 from "./components/navbar/Navbar_v2.jsx";
import FeedPage from "./pages/feed_page/FeedPage.jsx";
import MyNetworkPage from "./pages/my_network_page/MyNetWorkPage.jsx";
import ResumePage from "./pages/resume_page/ResumePage.jsx";
import MessagePage from "./pages/message_page/MessagePage.jsx";
import ProfilePage from "./pages/profile_page/ProfilePage.jsx";
import AllActivities from "./pages/all_activities_page/AllActivitiesPage.jsx";
import NotificationPage from "./pages/notification_page/NotificationPage.jsx";
import ForgotPasswordPage from "./pages/forgot_password_page/ForgotPasswordPage.jsx";
import EmailVerificationPage from "./pages/email_verification_page/EmailVerificationPage.jsx";
import ResetPasswordPage from "./pages/reset_password_page/ResetPasswordPage.jsx";
import EmailVerificationManualPage from "./pages/email_verification_page/EmailVerificationManualPage.jsx";
import { useEffect } from "react";
import { useUserAuthStore } from "./stores/useUserAuthStore";
import { Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// nếu chưa login hoặc verify tài khoản thì redirect to login page hoặc verify email page ko thì trả về children
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, userAuth } = useUserAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!userAuth.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

// mặc định đã login thì redirect về trang feed ko thì trả về children
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, userAuth } = useUserAuthStore();

  if (isAuthenticated && userAuth.isVerified) {
    return <Navigate to="/feed" replace />;
  }

  return children;
};

function App() {
  const { isAuthenticated, checkAuth, isCheckingAuth } = useUserAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      {isAuthenticated ? <Navbar_v2 /> : <Navbar_v1 />}

      {/* Nội dung chính chiếm hết phần còn lại */}
      <main className="flex-grow bg-gray-200">
        <Routes>
          <Route
            path="/"
            element={
              <RedirectAuthenticatedUser>
                <LandingPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/login"
            element={
              <RedirectAuthenticatedUser>
                <LoginPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/signup"
            element={
              <RedirectAuthenticatedUser>
                <SignUpPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/verify-email"
            element={
              <RedirectAuthenticatedUser>
                <EmailVerificationPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/re-verify-email"
            element={
              <RedirectAuthenticatedUser>
                <EmailVerificationManualPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <RedirectAuthenticatedUser>
                <ForgotPasswordPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/reset-password/:token"
            element={
              <RedirectAuthenticatedUser>
                <ResetPasswordPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/feed"
            element={
              <ProtectedRoute>
                <FeedPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/network"
            element={
              <ProtectedRoute>
                <MyNetworkPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resume"
            element={
              <ProtectedRoute>
                <ResumePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/message"
            element={
              <ProtectedRoute>
                <MessagePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notification"
            element={
              <ProtectedRoute>
                <NotificationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/activities"
            element={
              <ProtectedRoute>
                {" "}
                <AllActivities />{" "}
              </ProtectedRoute>
            }
          />

          {/* catch all routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
