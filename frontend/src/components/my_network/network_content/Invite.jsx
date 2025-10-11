import React, { useEffect, useState } from "react";
import logo from "../../../assets/navbar/logo.png";
import { useUserFriendShipStore } from "./../../../stores/useUserFriendShipStore";
import NetworkConfirmModal from "../../modal/NetworkConfirmModal";
import toast from "react-hot-toast";
const Invite = () => {
  const {
    fetchPendingReceived,
    pendingReceived,
    declineFriendRequest,
    acceptFriendRequest,
    isLoading,
  } = useUserFriendShipStore();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [activeId, setActiveId] = useState(null); // state để disable button trong khi cancel
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);

  useEffect(() => {
    fetchPendingReceived(currentPage);
  }, [fetchPendingReceived, currentPage]);

  const totalPages = pendingReceived.totalPages || 1;

  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const handleOpenDeclineModal = (id) => {
    setActiveId(id);
    setShowDeclineModal(true);
  };

  const handleOpenAcceptModal = (id) => {
    setActiveId(id);
    setShowAcceptModal(true);
  };

  const handleCloseDeclineModal = () => {
    setShowDeclineModal(false);
    setActiveId(null);
  };

  const handleCloseAcceptModal = () => {
    setShowAcceptModal(false);
    setActiveId(null);
  };

  const handleDecline = async () => {
    if (!activeId) return;
    try {
      await declineFriendRequest(activeId);
      handleCloseDeclineModal();
      toast.success("Invite declined");
    } catch (error) {
      toast.error(error.message || "Error decline invite");
    }
  };

  const handleAccept = async () => {
    if (!activeId) return;
    try {
      await acceptFriendRequest(activeId);
      handleCloseAcceptModal();
      toast.success("Invite accepted");
    } catch (error) {
      toast.error(error.message || "Error accept invite");
    }
  };

  return (
    <section className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="font-semibold mb-3">
        Invites received ({pendingReceived?.total || 0})
      </h2>

      {isLoading && <p className="text-gray-500 text-sm">Loading invites...</p>}

      {!isLoading && pendingReceived?.list?.length === 0 && (
        <p className="text-gray-500 text-sm">No pending invites.</p>
      )}

      {/* Card list */}
      {pendingReceived?.list?.map((invite) => (
        <div
          key={invite._id}
          className="flex flex-col md:flex-row md:items-center md:justify-between border border-gray-300 rounded-lg p-3 gap-3 mb-3"
        >
          {/* Left: avatar + info */}
          <div className="flex items-start gap-3">
            <img
              src={invite?.requester.profile?.profile_pic || logo}
              alt="avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-medium">
                {invite?.requester?.profile?.name || "Unknown"}
              </p>
              <p className="text-sm text-gray-600">
                {invite?.requester?.profile?.headline || "No headline"}
              </p>
            </div>
          </div>

          {/* Right: buttons */}
          <div className="flex gap-2 mt-3 md:mt-0 w-full md:w-auto">
            <button
              className="flex-1 md:flex-none px-4 py-1 border rounded-full text-sm hover:bg-gray-100"
              onClick={() => handleOpenDeclineModal(invite._id)}
              disabled={activeId === invite._id}
            >
              Ignore
            </button>
            <button
              className="flex-1 md:flex-none px-4 py-1 border border-blue-600 bg-white text-blue-600 rounded-full text-sm font-medium hover:bg-blue-50"
              onClick={() => handleOpenAcceptModal(invite._id)}
              disabled={activeId === invite._id}
            >
              Accept
            </button>
          </div>
        </div>
      ))}

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4 gap-2">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md text-sm ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-blue-50 text-blue-600 hover:bg-blue-100"
            }`}
          >
            Prev
          </button>

          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md text-sm ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-blue-50 text-blue-600 hover:bg-blue-100"
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* Confirmation modal */}
      {showDeclineModal && <NetworkConfirmModal
        action={"Decline"}
        onClose={handleCloseDeclineModal}
        onConfirm={handleDecline}
      />}

      {showAcceptModal && <NetworkConfirmModal
        action={"Accept"}
        onClose={handleCloseAcceptModal}
        onConfirm={handleAccept}
      />}
    </section>
  );
};

export default Invite;
