// src/components/post/PostModal.jsx
import { useState } from "react";
import { FiImage, FiX } from "react-icons/fi";
import Modal from "./Modal.jsx";
import { useUserProfileStore } from "../../stores/useUserProfileStore";
import { FaCircleUser } from "react-icons/fa6";
import { usePostStore } from "../../stores/usePostStore";
import { toast } from "react-hot-toast";

const MAX_FILES = 10;
const MAX_FILE_MB = 5;

const PostModal = ({ onClose }) => {
  const [desc, setDesc] = useState("");
  const [images, setImages] = useState([]); // mảng base64
  const { userProfile } = useUserProfileStore();
  const { isLoading, createPost } = usePostStore();

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const handleFilesChange = async (e) => {
    const fileList = Array.from(e.target.files || []);
    if (!fileList.length) return;

    // Giới hạn tổng số ảnh
    const availableSlots = Math.max(0, MAX_FILES - images.length);
    const selected = fileList.slice(0, availableSlots);

    // Lọc file hợp lệ + size
    const valid = selected.filter(
      (f) => f.type.startsWith("image/") && f.size <= MAX_FILE_MB * 1024 * 1024
    );

    const base64Arr = await Promise.all(valid.map(fileToBase64));
    setImages((prev) => [...prev, ...base64Arr]);
    // reset input để lần sau chọn lại cùng file vẫn kích hoạt onChange
    e.target.value = "";
  };

  const removeImage = (idx) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handlePaste = async (e) => {
    // Hỗ trợ dán ảnh từ clipboard (tuỳ chọn)
    const items = Array.from(e.clipboardData?.items || []);
    const imageItems = items.filter((it) => it.type.startsWith("image/"));
    if (!imageItems.length) return;
    const files = imageItems.map((it) => it.getAsFile()).filter(Boolean);
    const availableSlots = Math.max(0, MAX_FILES - images.length);
    const selected = files.slice(0, availableSlots);
    const valid = selected.filter((f) => f.size <= MAX_FILE_MB * 1024 * 1024);
    const base64Arr = await Promise.all(valid.map(fileToBase64));
    setImages((prev) => [...prev, ...base64Arr]);
  };

  const handleSubmit = async () => {
    const post = { desc, images }; // images: array base64

    try {
      await createPost(post);
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Error creating post");
    }

    onClose?.();
  };

  return (
    <Modal onClose={onClose} size="max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        {userProfile?.profile_pic ? (
          <img
            src={userProfile.profile_pic}
            alt="me"
            className="w-9 h-9 rounded-full"
          />
        ) : (
          <FaCircleUser className="w-9 h-9 text-gray-400" />
        )}
        <h3 className="font-semibold text-gray-800">{userProfile?.name}</h3>
      </div>

      {/* Textarea */}
      <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        onPaste={handlePaste}
        placeholder="What do you want to talk about?"
        className="w-full border-none outline-none resize-none text-gray-800 text-sm min-h-[80px]"
      />

      {/* Khu vực chọn ảnh */}
      <div className="mt-3 flex items-center justify-between">
        <label className="cursor-pointer text-gray-600 hover:text-blue-600 flex items-center gap-2">
          <FiImage className="w-5 h-5" />
          <span>
            Add photos ({images.length}/{MAX_FILES})
          </span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFilesChange}
            hidden
          />
        </label>
        <span className="text-xs text-gray-400">
          ≤ {MAX_FILE_MB}mb/image - Paste images with Ctrl+V
        </span>
      </div>

      {/* Preview nhiều ảnh */}
      {images.length > 0 && (
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
          {images.map((src, idx) => (
            <div key={idx} className="relative group">
              <img
                src={src}
                alt={`preview-${idx}`}
                className="w-full h-40 object-cover rounded-lg shadow"
              />
              <button
                onClick={() => removeImage(idx)}
                className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                title="Remove"
              >
                <FiX size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end items-center mt-4 pt-3 border-t">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-full text-sm font-medium disabled:opacity-50 flex items-center justify-center"
          disabled={(!desc && images.length === 0) || isLoading}
        >
          {isLoading ? "Posting..." : "Post"}
        </button>
      </div>
    </Modal>
  );
};

export default PostModal;
