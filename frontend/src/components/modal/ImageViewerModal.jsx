import { useEffect, useMemo, useRef, useState } from "react";
import Modal from "./Modal";
import {
  FiChevronLeft,
  FiChevronRight,
  FiZoomIn,
  FiZoomOut,
} from "react-icons/fi";

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

const ImageViewerModal = ({
  images = [],
  initialIndex = 0,
  onClose,
  title = "Photos",
  loop = true, // cho phép vòng lặp ảnh
}) => {
  const validImages = useMemo(() => images.filter(Boolean), [images]);
  const [index, setIndex] = useState(
    clamp(initialIndex, 0, Math.max(0, validImages.length - 1))
  );
  const [zoom, setZoom] = useState(1); // 1 = fit, >1 = zoom
  const containerRef = useRef(null);

  const goPrev = () => {
    setZoom(1);
    setIndex((i) => {
      if (i > 0) return i - 1;
      return loop ? validImages.length - 1 : 0;
    });
  };

  const goNext = () => {
    setZoom(1);
    setIndex((i) => {
      if (i < validImages.length - 1) return i + 1;
      return loop ? 0 : validImages.length - 1;
    });
  };

  const toggleZoom = () => setZoom((z) => (z === 1 ? 1.8 : 1));
  const zoomIn = () => setZoom((z) => clamp(z + 0.2, 1, 3));
  const zoomOut = () => setZoom((z) => clamp(z - 0.2, 1, 3));

  // Keyboard: ← → Esc, + -
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "Escape") onClose?.();
      else if (e.key === "+" || e.key === "=") zoomIn();
      else if (e.key === "-" || e.key === "_") zoomOut();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validImages.length, loop]);

  // Swipe (mobile)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let startX = 0;
    const onTouchStart = (e) => (startX = e.touches[0].clientX);
    const onTouchEnd = (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 60) dx < 0 ? goNext() : goPrev();
    };
    el.addEventListener("touchstart", onTouchStart);
    el.addEventListener("touchend", onTouchEnd);
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  if (!validImages.length) {
    return (
      <Modal onClose={onClose} size="max-w-2xl">
        <div className="text-center text-gray-600 py-12">No images</div>
      </Modal>
    );
  }

  const canPrev = loop || index > 0;
  const canNext = loop || index < validImages.length - 1;

  return (
    <Modal onClose={onClose} size="max-w-5xl" className="text-black">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="font-semibold text-gray-800">{title}</div>
        <div className="text-sm text-gray-500">
          {index + 1} / {validImages.length}
        </div>
      </div>

      {/* Viewer */}
      <div
        ref={containerRef}
        className="relative bg-black/5 rounded-lg flex items-center justify-center select-none"
        style={{ minHeight: "50vh", maxHeight: "70vh" }}
      >
        {/* Prev */}
        {canPrev && (
          <button
            onClick={goPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow text-gray-800"
            aria-label="Previous"
          >
            <FiChevronLeft size={22} />
          </button>
        )}

        {/* Next */}
        {canNext && (
          <button
            onClick={goNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow text-gray-800"
            aria-label="Next"
          >
            <FiChevronRight size={22} />
          </button>
        )}

        {/* Zoom controls */}
        <div className="absolute bottom-2 right-2 flex gap-2">
          <button
            onClick={zoomOut}
            className="p-2 bg-white/80 hover:bg-white rounded-full shadow text-gray-800"
            aria-label="Zoom out"
          >
            <FiZoomOut />
          </button>
          <button
            onClick={toggleZoom}
            className="px-3 py-1.5 bg-white/80 hover:bg-white rounded-full shadow text-sm text-gray-800"
          >
            {zoom === 1 ? "Fit" : "Reset"}
          </button>
          <button
            onClick={zoomIn}
            className="p-2 bg-white/80 hover:bg-white rounded-full shadow text-gray-800"
            aria-label="Zoom in"
          >
            <FiZoomIn />
          </button>
        </div>

        {/* Ảnh */}
        <img
          src={validImages[index]}
          alt={`Photo ${index + 1}`}
          onDoubleClick={toggleZoom}
          className="object-contain transition-transform"
          style={{
            maxHeight: "70vh",
            maxWidth: "70%",
            transform: `scale(${zoom})`,
          }}
          draggable={false}
        />
      </div>

      {/* Thumbnails */}
      {validImages.length > 1 && (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {validImages.map((src, i) => (
            <button
              key={src + i}
              onClick={() => {
                setIndex(i);
                setZoom(1);
              }}
              className={`relative flex-shrink-0 rounded-md overflow-hidden border ${
                i === index ? "border-blue-500" : "border-transparent"
              }`}
              style={{ width: 72, height: 72 }}
              aria-label={`Go to image ${i + 1}`}
            >
              <img
                src={src}
                alt={`Thumb ${i + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </Modal>
  );
};

export default ImageViewerModal;
