"use client";
import { useState } from "react";
import CustomerShell from "@/components/customer/CustomerShell";
import StatusBadge from "@/components/shared/StatusBadge";
import { mockShipments } from "@/lib/data";

const steps = [
  { label: "Shipment Picked Up", sub: "San Francisco Hub • 08:42 AM", icon: "check_circle", status: "completed" as const },
  { label: "In Transit to Regional Center", sub: "Oakland, CA • Current Location", icon: "local_shipping", status: "active" as const, detail: { label: "Estimated Arrival", value: "Today, 4:30 PM" } },
  { label: "Out for Delivery", sub: "Local Courier Assigned", icon: "inventory_2", status: "upcoming" as const },
  { label: "Delivered", sub: "Final Destination: Los Angeles, CA", icon: "home", status: "upcoming" as const },
];

export default function CustomerTrack() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  return (
    <CustomerShell>
      <div className="p-8 space-y-8 max-w-6xl">
        <section className="relative rounded-xl overflow-hidden bg-[#00442d] p-10 text-[#fff9eb]">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff9eb 0,#fff9eb 1px,transparent 0,transparent 50%)", backgroundSize: "12px 12px" }} />
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tighter mb-2">Track Your Shipment</h2>
            <p className="text-[#fff9eb]/70 mb-6">Enter your tracking ID to see real-time location and delivery trajectory.</p>
            <div className="flex gap-2 p-2 bg-[#fff9eb]/10 rounded-lg border border-[#fff9eb]/20 focus-within:ring-2 ring-[#fff9eb]/30">
              <div className="flex-1 flex items-center px-3 gap-2"><span className="material-symbols-outlined text-[#fff9eb]">search</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="KF-7729-BM-9001" className="bg-transparent border-none text-[#fff9eb] placeholder:text-[#fff9eb]/40 w-full focus:ring-0 outline-none font-bold" onKeyDown={e => e.key === "Enter" && setSearched(true)} /></div>
              <button onClick={() => setSearched(true)} className="bg-[#fff9eb] text-[#00442d] px-6 py-3 rounded-md font-bold text-sm hover:brightness-95 transition-all active:scale-95">Locate</button>
            </div>
          </div>
        </section>
        {searched && (
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-5">
              <div className="bg-[#faf3df] p-8 rounded-xl border border-[#506357]/5">
                <div className="flex justify-between items-start mb-8"><div><span className="text-xs font-bold uppercase tracking-widest text-[#506357]">Active Transit</span><h3 className="text-2xl font-bold mt-1 text-[#00442d]">KF-7729-BM-9001</h3></div><span className="bg-[#00442d] text-[#fff9eb] px-3 py-1 rounded-full text-xs font-bold">In Transit</span></div>
                <div className="relative"><div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-[#506357]/20" />
                  {steps.map((step, i) => (<div key={i} className="relative pl-11 pb-8 last:pb-0"><div className={`absolute left-0 top-1 w-7 h-7 rounded-full flex items-center justify-center z-10 ${step.status==="completed"?"bg-[#00442d] text-[#fff9eb]":step.status==="active"?"bg-[#00442d] text-[#fff9eb] ring-4 ring-[#00442d]/15":"bg-[#f2ecd9] border-2 border-[#506357]/20 text-[#506357]"}`}><span className="material-symbols-outlined" style={{ fontSize: "14px", fontVariationSettings: "'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 24" }}>{step.icon}</span></div><h4 className={`font-bold text-sm ${step.status==="upcoming"?"text-[#506357] opacity-60":"text-[#00442d]"}`}>{step.label}</h4><p className={`text-xs text-[#506357] ${step.status==="upcoming"?"opacity-60":""}`}>{step.sub}</p>{step.detail && <div className="mt-3 p-3 bg-[#e4dbc0] rounded-lg border-l-4 border-[#00442d]"><p className="text-[10px] text-[#00442d] font-bold uppercase mb-0.5">{step.detail.label}</p><p className="text-lg font-extrabold text-[#00442d]">{step.detail.value}</p></div>}</div>))}
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-7 space-y-4">
              <div className="bg-[#f2ecd9] rounded-xl h-72 relative border border-[#506357]/5 flex items-center justify-center"><div className="text-center"><div className="w-16 h-16 bg-[#00442d] rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg"><span className="material-symbols-outlined text-[#fff9eb] text-3xl">location_on</span></div><p className="text-[#00442d] font-bold text-sm">Live tracking active</p><p className="text-[#506357] text-xs mt-1">Oakland, CA — Moving South on I-5</p></div>
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#fff9eb]/90 backdrop-blur-md rounded-lg border border-[#00442d]/10 flex items-center justify-between shadow-md"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-[#00442d] rounded flex items-center justify-center text-[#fff9eb]"><span className="material-symbols-outlined" style={{ fontSize: "18px" }}>electric_car</span></div><div><p className="text-[10px] font-bold text-[#506357] uppercase">Live Vehicle #TX-902</p><p className="text-sm font-bold text-[#00442d]">Moving South on I-5</p></div></div><div className="text-right"><p className="text-[10px] text-[#506357]">Speed</p><p className="text-sm font-bold text-[#00442d]">62 mph</p></div></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#faf3df] p-5 rounded-xl border border-[#506357]/5"><div className="flex items-center gap-2 mb-3"><span className="material-symbols-outlined text-[#00442d]" style={{ fontSize: "18px" }}>package_2</span><span className="text-[10px] font-bold uppercase tracking-widest text-[#506357]">Package Specs</span></div>{[["Weight","42.5 kg"],["Dimensions","120×80×60 cm"],["Service","Imanigifts Express"]].map(([k,v]) => <div key={k} className="flex justify-between py-1"><span className="text-xs text-[#506357]">{k}</span><span className="text-xs font-bold text-[#00442d]">{v}</span></div>)}</div>
                <div className="bg-[#faf3df] p-5 rounded-xl border border-[#506357]/5 flex flex-col"><div className="flex items-center gap-2 mb-3"><span className="material-symbols-outlined text-[#00442d]" style={{ fontSize: "18px" }}>support_agent</span><span className="text-[10px] font-bold uppercase tracking-widest text-[#506357]">Support</span></div><p className="text-xs text-[#506357] leading-relaxed mb-4 flex-1">Dispatcher available for specialized handling requests.</p><button className="w-full py-2 bg-[#fff9eb] text-[#00442d] text-xs font-bold rounded border border-[#506357]/20 hover:bg-[#f2ecd9] transition-all">Contact Dispatch</button></div>
              </div>
            </div>
          </div>
        )}
        <div>
          <h3 className="text-lg font-bold text-[#00442d] mb-4">My Shipments</h3>
          <div className="bg-white rounded-xl overflow-hidden border border-[#506357]/5"><table className="w-full text-left"><thead className="bg-[#f2ecd9]"><tr>{["Shipment ID","Destination","Status","ETA"].map((h,i) => <th key={h} className={`px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-[#506357] ${i===3?"text-right":""}`}>{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-[#506357]/5">{mockShipments.map(s => (<tr key={s.id} className="hover:bg-[#faf3df]/60 cursor-pointer transition-colors" onClick={() => { setQuery(s.id); setSearched(true); }}><td className="px-6 py-4 font-bold text-[#00442d] text-sm">{s.id}</td><td className="px-6 py-4 text-sm text-[#506357]">{s.destination}</td><td className="px-6 py-4"><StatusBadge status={s.status} /></td><td className="px-6 py-4 text-right font-bold text-sm text-[#00442d]">{s.eta}</td></tr>))}</tbody>
          </table></div>
        </div>
      </div>
    </CustomerShell>
  );
}
