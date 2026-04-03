"use client";
import { useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import StatusBadge from "@/components/shared/StatusBadge";
import { mockShipments, adminUser } from "@/lib/data";

const tabs = ["Profile", "Shipment History", "Notifications", "Billing"];

export default function AdminProfile() {
  const [tab, setTab] = useState(0);
  const [editing, setEditing] = useState(false);
  const pct = Math.round((adminUser.shipmentsUsed / adminUser.shipmentsTotal) * 100);
  return (
    <AdminShell>
      <div className="p-8 max-w-5xl mx-auto space-y-8">
        {/* Hero */}
        <div className="bg-white rounded-xl border border-[#506357]/5 overflow-hidden shadow-sm">
          <div className="h-24 bg-gradient-to-r from-[#00442d] to-[#0f5d41] relative"><div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff9eb 0,#fff9eb 1px,transparent 0,transparent 50%)", backgroundSize: "12px 12px" }} /></div>
          <div className="px-8 pb-8 relative">
            <div className="flex justify-between items-end -mt-10 mb-5">
              <div className="relative"><div className="w-20 h-20 rounded-xl border-4 border-white shadow-lg overflow-hidden"><img src={adminUser.avatar} alt="avatar" className="w-full h-full object-cover" /></div><div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-400 rounded-full border-2 border-white flex items-center justify-center"><span className="material-symbols-outlined text-white" style={{ fontSize: "12px", fontVariationSettings: "'FILL' 1" }}>check</span></div></div>
              <button onClick={() => setEditing(!editing)} className={`px-5 py-2 rounded-lg font-bold text-sm transition-all ${editing ? "bg-[#00442d] text-[#fff9eb]" : "border border-[#506357]/30 text-[#506357] hover:bg-[#f2ecd9]"}`}>{editing ? "Save Changes" : "Edit Profile"}</button>
            </div>
            <h2 className="text-2xl font-extrabold text-[#00442d]">{adminUser.name}</h2>
            <p className="text-[#506357] text-sm">{adminUser.role}</p>
            <div className="flex items-center gap-4 mt-3"><span className="text-xs bg-[#00442d]/10 text-[#00442d] px-3 py-1 rounded-full font-bold">{adminUser.plan} Plan</span><span className="text-xs text-[#506357]">{adminUser.email}</span></div>
          </div>
        </div>
        {/* Tabs */}
        <div className="flex gap-1 bg-[#f2ecd9] p-1 rounded-lg w-fit">
          {tabs.map((t, i) => <button key={t} onClick={() => setTab(i)} className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${tab === i ? "bg-[#00442d] text-[#fff9eb] shadow-sm" : "text-[#506357] hover:text-[#00442d]"}`}>{t}</button>)}
        </div>
        {/* Profile tab */}
        {tab === 0 && (
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-[#506357]/5 shadow-sm space-y-4">
              <h3 className="font-bold text-[#00442d]">Personal Information</h3>
              {[["Full Name", adminUser.name], ["Email", adminUser.email], ["Phone", adminUser.phone], ["Role", adminUser.role]].map(([l, v]) => (
                <div key={l}><label className="block text-xs font-bold text-[#506357] uppercase tracking-wider mb-1">{l}</label>
                  {editing ? <input defaultValue={v} className="w-full px-4 py-2.5 bg-[#f2ecd9] border-none rounded-lg text-sm focus:ring-2 ring-[#00442d]/20 outline-none text-[#00442d]" /> : <p className="text-sm font-medium text-[#00442d]">{v}</p>}
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <div className="bg-[#00442d] p-6 rounded-xl text-[#fff9eb]">
                <div className="flex justify-between items-start mb-4"><div><p className="text-[10px] font-bold uppercase tracking-widest text-emerald-200/70 mb-1">Plan</p><h3 className="text-2xl font-bold">{adminUser.plan}</h3><p className="text-emerald-100/70 text-xs mt-1">$299/month · Renews Dec 1, 2025</p></div><span className="text-xs bg-emerald-400/20 text-emerald-300 px-3 py-1 rounded-full font-bold">Active</span></div>
                <div className="space-y-2"><div className="flex justify-between text-xs mb-1"><span className="text-emerald-100/70">Shipments Used</span><span>{adminUser.shipmentsUsed} / {adminUser.shipmentsTotal}</span></div><div className="h-2 w-full bg-[#fff9eb]/10 rounded-full"><div className="h-full bg-emerald-400 rounded-full" style={{ width: `${pct}%` }} /></div></div>
                <button className="w-full mt-4 py-2.5 bg-[#fff9eb]/10 border border-[#fff9eb]/20 rounded-lg font-bold text-sm hover:bg-[#fff9eb]/20 transition-all">Manage Plan</button>
              </div>
              <div className="bg-white p-6 rounded-xl border border-[#506357]/5 shadow-sm"><h3 className="font-bold text-[#00442d] mb-4">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-3">{[["Total Shipped","1,284","local_shipping"],["Delivered","8,432","task_alt"],["Pending","23","pending_actions"],["Success Rate","97.2%","verified"]].map(([l,v,ic]) => (<div key={l} className="text-center p-3 bg-[#faf3df] rounded-lg"><span className="material-symbols-outlined text-[#00442d] block mb-1" style={{ fontSize: "18px" }}>{ic}</span><p className="text-lg font-extrabold text-[#00442d]">{v}</p><p className="text-[10px] text-[#506357] mt-0.5">{l}</p></div>))}</div>
              </div>
            </div>
          </div>
        )}
        {/* History tab */}
        {tab === 1 && (
          <div className="bg-white rounded-xl border border-[#506357]/5 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-[#506357]/5 flex justify-between items-center"><h3 className="font-bold text-[#00442d]">Shipment History</h3><div className="flex gap-2"><input type="text" placeholder="Search..." className="px-4 py-2 bg-[#f2ecd9] rounded-lg text-sm focus:ring-2 ring-[#00442d]/20 outline-none border-none w-40 placeholder:text-[#506357]/50 text-[#00442d]" /><button className="px-3 py-2 bg-[#f2ecd9] text-[#506357] rounded-lg text-sm flex items-center gap-1 hover:bg-[#e4dbc0]"><span className="material-symbols-outlined" style={{ fontSize: "16px" }}>filter_list</span>Filter</button></div></div>
            <table className="w-full text-left"><thead className="bg-[#f2ecd9]"><tr>{["Order ID","Destination","Status","ETA","Weight"].map(h => <th key={h} className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-[#506357]">{h}</th>)}</tr></thead>
              <tbody className="divide-y divide-[#506357]/5">{mockShipments.map(s => (<tr key={s.id} className="hover:bg-[#faf3df]/60 transition-colors"><td className="px-6 py-4 font-mono text-xs font-bold text-[#00442d]">{s.id}</td><td className="px-6 py-4 text-sm text-[#00442d]">{s.destination}</td><td className="px-6 py-4"><StatusBadge status={s.status} /></td><td className="px-6 py-4 text-sm text-[#00442d]">{s.eta}</td><td className="px-6 py-4 text-sm text-[#506357]">{s.weight||"—"}</td></tr>))}</tbody>
            </table>
          </div>
        )}
        {/* Notifications tab */}
        {tab === 2 && (
          <div className="bg-white p-8 rounded-xl border border-[#506357]/5 shadow-sm space-y-4">
            <h3 className="font-bold text-[#00442d]">Notification Preferences</h3>
            {[["Shipment Dispatched","When a shipment leaves the hub",true],["Status Updates","Real-time location changes",true],["Delivery Confirmation","When delivered",true],["Payment Reminders","Before payments are due",false],["System Alerts","Critical system notifications",true]].map(([l,s,on],i) => (
              <div key={i} className="flex justify-between items-center py-4 border-b border-[#506357]/5 last:border-0">
                <div><p className="text-sm font-bold text-[#00442d]">{String(l)}</p><p className="text-xs text-[#506357]">{String(s)}</p></div>
                <div className={`w-11 h-6 rounded-full cursor-pointer flex items-center px-1 transition-colors ${on ? "bg-[#00442d]" : "bg-[#f2ecd9]"}`}><div className={`w-4 h-4 rounded-full bg-white shadow transition-transform ${on ? "translate-x-5" : "translate-x-0"}`} /></div>
              </div>
            ))}
          </div>
        )}
        {/* Billing tab */}
        {tab === 3 && (
          <div className="space-y-5">
            <div className="bg-gradient-to-r from-[#00442d] to-[#0f5d41] text-[#fff9eb] p-8 rounded-xl relative overflow-hidden"><div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff9eb 0,#fff9eb 1px,transparent 0,transparent 50%)", backgroundSize: "12px 12px" }} /><div className="relative z-10 flex justify-between items-start"><div><p className="text-[10px] font-bold uppercase tracking-widest text-emerald-200/70 mb-2">Current Plan</p><h3 className="text-3xl font-extrabold">{adminUser.plan}</h3><p className="text-[#fff9eb]/70 text-sm mt-1">$299/month · Renews Dec 1, 2025</p></div><button className="px-5 py-2 bg-[#fff9eb]/10 border border-[#fff9eb]/20 rounded-lg font-bold text-sm hover:bg-[#fff9eb]/20 transition-all">Manage Plan</button></div></div>
            <div className="bg-white rounded-xl border border-[#506357]/5 shadow-sm overflow-hidden"><div className="p-6 border-b border-[#506357]/5"><h3 className="font-bold text-[#00442d]">Billing History</h3></div>
              <table className="w-full text-left"><thead className="bg-[#f2ecd9]"><tr>{["Date","Description","Amount","Status"].map(h => <th key={h} className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-[#506357]">{h}</th>)}</tr></thead>
                <tbody className="divide-y divide-[#506357]/5">{[["Nov 1, 2025","Enterprise Plan – Monthly","$299.00"],["Oct 1, 2025","Enterprise Plan – Monthly","$299.00"],["Sep 1, 2025","Enterprise Plan – Monthly","$299.00"]].map(([d,desc,a]) => (<tr key={d} className="hover:bg-[#faf3df]/60"><td className="px-6 py-4 text-sm text-[#506357]">{d}</td><td className="px-6 py-4 text-sm font-medium text-[#00442d]">{desc}</td><td className="px-6 py-4 text-sm font-bold text-[#00442d]">{a}</td><td className="px-6 py-4"><span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-bold">Paid</span></td></tr>))}</tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
