import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, CheckCircle2 } from "lucide-react";

interface RoomCardProps {
  hotelId: string;
  room: any;
}

const RoomCard = ({ hotelId, room }: RoomCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col md:flex-row mb-6 hover:shadow-md transition-shadow">
      <div className="relative w-full md:w-[250px] h-[180px] md:h-auto overflow-hidden">
        <Image
          src={room.image || "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80"}
          alt={room.name}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-lg font-bold text-slate-800">{room.name}</h4>
            <div className="flex items-center gap-1 text-slate-500 text-sm font-medium bg-slate-50 px-2 py-1 rounded-md">
              <Users className="w-4 h-4" /> Up to {room.capacity}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-4 mt-4">
            {room.features?.map((feature: string, idx: number) => (
              <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                {feature}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-end justify-between pt-4 border-t border-slate-100 mt-2">
          <div>
            <div className="text-2xl font-black text-slate-800">₹{room.price.toLocaleString()} <span className="text-sm font-medium text-slate-400">/night</span></div>
            <div className="text-xs text-slate-500 mt-0.5">Includes taxes & fees</div>
          </div>
          <Link
            href={`/hotels/${hotelId}/book?roomId=${room.id}`}
            className="mt-4 md:mt-0 bg-[#0A58CA] hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold transition-colors shadow-md shadow-blue-500/30 w-full md:w-auto text-center"
          >
            Reserve Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
