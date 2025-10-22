import React, { useState } from "react";
import LeftSidebar from "../../components/my_network/LeftSidebar";
import NetWorkContent from "../../components/my_network/network_content/NetWorkContent";

const MyNetworkPage = () => {
  const [totalSent, setTotalSent] = useState(0);
  const [totalReceived, setTotalReceived] = useState(0);
  const [totalConnections, setTotalConnections] = useState(0);

  return (
    <div className="container mx-auto max-w-7xl flex gap-6 mt-20 mb-6 px-6 text-black">
      <LeftSidebar
        totalSent={totalSent}
        totalReceived={totalReceived}
        totalConnections={totalConnections}
      />
      <NetWorkContent
        setTotalSent={setTotalSent}
        setTotalReceived={setTotalReceived}
        setTotalConnections={setTotalConnections}
      />
    </div>
  );
};

export default MyNetworkPage;
