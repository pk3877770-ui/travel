import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`w-8 h-8 flex items-center justify-center rounded text-sm font-medium transition-colors ${
              currentPage === i
                ? "bg-blue-600 text-white font-bold"
                : "bg-white text-slate-700 hover:bg-slate-50 border border-transparent"
            }`}
          >
            {i}
          </button>
        );
      }
    } else {
      // Always show first, last, and pages around current
      pages.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          className={`w-8 h-8 flex items-center justify-center rounded text-sm font-medium transition-colors ${
            currentPage === 1 ? "bg-blue-600 text-white font-bold" : "bg-white text-slate-700 hover:bg-slate-50"
          }`}
        >
          1
        </button>
      );

      if (currentPage > 3) {
        pages.push(<span key="dots-1" className="px-1 text-slate-400">...</span>);
      }

      // Pages around current
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`w-8 h-8 flex items-center justify-center rounded text-sm font-medium transition-colors ${
              currentPage === i ? "bg-blue-600 text-white font-bold" : "bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            {i}
          </button>
        );
      }

      if (currentPage < totalPages - 2) {
        pages.push(<span key="dots-2" className="px-1 text-slate-400">...</span>);
      }

      pages.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={`w-8 h-8 flex items-center justify-center rounded text-sm font-medium transition-colors ${
            currentPage === totalPages ? "bg-blue-600 text-white font-bold" : "bg-white text-slate-700 hover:bg-slate-50"
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-1 mt-8 mb-4">
      <button 
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="w-8 h-8 flex items-center justify-center rounded bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      
      {renderPageNumbers()}

      <button 
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="w-8 h-8 flex items-center justify-center rounded bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;
