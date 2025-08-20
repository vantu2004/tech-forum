import React from "react";
import LeftSidebar from "../../components/my_network/LeftSidebar";
import NetWorkContent from "../../components/my_network/network_content/NetWorkContent";

const MyNetworkPage = () => {
  return (
    <div className="container mx-auto max-w-7xl flex gap-6 mt-20 mb-6 px-6 text-black">
      <LeftSidebar />
      <NetWorkContent />
    </div>
  );
};

export default MyNetworkPage;
