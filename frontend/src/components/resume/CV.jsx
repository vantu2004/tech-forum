import { Document, Page } from "react-pdf";
import { useState } from "react";

const CV = ({ selectedCv }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const handlePrev = () => {
    setPageNumber((pageNum) => Math.max(pageNum - 1, 1));
    window.scrollTo({ top: 155, behavior: "smooth" });
  };

  const handleNext = () => {
    setPageNumber((pageNum) => Math.min(pageNum + 1, numPages));
    window.scrollTo({ top: 155, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col group items-center">
      <Document
        file={selectedCv}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        onLoadError={(error) => {
          console.error("PDF load error:", error);
          setNumPages(null); // reset pages
        }}
        loading={"Pdf is loading..."}
      >
        <Page
          pageNumber={pageNumber}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          scale={1.5}
        />
      </Document>

      {numPages && (
        <div className="-mt-15 z-10 duration-300 opacity-0 group-hover:opacity-100 flex justify-center rounded-sm shadow-md items-center space-x-3 w-fit">
          <button
            onClick={handlePrev}
            className="text-2xl px-6 py-4 hover:bg-black/10"
          >
            {" "}
            ‹{" "}
          </button>
          <span className="text-lg mt-1">
            {pageNumber} of {numPages}
          </span>
          <button
            onClick={handleNext}
            className="text-2xl px-6 py-4 hover:bg-black/10"
          >
            {" "}
            ›{" "}
          </button>
        </div>
      )}
    </div>
  );
};

export default CV;
