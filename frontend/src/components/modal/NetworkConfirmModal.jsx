import React from "react";
import Modal from "./Modal";

const NetworkConfirmModal = ({ onClose, action, onConfirm }) => {
  const buttonBackground =
    (action === "Cancel" || action === "Decline" || action === "Remove")
      ? "bg-red-500 hover:bg-red-600"
      : "bg-blue-500 hover:bg-blue-600";

  const type =
    (action === "Remove" || action === "Connect") ? "Connection" : "Invite";
  return (
    <Modal onClose={onClose} size="max-w-sm">
      <h3 className="text-lg font-semibold mb-2 text-center">
        {action} Friend {type}
      </h3>
      <p className="text-sm text-gray-600 mb-4 text-center">
        Are you sure you want to {action.toLowerCase()}{" "}
        {action === "Connect" ? "to" : ""} this{" "}
        {action === "Connect" ? "person" : type.toLowerCase()}?
      </p>

      <div className="flex justify-center gap-3">
        <button
          onClick={onClose}
          className="px-4 py-1.5 text-sm rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700"
        >
          No, keep it
        </button>
        <button
          onClick={onConfirm}
          className={`px-4 py-1.5 text-sm rounded-md ${buttonBackground} text-white`}
        >
          Yes, {action.toLowerCase()} it
        </button>
      </div>
    </Modal>
  );
};

export default NetworkConfirmModal;
