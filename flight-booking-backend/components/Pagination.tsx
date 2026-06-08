import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = () => {
  return (
    <div className="flex justify-center items-center gap-1 mt-8 mb-4">
      <button className="w-8 h-8 flex items-center justify-center rounded bg-white border border-slate-200 text-slate-400 hover:bg-slate-50 transition-colors">
        <ChevronLeft className="w-4 h-4" />
      </button>
      
      <button className="w-8 h-8 flex items-center justify-center rounded bg-blue-600 text-white font-bold text-sm">
        1
      </button>
      
      <button className="w-8 h-8 flex items-center justify-center rounded bg-white text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors">
        2
      </button>
      
      <button className="w-8 h-8 flex items-center justify-center rounded bg-white text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors">
        3
      </button>
      
      <button className="w-8 h-8 flex items-center justify-center rounded bg-white text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors">
        4
      </button>
      
      <span className="px-2 text-slate-400">...</span>
      
      <button className="w-8 h-8 flex items-center justify-center rounded bg-white text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors">
        11
      </button>

      <button className="w-8 h-8 flex items-center justify-center rounded bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;
