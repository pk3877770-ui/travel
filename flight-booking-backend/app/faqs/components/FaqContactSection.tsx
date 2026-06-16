import { MessageCircle, Phone, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FaqContactSection() {
  return (
    <div className="bg-[#F8FAFC] py-16 border-t border-slate-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          <div className="lg:w-1/3 text-center lg:text-left">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Can&apos;t find what you&apos;re looking for?
            </h2>
            <p className="text-slate-500">
              We&apos;re here to help you anytime, anywhere.
            </p>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {/* Live Chat */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Live Chat</h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                Chat with our support team in real-time.
              </p>
              <button className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:text-blue-700 transition-colors">
                Start Chat <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Call Us */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Call Us</h3>
              <p className="font-bold text-slate-800 text-sm mb-1">+91 1234 567 890</p>
              <p className="text-xs text-slate-500">Available 24/7</p>
            </div>

            {/* Email Us */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Email Us</h3>
              <a href="mailto:support@flyaway.com" className="text-blue-600 text-sm font-bold hover:underline mb-2 inline-block">
                support@flyaway.com
              </a>
              <p className="text-xs text-slate-500">We usually reply in 2 hours</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
