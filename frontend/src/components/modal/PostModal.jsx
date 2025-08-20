// src/components/post/PostModal.jsx
import { useState } from "react";
import { FiImage, FiX } from "react-icons/fi";
import logo from "../../assets/navbar/logo.png";
import Modal from "./Modal.jsx";

const PostModal = ({ onClose }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  return (
    <Modal onClose={onClose} size="max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <img src={logo} alt="me" className="w-9 h-9 rounded-full" />
        <h3 className="font-semibold text-gray-800">Dummy User</h3>
      </div>

      {/* Textarea */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What do you want to talk about?"
        className="w-full border-none outline-none resize-none text-gray-800 text-sm min-h-[80px]"
      />

      {/* Preview ảnh */}
      {image && (
        <div className="relative mt-3">
          <img src={image} alt="preview" className="rounded-lg shadow" />
          <button
            onClick={() => setImage(null)}
            className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-red-600"
          >
            <FiX size={16} />
          </button>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between items-center mt-4 pt-3 border-t">
        <label className="cursor-pointer text-gray-600 hover:text-blue-600 flex items-center gap-1">
          <FiImage className="w-5 h-5" />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            hidden
          />
        </label>
        <button
          disabled={!text && !image}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-full text-sm font-medium disabled:opacity-50"
        >
          Post
        </button>
      </div>
    </Modal>
  );
};

export default PostModal;
