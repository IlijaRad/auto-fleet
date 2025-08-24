import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { Dispatch, SetStateAction } from "react";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
  getPaginationRange: () => (number | string)[];
}

export default function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
  getPaginationRange,
}: PaginationProps) {
  return (
    <>
      <button
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="size-10 self-start cursor-pointer flex items-center justify-center bg-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
      >
        <IconChevronLeft className="size-4" />
      </button>
      <div className="flex gap-2 flex-wrap items-center">
        {getPaginationRange().map((page, index) =>
          typeof page === "string" ? (
            <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-600">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              aria-label={`Page ${page}`}
              className={`size-10 rounded-lg cursor-pointer ${
                currentPage === page
                  ? "bg-indigo-600 text-white"
                  : "border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>
      <button
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="size-10 flex cursor-pointer items-center justify-center bg-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
      >
        <IconChevronRight className="size-4" />
      </button>
    </>
  );
}
