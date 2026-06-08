import React from "react";
import { Star } from "lucide-react";

interface ReviewSectionProps {
  reviews: any[];
}

const ReviewSection = ({ reviews }: ReviewSectionProps) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="bg-slate-50 p-8 rounded-2xl text-center">
        <p className="text-slate-500">No reviews yet. Be the first to review!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {reviews.map((review, idx) => (
        <div key={idx} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E7F1FF] text-[#0A58CA] flex items-center justify-center font-bold text-lg">
                {review.author.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="font-bold text-slate-800">{review.author}</div>
                <div className="text-xs text-slate-400">{new Date(review.date).toLocaleDateString()}</div>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-bold text-yellow-700">{review.rating.toFixed(1)}</span>
            </div>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">"{review.comment}"</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewSection;
