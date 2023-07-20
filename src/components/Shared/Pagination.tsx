import React from "react";
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";

interface IPaginationProps {
  limit: number;
  total: number;

  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({
  limit,
  total,

  currentPage,
  setCurrentPage,
}: IPaginationProps) => {
  const totalPages = Math.ceil(total / limit);

  // Function to handle page click
  const handlePageClick = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Generate an array of page numbers from 1 to the total number of pages
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="mt-8">
      <nav className="flex justify-center items-center space-x-2">
        <button
          className="text-gray-500 hover:text-blue-600 p-4 inline-flex items-center gap-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <GrChapterPrevious />
        </button>

        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`w-10 h-10 ${
              currentPage === pageNumber
                ? "bg-blue-500 text-white"
                : "text-gray-500 hover:text-blue-600"
            } p-4 inline-flex items-center text-sm font-medium rounded-full`}
            onClick={() => handlePageClick(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}

        <button
          className="text-gray-500 hover:text-blue-600 p-4 inline-flex items-center gap-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <GrChapterNext />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
