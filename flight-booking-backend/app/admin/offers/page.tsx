"use client";

import React from "react";

export default function AdminOffersPage() {
  return (
    <>
      <header className="h-24 px-10 flex items-center justify-between shrink-0 bg-white border-b border-slate-100">
        <h1 className="text-2xl font-bold text-slate-800">Offers & Promotions</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-10">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-12 text-center">
          <h2 className="text-xl font-bold text-slate-700 mb-2">Coming Soon</h2>
          <p className="text-slate-500">Offers and promotions management is currently under development.</p>
        </div>
      </main>
    </>
  );
}
