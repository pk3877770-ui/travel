import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Bookmark, Calendar, Clock } from "lucide-react";

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
}

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all flex flex-col md:flex-row group">
      
      {/* Image Section */}
      <div className="relative w-full md:w-[320px] h-[240px] md:h-auto overflow-hidden shrink-0">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content Section */}
      <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-3">
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
              {post.category}
            </span>
            <button className="text-slate-400 hover:text-blue-600 transition-colors">
              <Bookmark className="w-5 h-5" />
            </button>
          </div>
          
          <h2 className="text-2xl font-bold text-slate-800 leading-tight mb-4 group-hover:text-blue-600 transition-colors cursor-pointer">
            {post.title}
          </h2>
          
          <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-4">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </div>
            <div className="w-1 h-1 rounded-full bg-slate-300"></div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </div>
          </div>
          
          <p className="text-sm text-slate-600 line-clamp-2 mb-6">
            {post.excerpt}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-200">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-xs font-bold text-slate-700">
              <span className="text-slate-400 font-medium">By</span> {post.author.name}
            </span>
          </div>
          
          <Link
            href={`/blog/${post.id}`}
            className="inline-block border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-lg text-xs font-bold transition-colors"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
