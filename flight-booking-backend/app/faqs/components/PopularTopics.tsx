import { Plane, IndianRupee, RefreshCcw, XSquare, Briefcase, UserCheck } from "lucide-react";

const topics = [
  { name: "Flight Booking", icon: Plane, color: "text-blue-500", bg: "bg-blue-50" },
  { name: "Payments", icon: IndianRupee, color: "text-green-500", bg: "bg-green-50" },
  { name: "Refunds", icon: RefreshCcw, color: "text-orange-500", bg: "bg-orange-50" },
  { name: "Cancellations", icon: XSquare, color: "text-purple-500", bg: "bg-purple-50" },
  { name: "Baggage", icon: Briefcase, color: "text-indigo-500", bg: "bg-indigo-50" },
  { name: "Check-in", icon: UserCheck, color: "text-teal-500", bg: "bg-teal-50" },
];

export default function PopularTopics() {
  return (
    <div className="mb-12">
      <h2 className="text-lg font-bold text-slate-900 mb-6">Popular Topics</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {topics.map((topic) => {
          const Icon = topic.icon;
          return (
            <button
              key={topic.name}
              className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:border-blue-100 hover:shadow-lg transition-all duration-200 group"
            >
              <div className={`w-12 h-12 rounded-full ${topic.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <Icon className={`w-6 h-6 ${topic.color}`} />
              </div>
              <span className="text-sm font-semibold text-slate-700">{topic.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
