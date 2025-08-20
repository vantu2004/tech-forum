// src/components/common/Modal.jsx
import { FiX } from "react-icons/fi";

const Modal = ({ onClose, children, size = "max-w-xl" }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
    >
      <div
        className={`bg-white rounded-xl shadow-lg w-full ${size} p-5 relative max-h-[90vh] overflow-y-auto`}
      >
        {/* Nút close góc phải */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <FiX size={22} />
        </button>

        {/* Nội dung truyền vào */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
