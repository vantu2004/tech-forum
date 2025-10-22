import React, { useEffect, useRef, useState } from "react";
import { useUserProfileStore } from "../../stores/useUserProfileStore";
import { Document, Page } from "react-pdf";

const ResumeContent = ({ cvOptions = [] }) => {
  const { selectedIndex, setSelectedIndex, uploadResume } =
    useUserProfileStore();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (cvOptions.length > 0) {
      setSelectedIndex(0); // mặc định chọn CV đầu tiên
    }
  }, [cvOptions, setSelectedIndex]);

  const handleSelectChange = (e) => {
    setSelectedIndex(Number(e.target.value));
  };

  const handlePrev = () => {
     setPageNumber((pageNum) => Math.max(pageNum - 1, 1));
     window.scrollTo({ top: 155, behavior: "smooth" });
  }

  const handleNext = () => {
    setPageNumber((pageNum) => Math.min(pageNum + 1, numPages));
    window.scrollTo({ top: 155, behavior: "smooth" });
  }

  const selectedCv = cvOptions[selectedIndex] || "";

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">My Resume</h2>

      {cvOptions.length > 0 && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Select Resume:
          </label>

          <select
            value={selectedIndex}
            onChange={handleSelectChange}
            className="select select-info bg-white w-[120px]"
          >
            {cvOptions.map((url, index) => (
              <option key={index} value={index}>
                CV {index + 1}
              </option>
            ))}
          </select>

          <button
            className="btn btn-md btn-primary ml-4 mr-2"
            onClick={() => fileInputRef.current.click()}
          >
            Upload CV
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file && uploadResume) {
                uploadResume(file);
                setSelectedIndex(cvOptions.length - 1); // Chọn CV mới tải lên
              }
            }}
          />
        </div>
      )}

      {selectedCv ? (
        <div className="flex flex-col group items-center">
          {/* <iframe
            src={getViewerUrl(selectedCv)}
            title="Resume"
            className="w-full h-[500px] border rounded"
          ></iframe> */}
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
            <div className="-mt-15 z-10 duration-300 opacity-0 group-hover:opacity-100  flex justify-center rounded-sm shadow-md items-center space-x-3 w-fit">
              <button onClick={handlePrev} className="text-2xl px-6 py-4 hover:bg-black/10"> ‹ </button>
              <span className="text-lg mt-1">
                {pageNumber} of {numPages}
              </span>
              <button onClick={handleNext} className="text-2xl px-6 py-4 hover:bg-black/10"> › </button>
            </div>
          )}
        </div>
      ) : (
        <p className="text-sm text-gray-600">No CV available.</p>
      )}
    </div>
  );
};

export default ResumeContent;
