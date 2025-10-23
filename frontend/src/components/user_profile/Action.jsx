import {
  FiSend,
  FiUserX,
  FiFileText,
  FiUserPlus,
  FiClock,
  FiCheck,
  FiX,
} from "react-icons/fi";
import { useUserProfileStore } from "../../stores/useUserProfileStore";
import { useUserFriendShipStore } from "../../stores/useUserFriendShipStore";

const Action = ({ onOpenCvModel, onOpenMessageModal }) => {
  const { userProfileById } = useUserProfileStore();
  const {
    accepted,
    pendingSent,
    pendingReceived,
    sendFriendRequest,
    cancelFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    removeFriendship,
  } = useUserFriendShipStore();

  const viewedUserId = userProfileById?.userId;

  // Kiểm tra trạng thái kết nối
  const isFriend = accepted?.some((f) => f?._id === viewedUserId);
  const isPendingSent = pendingSent?.list?.some(
    (f) => f?.receiver?._id === viewedUserId
  );
  const isPendingReceived = pendingReceived?.list?.some(
    (f) => f?.requester?._id === viewedUserId
  );

  // Tìm friendship (dùng cho cancel/accept/decline/remove)
  const friendshipData = accepted?.find((f) => f?._id === viewedUserId);
  const pendingSentData = pendingSent?.list?.find(
    (f) => f?.receiver?._id === viewedUserId
  );
  const pendingReceivedData = pendingReceived?.list?.find(
    (f) => f?.requester?._id === viewedUserId
  );

  const handleConnect = async () => {
    try {
      await sendFriendRequest(viewedUserId);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCancel = async () => {
    try {
      await cancelFriendRequest(pendingSentData?._id);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAccept = async () => {
    try {
      await acceptFriendRequest(pendingReceivedData?._id);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDecline = async () => {
    try {
      await declineFriendRequest(pendingReceivedData?._id);
    } catch (e) {
      console.error(e);
    }
  };

  const handleRemoveFriendship = async () => {
    try {
      await removeFriendship(friendshipData?.friendShipId);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-wrap gap-3 mt-28 justify-center sm:justify-end">
      {/* CV */}
      {userProfileById?.defaultResume && (
        <button
          onClick={onOpenCvModel}
          className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 border rounded-full text-gray-700 hover:bg-gray-50 shadow-sm transition"
        >
          <FiFileText />
          <span>View CV</span>
        </button>
      )}

      {/* ĐÃ LÀ BẠN */}
      {isFriend && (
        <>
          <button
            onClick={onOpenMessageModal}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-md transition"
          >
            <FiSend />
            <span>Message</span>
          </button>

          <button
            onClick={handleRemoveFriendship}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-md transition"
          >
            <FiUserX />
            <span>Disconnect</span>
          </button>
        </>
      )}

      {/* MÌNH ĐÃ GỬI REQUEST */}
      {!isFriend && isPendingSent && (
        <button
          onClick={handleCancel}
          className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 shadow-md transition"
        >
          <FiClock />
          <span>Request Sent (Cancel)</span>
        </button>
      )}

      {/* NGƯỜI KHÁC GỬI CHO MÌNH */}
      {!isFriend && isPendingReceived && (
        <div className="flex gap-2">
          <button
            onClick={handleAccept}
            className="flex items-center justify-center gap-2 px-5 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 shadow-md transition"
          >
            <FiCheck />
            <span>Accept</span>
          </button>
          <button
            onClick={handleDecline}
            className="flex items-center justify-center gap-2 px-5 py-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 shadow-md transition"
          >
            <FiX />
            <span>Decline</span>
          </button>
        </div>
      )}

      {/* CHƯA KẾT NỐI */}
      {!isFriend && !isPendingSent && !isPendingReceived && (
        <button
          onClick={handleConnect}
          className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 shadow-md transition"
        >
          <FiUserPlus />
          <span>Connect</span>
        </button>
      )}
    </div>
  );
};

export default Action;
