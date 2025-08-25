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

function App() {
  const isLogined = true;

  return (
    <div className="h-screen flex flex-col">
      {isLogined ? <Navbar_v2 /> : <Navbar_v1 />}

      {/* Nội dung chính chiếm hết phần còn lại */}
      <main className="flex-grow bg-gray-200">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/network" element={<MyNetworkPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/message" element={<MessagePage />} />
          <Route path="/notification" element={<NotificationPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/profile/:id/activities" element={<AllActivities />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
