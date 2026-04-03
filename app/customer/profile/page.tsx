"use client";
import { useState } from "react";
import CustomerShell from "@/components/customer/CustomerShell";
import StatusBadge from "@/components/shared/StatusBadge";
import { customerUser, mockShipments } from "@/lib/data";

const tabs = ["Profile", "Shipment History", "Saved Addresses", "Security"];

export default function CustomerProfile() {
  const [tab, setTab] = useState(0);
  const [editing, setEditing] = useState(false);
  const inp = "w-full px-4 py-2.5 bg-[#f2ecd9] border-none rounded-lg text-sm focus:ring-2 ring-[#00442d]/20 outline-none text-[#00442d]";
  const lbl = "block text-xs font-bold text-[#506357] uppercase tracking-wider mb-1.5";

  return (
    <CustomerShell>
      <div className="p-8 max-w-5xl mx-auto space-y-8">
        {/* Profile hero */}
        <div className="bg-white rounded-xl border border-[#506357]/5 overflow-hidden shadow-sm">
          <div className="h-24 bg-gradient-to-r from-[#00442d] to-[#0f5d41] relative">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff9eb 0,#fff9eb 1px,transparent 0,transparent 50%)", backgroundSize: "12px 12px" }} />
          </div>
          <div className="px-8 pb-8 relative">
            <div className="flex justify-between items-end -mt-10 mb-5">
              <div className="relative">
                <div className="w-20 h-20 rounded-xl border-4 border-white shadow-lg overflow-hidden">
                  <img src={customerUser.avatar} alt="avatar" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-400 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-white" style={{ fontSize: "12px", fontVariationSettings: "'FILL' 1" }}>check</span>
                </div>
              </div>
              <button onClick={() => setEditing(!editing)}
                className={`px-5 py-2 rounded-lg font-bold text-sm transition-all ${editing ? "bg-[#00442d] text-[#fff9eb]" : "border border-[#506357]/30 text-[#506357] hover:bg-[#f2ecd9]"}`}>
                {editing ? "Save Changes" : "Edit Profile"}
              </button>
            </div>
            <h2 className="text-2xl font-extrabold text-[#00442d]">{customerUser.name}</h2>
            <p className="text-[#506357] text-sm">{customerUser.role} · Omni-Global Solutions</p>
            <div className="flex items-center gap-4 mt-3">
              <span className="text-xs bg-[#00442d]/10 text-[#00442d] px-3 py-1 rounded-full font-bold">{customerUser.plan} Account</span>
              <span className="text-xs text-[#506357]">Member since Jan 2022</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-[#f2ecd9] p-1 rounded-lg w-fit">
          {tabs.map((t, i) => (
            <button key={t} onClick={() => setTab(i)}
              className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${tab === i ? "bg-[#00442d] text-[#fff9eb] shadow-sm" : "text-[#506357] hover:text-[#00442d]"}`}>
              {t}
            </button>
          ))}
        </div>

        {/* Profile tab */}
        {tab === 0 && (
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-[#506357]/5 shadow-sm space-y-5">
              <h3 className="font-bold text-[#00442d]">Personal Information</h3>
              {[["Full Name", customerUser.name], ["Email", customerUser.email], ["Phone", customerUser.phone], ["Company", "Omni-Global Solutions"]].map(([l, v]) => (
                <div key={l}>
                  <label className={lbl}>{l}</label>
                  {editing && l !== "Company" ? <input defaultValue={v} className={inp} /> : <p className="text-sm font-medium text-[#00442d]">{v}</p>}
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <div className="bg-[#00442d] p-6 rounded-xl text-[#fff9eb]">
                <div className="flex justify-between items-start mb-5">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-200/70 mb-1">Account Plan</p>
                    <h3 className="text-2xl font-bold">{customerUser.plan}</h3>
                    <p className="text-emerald-100/70 text-xs mt-1">$149/month · Renews Dec 1, 2025</p>
                  </div>
                  <span className="text-xs bg-emerald-400/20 text-emerald-300 px-3 py-1 rounded-full font-bold">Active</span>
                </div>
                <button className="w-full py-2.5 bg-[#fff9eb]/10 border border-[#fff9eb]/20 rounded-lg font-bold text-sm hover:bg-[#fff9eb]/20 transition-all">Manage Plan</button>
              </div>
              <div className="bg-white p-6 rounded-xl border border-[#506357]/5 shadow-sm">
                <h3 className="font-bold text-[#00442d] mb-4">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[["28", "Total Orders", "local_shipping"], ["23", "Delivered", "task_alt"], ["3", "In Transit", "transit_enterexit"], ["96%", "Success Rate", "verified"]].map(([v, l, ic]) => (
                    <div key={l} className="text-center p-3 bg-[#faf3df] rounded-lg">
                      <span className="material-symbols-outlined text-[#00442d] block mb-1" style={{ fontSize: "18px" }}>{ic}</span>
                      <p className="text-lg font-extrabold text-[#00442d]">{v}</p>
                      <p className="text-[10px] text-[#506357] mt-0.5">{l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* History tab */}
        {tab === 1 && (
          <div className="bg-white rounded-xl border border-[#506357]/5 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-[#506357]/5 flex justify-between items-center">
              <h3 className="font-bold text-[#00442d]">Shipment History</h3>
              <div className="flex gap-2">
                <input type="text" placeholder="Search by ID..."
                  className="px-4 py-2 bg-[#f2ecd9] rounded-lg text-sm focus:ring-2 ring-[#00442d]/20 outline-none border-none w-44 placeholder:text-[#506357]/50 text-[#00442d]" />
                <button className="px-4 py-2 bg-[#f2ecd9] text-[#506357] rounded-lg text-sm font-medium flex items-center gap-1 hover:bg-[#e4dbc0] transition-all">
                  <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>filter_list</span> Filter
                </button>
                <button className="p-2 bg-[#00442d] text-[#fff9eb] rounded-lg hover:opacity-90">
                  <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>download</span>
                </button>
              </div>
            </div>
            <table className="w-full text-left">
              <thead className="bg-[#f2ecd9]">
                <tr>
                  {["Order ID", "Date", "Destination", "Status", "Weight", "Invoice"].map((h, i) => (
                    <th key={h} className={`px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-[#506357] ${i === 5 ? "text-right" : ""}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#506357]/5">
                {mockShipments.map((s, i) => (
                  <tr key={s.id} className="hover:bg-[#faf3df]/60 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs font-bold text-[#00442d]">{s.id}</td>
                    <td className="px-6 py-4 text-sm text-[#1f1c08]">Oct {20 + i}, 2024</td>
                    <td className="px-6 py-4 text-sm text-[#00442d]">{s.destination}</td>
                    <td className="px-6 py-4"><StatusBadge status={s.status} /></td>
                    <td className="px-6 py-4 text-sm text-[#506357]">{s.weight || "—"}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="inline-flex items-center gap-1 text-[#00442d] hover:underline text-xs font-bold">
                        Download <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>description</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-6 py-4 bg-[#faf3df]/30 flex items-center justify-between border-t border-[#506357]/10">
              <span className="text-xs text-[#506357] font-medium">Showing 1 to {mockShipments.length} of 28 entries</span>
              <div className="flex items-center gap-2">
                {["chevron_left", null, null, null, "chevron_right"].map((ic, i) => (
                  ic ? (
                    <button key={i} className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#506357]/20 text-[#506357] hover:bg-white transition-colors">
                      <span className="material-symbols-outlined text-sm">{ic}</span>
                    </button>
                  ) : (
                    <button key={i} className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold ${i === 1 ? "bg-[#00442d] text-[#fff9eb]" : "border border-[#506357]/20 text-[#506357] hover:bg-white"}`}>{i}</button>
                  )
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Addresses tab */}
        {tab === 2 && (
          <div className="grid grid-cols-2 gap-4">
            {[{ label: "Main Warehouse (West)", addr: "4520 Logistics Pkwy, Houston, TX", icon: "warehouse" },
              { label: "HQ Corporate", addr: "2200 Market St, San Francisco, CA", icon: "apartment" },
              { label: "East Coast Hub", addr: "890 Industrial Blvd, Newark, NJ", icon: "store" }].map(a => (
              <div key={a.label} className="bg-white p-5 rounded-xl border border-[#506357]/5 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-[#f2ecd9] rounded-lg text-[#00442d]">
                    <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>{a.icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#00442d]">{a.label}</p>
                    <p className="text-xs text-[#506357] mt-0.5">{a.addr}</p>
                  </div>
                  <button className="p-1.5 text-[#506357] hover:bg-[#f2ecd9] rounded-lg transition-colors">
                    <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>edit</span>
                  </button>
                </div>
              </div>
            ))}
            <button className="bg-[#faf3df] border-2 border-dashed border-[#506357]/20 p-5 rounded-xl flex items-center justify-center gap-2 text-[#506357] hover:border-[#00442d]/30 hover:text-[#00442d] transition-all">
              <span className="material-symbols-outlined">add_location</span>
              <span className="text-sm font-bold">Add New Address</span>
            </button>
          </div>
        )}

        {/* Security tab */}
        {tab === 3 && (
          <div className="bg-white p-8 rounded-xl border border-[#506357]/5 shadow-sm space-y-5">
            <h3 className="font-bold text-[#00442d]">Account Security</h3>
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center gap-3">
              <span className="material-symbols-outlined text-emerald-600" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
              <p className="text-sm font-medium text-emerald-800">Multi-factor authentication is <strong>active</strong> on your account.</p>
            </div>
            {[{ label: "Change Password", sub: "Update your account password", icon: "lock" },
              { label: "Two-Factor Authentication", sub: "Manage 2FA settings", icon: "security" },
              { label: "Login Sessions", sub: "View and revoke active sessions", icon: "devices" },
              { label: "Delete Account", sub: "Permanently remove your account", icon: "delete", danger: true }].map(a => (
              <div key={a.label} className={`flex items-center justify-between py-4 border-b border-[#506357]/5 last:border-0 ${a.danger ? "opacity-60" : ""}`}>
                <div className="flex items-center gap-3">
                  <span className={`material-symbols-outlined ${a.danger ? "text-[#ba1a1a]" : "text-[#00442d]"}`}>{a.icon}</span>
                  <div>
                    <p className={`text-sm font-bold ${a.danger ? "text-[#ba1a1a]" : "text-[#00442d]"}`}>{a.label}</p>
                    <p className="text-xs text-[#506357]">{a.sub}</p>
                  </div>
                </div>
                <button className={`px-4 py-1.5 rounded-lg text-xs font-bold border transition-all ${a.danger ? "border-[#ba1a1a]/30 text-[#ba1a1a] hover:bg-[#ba1a1a]/5" : "border-[#506357]/30 text-[#506357] hover:bg-[#f2ecd9]"}`}>
                  {a.danger ? "Delete" : "Manage"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </CustomerShell>
  );
}
