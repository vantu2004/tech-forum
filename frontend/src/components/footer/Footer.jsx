const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} TechForum. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
