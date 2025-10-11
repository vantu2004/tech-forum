import { useState } from "react";
import logo from "../../../assets/navbar/logo.png";
import { useUserFriendShipStore } from "./../../../stores/useUserFriendShipStore";
import NetworkConfirmModal from "./../../modal/NetworkConfirmModal";
import { toast } from "react-hot-toast";

const FriendCard = ({ friend, type }) => {
  const { removeFriendship, sendFriendRequest, pendingSent } = useUserFriendShipStore();
  const [activeId, setActiveId] = useState(null); // state để disable button trong khi cancel
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);

  const isRequestSent = pendingSent?.list.some(
    (req) => req.receiver._id === friend._id
  );

  // Disconnect
  const handleOpenDisconnectModal = (id) => {
    setActiveId(id);
    setShowDisconnectModal(true);
  };

  const handleCloseDisconnectModal = () => {
    setShowDisconnectModal(false);
    setActiveId(null);
  };

  const handleConfirmDisconnect = async () => {
    if (!activeId) return;
    try {
      await removeFriendship(activeId);
      handleCloseDisconnectModal();
      toast.success("Friend removed");
    } catch (error) {
      toast.error(error.message || "Error canceling invite");
    }
  };

  // Connect
  const handleOpenConnectModal = (id) => {
    setActiveId(id);
    setShowConnectModal(true);
  };

  const handleCloseConnectModal = () => {
    setShowConnectModal(false);
    setActiveId(null);
  };

  const handleConfirmConnect = async () => {
    if (!activeId) return;
    try {
      await sendFriendRequest(activeId);
      handleCloseConnectModal();
      toast.success("Friend request sent");
    } catch (error) {
      toast.error(error.message || "Error canceling invite");
    }
  };

  return (
    <div className="relative border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
      {/* Cover image */}
      <div className="w-full h-20 bg-gray-200">
        <img
          src={friend.profile?.cover_pic || logo}
          alt="cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center px-4 pb-4 -mt-10 flex-1">
        <img
          src={friend.profile?.profile_pic || logo}
          alt={friend.profile?.name}
          className="w-20 h-20 rounded-full border-2 border-white object-cover mb-2"
        />

        <p className="font-medium">{friend.profile?.name}</p>
        <p className="text-sm text-gray-600 mb-2">{friend.profile?.headline}</p>

        <div className="flex items-center justify-center gap-1 mb-3">
          <img src={logo} alt="school" className="w-4 h-4" />
          <span className="text-xs text-gray-500">
            {friend.profile?.curr_company}
          </span>
        </div>

        {/* Button sát lề dưới */}

        {type === "Disconnect" ? (
          <button
            disabled={activeId === friend.friendShipId}
            onClick={() => handleOpenDisconnectModal(friend.friendShipId)}
            className="mt-auto w-full flex items-center justify-center gap-2 border border-blue-600 text-blue-600 rounded-full py-1.5 text-sm font-medium hover:bg-blue-50"
          >
            <span>Disconnect</span>
          </button>
        ) : (
          <button
            disabled={activeId === friend._id || isRequestSent}
            onClick={() => handleOpenConnectModal(friend._id)}
            className={`mt-auto w-full flex items-center justify-center gap-2 rounded-full py-1.5 text-sm font-medium 
                      ${
                        isRequestSent
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed border border-gray-300"
                          : "border border-blue-600 text-blue-600 hover:bg-blue-50"
                      }`}
          >
            <span>{isRequestSent ? "Request Sent" : "Connect"}</span>
          </button>
        )}
      </div>

      {showDisconnectModal && (
        <NetworkConfirmModal
          onClose={handleCloseDisconnectModal}
          action={"Remove"}
          onConfirm={handleConfirmDisconnect}
        />
      )}

      {showConnectModal && (
        <NetworkConfirmModal
          onClose={handleCloseConnectModal}
          action={"Connect"}
          onConfirm={handleConfirmConnect}
        />
      )}
    </div>
  );
};

const FriendList = ({ title, friends, type }) => {
  return (
    <section className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="font-semibold mb-3">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {friends.map((f, idx) => (
          <FriendCard key={idx} friend={f} type={type} />
        ))}
      </div>
    </section>
  );
};

export default FriendList;
