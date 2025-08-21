import React from "react";
import logo from "../../assets/navbar/logo.png";

const RightSideBar = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 text-center sticky top-20">
      <img src={logo} alt="Ad" className="mx-auto mb-2 rounded" />
      <p className="text-sm text-gray-700">
        Get the latest jobs and industry news
      </p>
      <button className="mt-2 bg-blue-600 text-white text-sm px-4 py-2 rounded-full hover:bg-blue-700">
        Explore
      </button>
    </div>
  );
};

export default RightSideBar;
