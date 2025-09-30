import { useEffect, useState } from "react";
import { FiMenu, FiX, FiMessageSquare, FiSearch } from "react-icons/fi";
import { FaHome, FaUserFriends, FaBriefcase, FaBell } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import logo from "../../assets/navbar/logo.png";
import { useUserProfileStore } from "../../stores/useUserProfileStore";

const Navbar_v2 = () => {
  const [open, setOpen] = useState(false);
  const { userProfile, fetchUserProfile } = useUserProfileStore();

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  // Links cố định
  const baseLinks = [
    {
      href: "/feed",
      label: "Home",
      icon: <FaHome className="text-lg flex-shrink-0" />,
    },
    {
      href: "/network",
      label: "My Network",
      icon: <FaUserFriends className="text-lg flex-shrink-0" />,
    },
    {
      href: "/resume",
      label: "Resume",
      icon: <FaBriefcase className="text-lg flex-shrink-0" />,
    },
    {
      href: "/message",
      label: "Messaging",
      icon: <FiMessageSquare className="text-lg flex-shrink-0" />,
    },
    {
      href: "/notification",
      label: "Notification",
      icon: <FaBell className="text-lg flex-shrink-0" />,
    },
  ];

  // Link profile riêng
  const profileHref = userProfile?.userId
    ? `/profile/${userProfile.userId}`
    : "/profile/me";
  const meLink = {
    type: "profile",
    href: profileHref,
    avatar: userProfile?.profile_pic || null,
  };

  const links = [...baseLinks, meLink];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-gray-300 bg-white shadow-sm">
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 flex justify-between items-center py-3">
        {/* Logo + Search */}
        <div className="flex items-center gap-4 flex-1">
          <NavLink to="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="TechForum Logo"
              className="h-9 w-9 rounded-md"
            />
          </NavLink>
          <div className="hidden sm:flex items-center border border-gray-400 rounded-full px-4 py-1.5 text-sm w-72 bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
            <FiSearch className="text-gray-500 mr-2 text-lg" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent text-gray-800 text-base focus:outline-none w-full"
            />
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden sm:flex items-center gap-8">
          {links.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center transition text-xs border-b-2 ${
                  isActive
                    ? "text-blue-600 font-semibold border-blue-600"
                    : "text-gray-600 hover:text-blue-600 border-transparent"
                }`
              }
            >
              {link.type === "profile" ? (
                link.avatar ? (
                  <img
                    src={link.avatar}
                    alt="Me"
                    className="h-9 w-9 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <FaCircleUser className="h-9 w-9 rounded-full text-gray-400 flex-shrink-0" />
                )
              ) : (
                <>
                  {link.icon}
                  <span className="mt-0.5">{link.label}</span>
                </>
              )}
            </NavLink>
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
          {baseLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold underline"
                  : "text-blue-600 font-medium hover:underline"
              }
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            to={meLink.href}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold underline"
                : "text-blue-600 font-medium hover:underline"
            }
          >
            Me
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar_v2;
