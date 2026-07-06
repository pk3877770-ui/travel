"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Search, Plus, Loader2, Tag, Edit, Trash2, XCircle, AlertTriangle, Image as ImageIcon } from "lucide-react";

export default function AdminOffersPage() {
  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<any>(null);

  // Form State
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    code: "",
    discountPercentage: 0,
    validUntil: "",
    isActive: true,
    image: "",
  });

  // Search
  const [search, setSearch] = useState("");

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/offers");
      const data = await res.json();
      if (data.success) {
        setOffers(data.offers);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/admin/offers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentStatus })
      });
      const data = await res.json();
      if (data.success) {
        fetchOffers();
      }
    } catch (err) {
      console.error("Toggle active failed", err);
    }
  };

  const openAddModal = () => {
    setForm({
      title: "",
      description: "",
      code: "",
      discountPercentage: 0,
      validUntil: "",
      isActive: true,
      image: "",
    });
    setFormError("");
    setAddOpen(true);
  };

  const openEditModal = (offer: any) => {
    setSelectedOffer(offer);
    setForm({
      title: offer.title,
      description: offer.description || "",
      code: offer.code,
      discountPercentage: offer.discountPercentage,
      validUntil: new Date(offer.validUntil).toISOString().split('T')[0],
      isActive: offer.isActive,
      image: offer.image || "",
    });
    setFormError("");
    setEditOpen(true);
  };

  const openDeleteModal = (offer: any) => {
    setSelectedOffer(offer);
    setDeleteOpen(true);
  };

  const handleSaveOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFormError("");
    try {
      const url = editOpen ? `/api/admin/offers/${selectedOffer._id}` : "/api/admin/offers";
      const method = editOpen ? "PATCH" : "POST";
      
      const payload = {
        ...form,
        discountPercentage: Number(form.discountPercentage),
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to save offer");
      }
      setAddOpen(false);
      setEditOpen(false);
      fetchOffers();
    } catch (err: any) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteOffer = async () => {
    if (!selectedOffer) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/offers/${selectedOffer._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to delete offer");
      }
      setDeleteOpen(false);
      fetchOffers();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const filteredOffers = offers.filter((o) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return o.title?.toLowerCase().includes(q) || o.code?.toLowerCase().includes(q);
  });

  return (
    <>
      {/* Top Header */}
      <header className="h-24 px-10 flex items-center justify-between shrink-0 bg-white border-b border-slate-100">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-slate-800">Offers & Promotions</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title or code..."
              className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 w-48 sm:w-64"
            />
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-95 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" /> Add Offer
          </button>
        </div>
      </header>

      {/* Scrollable Content */}
      <main className="flex-1 overflow-y-auto p-10">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider font-bold text-slate-500">
                  <th className="p-4">Title & Description</th>
                  <th className="p-4">Promo Code</th>
                  <th className="p-4">Discount</th>
                  <th className="p-4">Validity</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">Loading offers...</td>
                  </tr>
                ) : filteredOffers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">No offers found.</td>
                  </tr>
                ) : (
                  filteredOffers.map((offer) => (
                    <tr key={offer._id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {offer.image ? (
                            <div className="w-10 h-10 rounded border border-slate-200 overflow-hidden shrink-0">
                              <img src={offer.image} alt={offer.title} className="w-full h-full object-cover" />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded bg-blue-50 flex items-center justify-center shrink-0">
                              <ImageIcon className="w-4 h-4 text-blue-300" />
                            </div>
                          )}
                          <div>
                            <p className="font-bold text-slate-800">{offer.title}</p>
                            <p className="text-[10px] text-slate-400 max-w-[200px] truncate">{offer.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-mono font-bold text-sm bg-slate-100 px-2 py-1 rounded text-slate-700">
                          {offer.code}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full text-xs">
                          {offer.discountPercentage}% OFF
                        </span>
                      </td>
                      <td className="p-4 text-xs font-medium text-slate-600">
                        {new Date(offer.validUntil).toLocaleDateString("en-GB", {
                          day: "2-digit", month: "short", year: "numeric"
                        })}
                      </td>
                      <td className="p-4">
                        {offer.isActive ? (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-green-100 text-green-700">Active</span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-slate-100 text-slate-600">Inactive</span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleToggleActive(offer._id, offer.isActive)}
                            className={cn(
                              "px-3 py-1.5 text-xs font-bold rounded-lg transition-colors",
                              offer.isActive ? "bg-slate-100 text-slate-600 hover:bg-slate-200" : "bg-green-50 text-green-600 hover:bg-green-100"
                            )}
                          >
                            {offer.isActive ? "Deactivate" : "Activate"}
                          </button>
                          <button 
                            onClick={() => openEditModal(offer)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => openDeleteModal(offer)}
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

      {/* Add / Edit Offer Modal */}
      {(addOpen || editOpen) && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Tag className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">{editOpen ? "Edit Offer" : "Add New Offer"}</h3>
              </div>
              <button onClick={() => { setAddOpen(false); setEditOpen(false); }} className="text-slate-400 hover:text-slate-600">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSaveOffer} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {formError && (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 text-sm font-medium">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">Offer Title</label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                    placeholder="Summer Sale 2026"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">Description (Optional)</label>
                  <textarea
                    rows={2}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                    placeholder="Enjoy flat discounts on all summer flights..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">Promo Code</label>
                  <input
                    type="text"
                    required
                    value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 uppercase"
                    placeholder="SUMMER20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">Discount Percentage (%)</label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={100}
                    value={form.discountPercentage}
                    onChange={(e) => setForm({ ...form, discountPercentage: e.target.value as any })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                    placeholder="20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">Valid Until</label>
                  <input
                    type="date"
                    required
                    value={form.validUntil}
                    onChange={(e) => setForm({ ...form, validUntil: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">Status</label>
                  <select
                    value={form.isActive.toString()}
                    onChange={(e) => setForm({ ...form, isActive: e.target.value === "true" })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary cursor-pointer"
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">Image URL (Optional)</label>
                  <input
                    type="url"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-100 mt-6">
                <button
                  type="button"
                  onClick={() => { setAddOpen(false); setEditOpen(false); }}
                  className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 rounded-lg font-bold text-sm hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 px-4 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : editOpen ? "Save Changes" : "Create Offer"}
                </button>
              </div>
            </form>
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
            <h3 className="text-xl font-bold text-slate-800 mb-2">Delete Offer?</h3>
            <p className="text-sm text-slate-500 mb-8">
              Are you sure you want to delete the offer <strong>{selectedOffer?.title}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteOpen(false)}
                className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 rounded-lg font-bold text-sm hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteOffer}
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
