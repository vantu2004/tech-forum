import Footer from "./components/footer/Footer.jsx";
import Navbar_v1 from "./components/navbar/Navbar_v1.jsx";
import LandingPage from "./pages/landing_page/LandingPage.jsx";
import { Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/signup_page/SignUpPage.jsx";
import LoginPage from "./pages/login_page/LoginPage.jsx";

function App() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar_v1 />

      {/* Nội dung chính chiếm hết phần còn lại */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
