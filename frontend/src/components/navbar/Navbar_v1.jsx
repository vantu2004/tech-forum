import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../../assets/navbar/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/signup", label: "Join now" },
    { href: "/login", label: "Sign in", btn: true },
  ];

  return (
    <nav className="w-full border-b border-gray-300 bg-white shadow-sm">
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 flex justify-between items-center py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="TechForum Logo" className="h-9 w-9 rounded-md" />
          <span className="font-bold text-blue-600 text-xl sm:text-2xl">
            TechForum
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden sm:flex items-center gap-4">
          {links.map(({ href, label, btn }) => (
            <Link
              key={href}
              to={href}
              className={
                btn
                  ? "px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition"
                  : "text-blue-600 font-medium hover:underline"
              }
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="sm:hidden text-2xl text-blue-600"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="sm:hidden flex flex-col items-center gap-4 py-4 border-t border-gray-300 bg-white shadow-md">
          {links.map(({ href, label, btn }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={
                btn
                  ? "px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition"
                  : "text-blue-600 font-medium hover:underline"
              }
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
