"use client";

import React, { useState, useEffect } from "react";
import { Loader2, Save, Globe, Phone, Mail, DollarSign, ShieldAlert, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  
  const [form, setForm] = useState({
    siteName: "",
    supportEmail: "",
    contactPhone: "",
    currency: "INR",
    maintenanceMode: false
  });

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      if (data.success && data.settings) {
        setForm({
          siteName: data.settings.siteName || "",
          supportEmail: data.settings.supportEmail || "",
          contactPhone: data.settings.contactPhone || "",
          currency: data.settings.currency || "INR",
          maintenanceMode: data.settings.maintenanceMode || false
        });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Failed to load settings." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to save settings");
      }

      setMessage({ type: "success", text: "Settings saved successfully!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <header className="h-24 px-10 flex items-center justify-between shrink-0 bg-white border-b border-slate-100">
        <h1 className="text-2xl font-bold text-slate-800">Platform Settings</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-10 bg-slate-50/50">
        <div className="max-w-4xl mx-auto">
          
          {/* Tabs */}
          <div className="flex gap-2 border-b border-slate-200 mb-8">
            <button
              onClick={() => setActiveTab("general")}
              className={cn(
                "px-6 py-3 text-sm font-bold border-b-2 transition-colors",
                activeTab === "general" ? "border-primary text-primary" : "border-transparent text-slate-500 hover:text-slate-700"
              )}
            >
              General Information
            </button>
            <button
              onClick={() => setActiveTab("system")}
              className={cn(
                "px-6 py-3 text-sm font-bold border-b-2 transition-colors",
                activeTab === "system" ? "border-primary text-primary" : "border-transparent text-slate-500 hover:text-slate-700"
              )}
            >
              System Preferences
            </button>
          </div>

          {message.text && (
            <div className={cn(
              "p-4 rounded-xl mb-6 flex items-center gap-3 text-sm font-bold animate-in fade-in slide-in-from-top-2",
              message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
            )}>
              {message.type === "success" ? <CheckCircle className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
              {message.text}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <form onSubmit={handleSave} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              
              {activeTab === "general" && (
                <div className="p-8 space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-1">Site Identity</h3>
                    <p className="text-sm text-slate-500 mb-6">Manage the basic information displayed across your booking platform.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-2">Platform Name</label>
                        <div className="relative">
                          <Globe className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            required
                            value={form.siteName}
                            onChange={(e) => setForm({ ...form, siteName: e.target.value })}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-2">Default Currency</label>
                        <div className="relative">
                          <DollarSign className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <select
                            value={form.currency}
                            onChange={(e) => setForm({ ...form, currency: e.target.value })}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 appearance-none cursor-pointer"
                          >
                            <option value="INR">INR (₹)</option>
                            <option value="USD">USD ($)</option>
                            <option value="EUR">EUR (€)</option>
                            <option value="GBP">GBP (£)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr className="border-slate-100" />

                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-1">Contact Details</h3>
                    <p className="text-sm text-slate-500 mb-6">Where should customers reach out for support?</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-2">Support Email</label>
                        <div className="relative">
                          <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="email"
                            required
                            value={form.supportEmail}
                            onChange={(e) => setForm({ ...form, supportEmail: e.target.value })}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-2">Contact Phone</label>
                        <div className="relative">
                          <Phone className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            required
                            value={form.contactPhone}
                            onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "system" && (
                <div className="p-8 space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-1">Maintenance Mode</h3>
                    <p className="text-sm text-slate-500 mb-6">Temporarily disable public access to your booking platform.</p>
                    
                    <div className="flex items-center justify-between bg-slate-50 border border-slate-200 p-5 rounded-xl">
                      <div>
                        <div className="font-bold text-slate-800">Enable Maintenance Mode</div>
                        <div className="text-sm text-slate-500 mt-1">Visitors will see a "Down for maintenance" message. Admin access is retained.</div>
                      </div>
                      
                      {/* Custom Toggle Switch */}
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, maintenanceMode: !form.maintenanceMode })}
                        className={cn(
                          "relative inline-flex h-7 w-14 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                          form.maintenanceMode ? "bg-red-500" : "bg-slate-300"
                        )}
                      >
                        <span className="sr-only">Use setting</span>
                        <span
                          className={cn(
                            "pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out",
                            form.maintenanceMode ? "translate-x-7" : "translate-x-0"
                          )}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg font-bold text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-95 flex items-center gap-2 disabled:opacity-60"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {saving ? "Saving..." : "Save Settings"}
                </button>
              </div>

            </form>
          )}

        </div>
      </main>
    </>
  );
}
