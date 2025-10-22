import React from "react";
import Modal from "./Modal";
import CV from "../resume/CV";

const CvModel = ({ onClose, cv }) => {
  return (
    <Modal onClose={onClose} size="max-w-5xl">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-center mb-2">
          Preview Resume
        </h2>

        <div className="rounded-lg shadow-sm overflow-hidden">
          <CV selectedCv={cv} />
        </div>
      </div>
    </Modal>
  );
};

export default CvModel;
