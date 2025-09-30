const MediaGrid = ({ images = [], onOpenImage }) => {
  const imgs = images.filter(Boolean);
  if (!imgs.length) return null;

  const display = imgs.slice(0, 4);
  const extra = imgs.length - display.length;
  const common =
    "w-full h-full object-cover cursor-pointer hover:opacity-95 transition";

  if (display.length === 1) {
    return (
      <div className="mb-3">
        <img
          src={display[0]}
          alt="Post media"
          className={`rounded-lg ${common}`}
          onClick={() => onOpenImage?.(0)} // 👈 index 0
        />
      </div>
    );
  }

  return (
    <div className="mb-3 grid gap-2 rounded-lg overflow-hidden">
      <div
        className={`grid gap-2 ${
          display.length === 2 ? "grid-cols-2" : "grid-cols-2 grid-rows-2"
        }`}
      >
        {display.map((src, i) => {
          const span3 =
            display.length === 3 && i === 0
              ? "col-span-2 row-span-2 sm:row-span-1"
              : "";
          const extraBadge =
            extra > 0 && i === display.length - 1 ? (
              <div
                className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-2xl font-semibold"
                onClick={() => onOpenImage?.(i)} // 👈 badge cũng mở
              >
                +{extra}
              </div>
            ) : null;

          return (
            <div key={src + i} className={`relative ${span3}`}>
              <img
                src={src}
                alt={`Post media ${i + 1}`}
                className={`${common} aspect-square sm:aspect-video`}
                onClick={() => onOpenImage?.(i)} // 👈 truyền index
                onKeyDown={(e) => (e.key === "Enter" ? onOpenImage?.(i) : null)}
                role="button"
                tabIndex={0}
              />
              {extraBadge}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MediaGrid;
