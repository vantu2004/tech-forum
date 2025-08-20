import Footer from "./components/footer/Footer.jsx";
import Navbar_v1 from "./components/navbar/Navbar_v1.jsx";
import LandingPage from "./pages/landing_page/LandingPage.jsx";
import { Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/signup_page/SignUpPage.jsx";
import LoginPage from "./pages/login_page/LoginPage.jsx";
import Navbar_v2 from "./components/navbar/Navbar_v2.jsx";
import FeedPage from "./pages/feed_page/FeedPage.jsx";

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
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
