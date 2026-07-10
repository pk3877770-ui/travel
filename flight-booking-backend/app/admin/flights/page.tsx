"use client";

import React, { useEffect, useState } from "react";
import { cn, formatCurrency } from "@/lib/utils";
import { Search, Plus, Loader2, Edit, Trash2, XCircle, AlertTriangle, Plane } from "lucide-react";

export default function AdminFlightsPage() {
  const [flights, setFlights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<any>(null);

  // Form State
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [form, setForm] = useState({
    flightNumber: "",
    airline: "",
    from: "",
    to: "",
    departure: "",
    arrival: "",
    duration: "",
    price: 0,
    seatsAvailable: 200,
    totalSeats: 200,
    aircraft: "",
    status: "scheduled",
  });

  // Search
  const [search, setSearch] = useState("");

  const fetchFlights = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/flights");
      const data = await res.json();
      if (data.success) {
        setFlights(data.flights);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  const openAddModal = () => {
    setForm({
      flightNumber: "",
      airline: "",
      from: "",
      to: "",
      departure: "",
      arrival: "",
      duration: "",
      price: 0,
      seatsAvailable: 200,
      totalSeats: 200,
      aircraft: "",
      status: "scheduled",
    });
    setFormError("");
    setAddOpen(true);
  };

  // Convert Date string to local datetime-local format for input
  const formatDatetimeForInput = (dateString: string) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    // Adjust for timezone offset to show correct local time in datetime-local input
    const tzOffset = (new Date()).getTimezoneOffset() * 60000; 
    const localISOTime = (new Date(d.getTime() - tzOffset)).toISOString().slice(0, 16);
    return localISOTime;
  };

  const openEditModal = (flight: any) => {
    setSelectedFlight(flight);
    setForm({
      flightNumber: flight.flightNumber,
      airline: flight.airline,
      from: flight.from,
      to: flight.to,
      departure: formatDatetimeForInput(flight.departure),
      arrival: formatDatetimeForInput(flight.arrival),
      duration: flight.duration,
      price: flight.price,
      seatsAvailable: flight.seatsAvailable,
      totalSeats: flight.totalSeats,
      aircraft: flight.aircraft,
      status: flight.status,
    });
    setFormError("");
    setEditOpen(true);
  };

  const openDeleteModal = (flight: any) => {
    setSelectedFlight(flight);
    setDeleteOpen(true);
  };

  const handleSaveFlight = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFormError("");
    try {
      const url = editOpen ? `/api/admin/flights/${selectedFlight._id}` : "/api/admin/flights";
      const method = editOpen ? "PATCH" : "POST";
      
      const payload = {
        ...form,
        price: Number(form.price),
        seatsAvailable: Number(form.seatsAvailable),
        totalSeats: Number(form.totalSeats),
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to save flight");
      }
      setAddOpen(false);
      setEditOpen(false);
      fetchFlights();
    } catch (err: any) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteFlight = async () => {
    if (!selectedFlight) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/flights/${selectedFlight._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to delete flight");
      }
      setDeleteOpen(false);
      fetchFlights();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const filteredFlights = flights.filter((f) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return f.flightNumber?.toLowerCase().includes(q) || f.airline?.toLowerCase().includes(q) || f.from?.toLowerCase().includes(q) || f.to?.toLowerCase().includes(q);
  });

  return (
    <>
      {/* Top Header */}
      <header className="h-24 px-10 flex items-center justify-between shrink-0 bg-white border-b border-slate-100">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-slate-800">Flight Management</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search flights..."
              className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 w-48 sm:w-64"
            />
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-95 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" /> Add Flight
          </button>
        </div>
      </header>

      {/* Scrollable Content */}
      <main className="flex-1 overflow-y-auto p-10">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider font-bold text-slate-500">
                  <th className="p-4">Flight & Airline</th>
                  <th className="p-4">Route</th>
                  <th className="p-4">Timing</th>
                  <th className="p-4">Price & Seats</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">Loading flights...</td>
                  </tr>
                ) : filteredFlights.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">No flights found.</td>
                  </tr>
                ) : (
                  filteredFlights.map((flight) => (
                    <tr key={flight._id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                            <Plane className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-800">{flight.flightNumber}</p>
                            <p className="text-[11px] font-bold uppercase text-slate-500">{flight.airline}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="font-bold text-slate-700">{flight.from} <span className="text-slate-400 font-normal mx-1">to</span> {flight.to}</p>
                        <p className="text-[11px] text-slate-500">Aircraft: {flight.aircraft}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-sm font-medium text-slate-700">
                          {new Date(flight.departure).toLocaleDateString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                        </p>
                        <p className="text-[11px] text-slate-500">Duration: {flight.duration}</p>
                      </td>
                      <td className="p-4">
                        <p className="font-bold text-emerald-600">{formatCurrency(flight.price)}</p>
                        <p className="text-[11px] text-slate-500">{flight.seatsAvailable} / {flight.totalSeats} Seats</p>
                      </td>
                      <td className="p-4">
                        <span className={cn(
                          "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase",
                          flight.status === 'scheduled' ? "bg-green-100 text-green-700" : 
                          flight.status === 'delayed' ? "bg-amber-100 text-amber-700" : 
                          "bg-red-100 text-red-700"
                        )}>
                          {flight.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => openEditModal(flight)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => openDeleteModal(flight)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add / Edit Flight Modal */}
      {(addOpen || editOpen) && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Plane className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">{editOpen ? "Edit Flight" : "Add New Flight"}</h3>
              </div>
              <button onClick={() => { setAddOpen(false); setEditOpen(false); }} className="text-slate-400 hover:text-slate-600">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <form id="flight-form" onSubmit={handleSaveFlight} className="space-y-4">
                {formError && (
                  <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 text-sm font-medium">
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">Flight Number</label>
                    <input
                      type="text"
                      required
                      value={form.flightNumber}
                      onChange={(e) => setForm({ ...form, flightNumber: e.target.value.toUpperCase() })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 uppercase font-mono"
                      placeholder="e.g. AI-202"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">Airline</label>
                    <input
                      type="text"
                      required
                      value={form.airline}
                      onChange={(e) => setForm({ ...form, airline: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                      placeholder="e.g. Air India"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">From (Origin)</label>
                    <input
                      type="text"
                      required
                      value={form.from}
                      onChange={(e) => setForm({ ...form, from: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                      placeholder="e.g. New Delhi"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">To (Destination)</label>
                    <input
                      type="text"
                      required
                      value={form.to}
                      onChange={(e) => setForm({ ...form, to: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                      placeholder="e.g. Mumbai"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">Departure Time</label>
                    <input
                      type="datetime-local"
                      required
                      value={form.departure}
                      onChange={(e) => setForm({ ...form, departure: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">Arrival Time</label>
                    <input
                      type="datetime-local"
                      required
                      value={form.arrival}
                      onChange={(e) => setForm({ ...form, arrival: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">Duration</label>
                    <input
                      type="text"
                      required
                      value={form.duration}
                      onChange={(e) => setForm({ ...form, duration: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                      placeholder="e.g. 2h 15m"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">Price ($)</label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value as any })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                      placeholder="e.g. 5500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">Aircraft</label>
                    <input
                      type="text"
                      required
                      value={form.aircraft}
                      onChange={(e) => setForm({ ...form, aircraft: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                      placeholder="e.g. Boeing 737"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">Status</label>
                    <select
                      value={form.status}
                      onChange={(e) => setForm({ ...form, status: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary cursor-pointer"
                    >
                      <option value="scheduled">Scheduled</option>
                      <option value="delayed">Delayed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">Total Seats</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={form.totalSeats}
                      onChange={(e) => setForm({ ...form, totalSeats: e.target.value as any })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">Available Seats</label>
                    <input
                      type="number"
                      required
                      min={0}
                      max={form.totalSeats}
                      value={form.seatsAvailable}
                      onChange={(e) => setForm({ ...form, seatsAvailable: e.target.value as any })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                </div>
              </form>
            </div>

            <div className="p-6 border-t border-slate-100 shrink-0 bg-slate-50 flex gap-3">
              <button
                type="button"
                onClick={() => { setAddOpen(false); setEditOpen(false); }}
                className="flex-1 px-4 py-2.5 border border-slate-200 bg-white text-slate-600 rounded-lg font-bold text-sm hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="flight-form"
                disabled={saving}
                className="flex-1 px-4 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : editOpen ? "Save Changes" : "Create Flight"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden text-center p-8">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Delete Flight?</h3>
            <p className="text-sm text-slate-500 mb-8">
              Are you sure you want to delete flight <strong>{selectedFlight?.flightNumber}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteOpen(false)}
                className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 rounded-lg font-bold text-sm hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteFlight}
                disabled={saving}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-sm transition-colors disabled:opacity-60 flex justify-center items-center gap-2"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
}
