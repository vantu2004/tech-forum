import React from "react";
import logo from "../../../assets/navbar/logo.png";

const Invite = () => {
  return (
    <section className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="font-semibold mb-3">Invites received (1)</h2>

      {/* Card */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border border-gray-300 rounded-lg p-3 gap-3">
        {/* Left: avatar + info */}
        <div className="flex items-start gap-3">
          <img
            src={logo}
            alt="avatar"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-medium">Quốc Mỹ Phan Huỳnh</p>
            <p className="text-sm text-gray-600">
              Bachelor of Engineering in Automotive Engineering Technology
            </p>
            <div className="flex items-center gap-1 mt-1">
              <img src={logo} alt="school" className="w-4 h-4" />
              <span className="text-xs text-gray-500">
                HCMC University of Technology and Education
              </span>
            </div>
          </div>
        </div>

        {/* Right: buttons */}
        <div className="flex gap-2 mt-3 md:mt-0 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-4 py-1 border rounded-full text-sm hover:bg-gray-100">
            Ignore
          </button>
          <button className="flex-1 md:flex-none px-4 py-1 border border-blue-600 bg-white text-blue-600 rounded-full text-sm font-medium hover:bg-blue-50">
            Accept
          </button>
        </div>
      </div>
    </section>
  );
};

export default Invite;
