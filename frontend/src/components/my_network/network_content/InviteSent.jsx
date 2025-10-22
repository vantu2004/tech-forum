import { useEffect, useState } from "react";
import { useUserFriendShipStore } from "../../../stores/useUserFriendShipStore";
import NetworkConfirmModal from "../../modal/NetworkConfirmModal";
import toast from "react-hot-toast";
import { FaCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";

const InviteSent = ({ setTotalSent }) => {
  const { fetchPendingSent, pendingSent, isLoading, cancelFriendRequest } =
    useUserFriendShipStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [activeId, setActiveId] = useState(null); // state để disable button trong khi cancel
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchPendingSent(currentPage);
  }, [fetchPendingSent, currentPage]);

  setTotalSent(pendingSent.total);

  const totalPages = pendingSent.totalPages || 1;

  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const handleOpenCancelModal = (id) => {
    setActiveId(id);
    setShowModal(true);
  };

  const handleCloseCancelModal = () => {
    setShowModal(false);
    setActiveId(null);
  };

  const handleConfirmCancel = async () => {
    if (!activeId) return;
    try {
      await cancelFriendRequest(activeId);
      handleCloseCancelModal();
      toast.success("Invite canceled");
    } catch (error) {
      toast.error(error.message || "Error canceling invite");
    }
  };

  return (
    <section className="bg-white rounded-lg shadow-sm p-4 relative">
      <h2 className="font-semibold mb-3">
        Invites sent ({pendingSent?.total || 0})
      </h2>

      {isLoading && <p className="text-gray-500 text-sm">Loading invites...</p>}

      {!isLoading && pendingSent.list.length === 0 && (
        <p className="text-gray-500 text-sm">No pending invites.</p>
      )}

      {/* Invite cards */}
      <div className="flex flex-col gap-3">
        {pendingSent.list.map((invite) => (
          <div
            key={invite._id}
            className="flex flex-col md:flex-row md:items-center md:justify-between border border-gray-300 rounded-lg p-3 gap-3"
          >
            {/* Left: avatar + info */}
            <div className="flex items-center gap-3">
              {invite.receiver?.profile?.profile_pic ? (
                <img
                  src={invite.receiver?.profile?.profile_pic}
                  alt={invite.receiver?.profile?.name || "Unknown"}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <FaCircleUser className="w-12 h-12 rounded-full text-gray-400 bg-white  border-white" />
              )}

              <div className="flex flex-col justify-center">
                <Link to={`/profile/user/${invite.receiver._id}`}>
                  <p className="font-medium hover:text-blue-600 transition">
                    {invite.receiver?.profile?.name || "Unknown"}
                  </p>
                </Link>

                {invite.receiver?.profile?.headline && (
                  <p className="text-sm text-gray-600">
                    {invite.receiver.profile.headline}
                  </p>
                )}

                {invite.receiver?.profile?.curr_company && (
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    {invite.receiver.profile.curr_company}
                  </p>
                )}
              </div>
            </div>
            {/* Right: cancel button */}
            <div className="flex gap-2 mt-3 md:mt-0 w-full md:w-auto">
              <button
                className={`flex-1 md:flex-none px-4 py-1 border rounded-full text-sm font-medium transition-colors ${
                  activeId === invite._id
                    ? "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
                    : "border-red-500 text-red-500 hover:bg-red-50"
                }`}
                onClick={() => handleOpenCancelModal(invite._id)}
                disabled={activeId === invite._id}
              >
                {activeId === invite._id ? "Canceling..." : "Cancel Invite"}
              </button>
            </div>
          </div>
        ))}
      </div>

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
      {showModal && (
        <NetworkConfirmModal
          onClose={handleCloseCancelModal}
          action={"Cancel"}
          onConfirm={handleConfirmCancel}
        />
      )}
    </section>
  );
};

export default InviteSent;
