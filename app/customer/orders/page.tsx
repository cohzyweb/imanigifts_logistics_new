"use client";
import { useState } from "react";
import CustomerShell from "@/components/customer/CustomerShell";
import Link from "next/link";

const steps = ["Origin & Destination", "Package Details", "Service & Payment"];
type Carrier = "air" | "sea" | "road";
type Service = "express" | "standard" | "economy";

export default function CustomerOrders() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [carrier, setCarrier] = useState<Carrier>("road");
  const [service, setService] = useState<Service>("standard");
  const [insurance, setInsurance] = useState(false);
  const tid = `KF-${Math.random().toString(36).slice(2,8).toUpperCase()}`;
  const inp = "w-full px-4 py-3 bg-[#f2ecd9] border-none rounded-lg text-sm focus:ring-2 ring-[#00442d]/20 outline-none placeholder:text-[#506357]/50 text-[#00442d]";
  const lbl = "block text-xs font-bold text-[#506357] uppercase tracking-wider mb-1.5";

  if (done) return (
    <CustomerShell>
      <div className="p-8 flex items-center justify-center min-h-[70vh]">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-[#00442d] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"><span className="material-symbols-outlined text-[#fff9eb] text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span></div>
          <h2 className="text-3xl font-extrabold text-[#00442d] mb-3">Shipment Booked!</h2>
          <p className="text-[#506357] mb-2">Your tracking ID</p>
          <p className="text-2xl font-bold text-[#00442d] bg-[#f2ecd9] rounded-xl px-6 py-3 inline-block mb-8">{tid}</p>
          <div className="flex gap-3 justify-center"><Link href="/customer/track" className="px-6 py-3 bg-[#00442d] text-[#fff9eb] rounded-lg font-bold text-sm hover:opacity-90">Track Shipment</Link><button onClick={() => { setDone(false); setStep(0); }} className="px-6 py-3 border border-[#506357]/30 text-[#506357] rounded-lg font-bold text-sm hover:bg-[#f2ecd9]">New Shipment</button></div>
        </div>
      </div>
    </CustomerShell>
  );

  return (
    <CustomerShell>
      <div className="p-8 max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-end"><div><h2 className="text-3xl font-extrabold tracking-tight text-[#00442d]">New Shipment</h2><p className="text-[#506357] text-sm mt-1">Create a new transit route and finalise manifest details.</p></div><Link href="/customer/dashboard" className="px-5 py-2 rounded-lg text-sm text-[#506357] border border-[#506357]/30 hover:bg-[#f2ecd9] transition-all font-medium">Cancel</Link></div>
        {/* Stepper */}
        <div className="relative flex justify-between items-center px-4">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[#506357]/15 -translate-y-1/2 z-0" />
          <div className="absolute top-1/2 left-0 h-0.5 bg-[#00442d] -translate-y-1/2 z-0 transition-all duration-500" style={{ width: `${(step / (steps.length - 1)) * 100}%` }} />
          {steps.map((s, i) => (<div key={i} className="relative z-10 flex flex-col items-center gap-1.5"><div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all ${i<step?"bg-[#00442d] text-[#fff9eb]":i===step?"bg-[#00442d] text-[#fff9eb] ring-4 ring-[#00442d]/20":"bg-[#f2ecd9] text-[#506357] border-2 border-[#506357]/20"}`}>{i<step?<span className="material-symbols-outlined" style={{ fontSize: "16px", fontVariationSettings: "'FILL' 1" }}>check</span>:i+1}</div><span className={`text-xs font-bold whitespace-nowrap hidden sm:block ${i===step?"text-[#00442d]":"text-[#506357]/60"}`}>{s}</span></div>))}
        </div>
        {/* Form */}
        <div className="bg-white rounded-xl border border-[#506357]/5 shadow-sm p-8">
          {step === 0 && (<div className="grid grid-cols-2 gap-8">{[{title:"Pickup Location",icon:"person_pin"},{title:"Delivery Destination",icon:"location_on"}].map(sec => (<div key={sec.title} className="space-y-4"><div className="flex items-center gap-3 mb-5"><div className="w-9 h-9 bg-[#f2ecd9] rounded-lg flex items-center justify-center text-[#00442d]"><span className="material-symbols-outlined" style={{ fontSize: "18px" }}>{sec.icon}</span></div><h3 className="font-bold text-[#00442d]">{sec.title}</h3></div><div><label className={lbl}>Street Address</label><input className={inp} placeholder="123 Main St" /></div><div className="grid grid-cols-2 gap-3"><div><label className={lbl}>City</label><input className={inp} placeholder="City" /></div><div><label className={lbl}>Country</label><input className={inp} placeholder="Country" /></div></div><div><label className={lbl}>Full Name</label><input className={inp} placeholder="Recipient name" /></div></div>))}</div>)}
          {step === 1 && (<div className="space-y-6"><div><label className={lbl}>Package Description</label><input className={inp} placeholder="e.g. Gift Hamper – Corporate Premium" /></div><div className="grid grid-cols-3 gap-4"><div><label className={lbl}>Weight (kg)</label><input type="number" className={inp} placeholder="0.0" /></div><div><label className={lbl}>Length (cm)</label><input type="number" className={inp} placeholder="0" /></div><div><label className={lbl}>Width × Height</label><input className={inp} placeholder="40 × 30" /></div></div><div className="p-4 bg-[#00442d]/5 rounded-xl border border-[#00442d]/10 flex items-start gap-3"><span className="material-symbols-outlined text-[#00442d]" style={{ fontSize: "18px" }}>verified_user</span><p className="text-xs font-medium text-[#00442d] leading-relaxed">Your shipment is protected with Imanigifts Secure Cargo Insurance up to $50,000.</p></div></div>)}
          {step === 2 && (<div className="space-y-7"><div><h3 className="font-bold text-[#00442d] mb-4">Carrier Type</h3><div className="grid grid-cols-3 gap-3">{(["air","sea","road"] as Carrier[]).map(c => <button key={c} onClick={() => setCarrier(c)} className={`p-4 rounded-xl border-2 text-center transition-all ${carrier===c?"border-[#00442d] bg-[#00442d]/5":"border-[#506357]/15 hover:border-[#506357]/40"}`}><span className="material-symbols-outlined text-[#00442d] block mb-1.5">{c==="air"?"flight":c==="sea"?"directions_boat":"local_shipping"}</span><p className="text-sm font-bold text-[#00442d] capitalize">{c}</p></button>)}</div></div><div><h3 className="font-bold text-[#00442d] mb-4">Service Level</h3><div className="grid grid-cols-3 gap-3">{(["express","standard","economy"] as Service[]).map(s => <button key={s} onClick={() => setService(s)} className={`p-4 rounded-xl border-2 text-left transition-all ${service===s?"border-[#00442d] bg-[#00442d]/5":"border-[#506357]/15 hover:border-[#506357]/40"}`}><p className="text-sm font-bold text-[#00442d] capitalize">{s}</p><p className="text-[10px] text-[#506357]">{s==="express"?"1–2 days":s==="standard"?"3–5 days":"7–14 days"}</p><p className="text-base font-extrabold text-[#00442d] mt-2">{s==="express"?"$89":s==="standard"?"$45":"$22"}</p></button>)}</div></div><label className="flex items-center gap-4 p-4 bg-[#f2ecd9] rounded-xl cursor-pointer hover:bg-[#e4dbc0] transition-all"><input type="checkbox" checked={insurance} onChange={e => setInsurance(e.target.checked)} className="w-4 h-4 accent-[#00442d]" /><div><p className="text-sm font-bold text-[#00442d]">Shipment Insurance</p><p className="text-xs text-[#506357]">Coverage up to $10,000</p></div></label><div className="border-t border-[#506357]/10 pt-5 space-y-2">{[["Carrier",carrier.charAt(0).toUpperCase()+carrier.slice(1)],["Service",service.charAt(0).toUpperCase()+service.slice(1)],["Insurance",insurance?"Included":"Not selected"],["Estimated Total","$45.00"]].map(([k,v],i) => <div key={k} className={`flex justify-between ${i===3?"font-extrabold text-[#00442d] text-lg mt-3 pt-3 border-t border-[#506357]/10":"text-sm"}`}><span className={i===3?"":"text-[#506357]"}>{k}</span><span className="font-bold text-[#00442d]">{v}</span></div>)}</div></div>)}
        </div>
        <div className="flex justify-between"><button onClick={() => setStep(s => Math.max(0,s-1))} disabled={step===0} className={`px-6 py-3 rounded-lg font-bold text-sm border border-[#506357]/30 text-[#506357] hover:bg-[#f2ecd9] transition-all ${step===0?"opacity-30 cursor-not-allowed":""}`}>← Back</button>{step<steps.length-1?<button onClick={() => setStep(s => s+1)} className="px-8 py-3 bg-[#00442d] text-[#fff9eb] rounded-lg font-bold text-sm hover:opacity-90 transition-all">Continue →</button>:<button onClick={() => setDone(true)} className="px-8 py-3 bg-[#00442d] text-[#fff9eb] rounded-lg font-bold text-sm hover:opacity-90 transition-all shadow-lg">Confirm & Pay ✓</button>}</div>
      </div>
    </CustomerShell>
  );
}
