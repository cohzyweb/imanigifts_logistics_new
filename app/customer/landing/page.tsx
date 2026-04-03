import CustomerNav from "@/components/customer/CustomerNav";
import CustomerFooter from "@/components/customer/CustomerFooter";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CustomerLanding() {
  return (
    <div className="bg-[#fff9eb] text-[#1f1c08]">
      <CustomerNav />
      <main className="pt-24">
        {/* Hero */}
        <section className="relative min-h-[85vh] flex items-center px-8 md:px-12 overflow-hidden">
          <div className="absolute right-0 top-0 w-1/2 h-full opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg,#00442d 0,#00442d 1px,transparent 0,transparent 50%)", backgroundSize: "20px 20px" }} />
          <div className="relative z-10 max-w-4xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#506357] mb-6 block">Premium Logistics Platform</span>
            <h1 className="text-[3.5rem] md:text-[3rem] leading-[1.05] font-bold text-[#00442d] mb-8 tracking-tighter">Reliable Logistics<br /><span className="italic font-light">& Supply Chain Solutions.</span></h1>
            <p className="text-xl text-[#506357] max-w-2xl mb-12 leading-relaxed">Elevating logistics into a premium experience. Bespoke delivery solutions for the modern enterprise, anchored in sustainability and precision.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/customer/signup" className="text-white px-8 py-4 rounded-lg font-bold text-lg shadow-xl active:scale-95 transition-all inline-flex items-center gap-2 sig-gradient">Get Started <span className="material-symbols-outlined">arrow_forward</span></Link>
              <Link href="/customer/track" className="bg-[#ebe3c2] text-[#00442d] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#e4dbc0] transition-colors">Track Shipment</Link>
            </div>
            <div className="flex gap-12 mt-16">{[["99.8%","Precision Rate"],["150+","Global Routes"],["24/7","Expert Support"]].map(([v,l]) => (<div key={l}><p className="text-3xl font-bold text-[#00442d]">{v}</p><p className="text-xs uppercase tracking-widest text-[#506357] mt-1">{l}</p></div>))}</div>
          </div>
        </section>
        {/* Services */}
        <section className="py-28 px-8 md:px-12 bg-[#fff9eb]">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16"><h2 className="text-3xl font-semibold text-[#00442d] mb-4">Elite Modalities</h2><div className="w-24 h-1 bg-[#00442d]" /></div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-8 bg-[#00442d] rounded-xl p-10 relative overflow-hidden min-h-[280px] flex flex-col justify-end">
                <span className="material-symbols-outlined text-white/10 absolute top-6 right-6 text-[100px]">flight</span>
                <div className="relative z-10"><span className="text-[#8cd4b0] text-xs font-bold uppercase tracking-widest mb-2 block">Service 01</span><h3 className="text-white text-4xl font-bold mb-3">Freight Forwarding</h3><p className="text-emerald-100/75 max-w-md text-sm">International and domestic freight solutions you can rely on.</p></div>
              </div>
              <div className="md:col-span-4 bg-[#1f1c08] rounded-xl p-8 relative overflow-hidden min-h-[200px] flex flex-col justify-end">
                <span className="material-symbols-outlined text-white/10 absolute top-4 right-4 text-[80px]">directions_boat</span>
                <div className="relative z-10"><span className="text-[#ffdad7] text-xs font-bold uppercase tracking-widest mb-2 block">Service 02</span><h3 className="text-white text-3xl font-bold mb-2">Transportation Management</h3><p className="text-white/60 text-sm">Optimized transport solutions with real-time visibility.</p></div>
              </div>
              <div className="md:col-span-12 bg-[#ebe3c2] rounded-xl p-10 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1"><span className="text-[#00442d] text-xs font-bold uppercase tracking-widest mb-2 block">Service 03</span><h3 className="text-[#00442d] text-4xl font-bold mb-3">Warehousing & Distribution</h3><p className="text-[#506357] leading-relaxed mb-6 max-w-xl">Secure storage and efficient distribution services.</p><Link href="/customer/orders" className="text-[#00442d] font-bold inline-flex items-center gap-2 hover:gap-3 transition-all">Book Now <span className="material-symbols-outlined">arrow_forward</span></Link></div>
                <span className="material-symbols-outlined text-[#00442d] opacity-15 text-[140px]">local_shipping</span>
              </div>
            </div>
          </div>
        </section>
        {/* Features */}
        <section className="py-28 px-8 md:px-12 bg-[#fdf4d3]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="aspect-square bg-[#ebe3c2] rounded-xl flex items-center justify-center"><span className="material-symbols-outlined text-[#00442d] opacity-10 text-[200px]">eco</span></div>
              <div className="absolute -bottom-8 -right-8 bg-[#00442d] p-8 rounded-xl shadow-xl text-white"><div className="text-4xl font-bold">99.8%</div><div className="text-emerald-200/70 text-xs uppercase tracking-widest mt-1">Precision Rate</div></div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-[#00442d] mb-10">Why Businesses Choose Imani Gift Logistics.</h2>
              <div className="space-y-10">{[{icon:"eco",title:"Cost-Effective Shipping",desc:"Imanigifts Logistics provides affordable, reliable delivery with transparent pricing helping your business save more on every shipment, and targeting net-zero by 2030."},{icon:"monitoring",title:" Real-Time Tracking",desc:"Imanigifts Logistics offers real-time tracking, giving you full visibility of your shipments every step of the way for peace of mind and better planning."},{icon:"verified_user",title:"Certified & Experienced Team",desc:"Imanigifts Logistics is powered by a certified, experienced team dedicated to handling your shipments with professionalism, care, and efficiency."}].map(f => (<div key={f.title} className="flex gap-5"><div className="bg-[#0f5d41] text-[#8cd4b0] w-12 h-12 rounded-lg flex items-center justify-center shrink-0"><span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 24" }}>{f.icon}</span></div><div><h4 className="text-lg font-semibold text-[#00442d] mb-1">{f.title}</h4><p className="text-[#506357] text-sm leading-relaxed">{f.desc}</p></div></div>))}</div>
            </div>
          </div>
        </section>
        {/* CTA */}
        <section className="py-28 px-8 md:px-12 bg-[#00442d] text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Ready to elevate your business ?</h2>
            <p className="text-emerald-100/70 text-lg mb-12 max-w-xl mx-auto">Join the new standard of logistics. Experience speed, security, and sustainability.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/customer/signup" className="bg-[#fff9eb] text-[#00442d] px-10 py-4 rounded-lg font-bold text-lg hover:bg-[#fdf4d3] transition-colors shadow-lg active:scale-95">Create Account</Link>
              <button className="border-2 border-[#8cd4b0] text-[#8cd4b0] px-10 py-4 rounded-lg font-bold text-lg hover:bg-white/5 transition-colors">Speak to an Expert</button>
            </div>
          </div>
        </section>
      </main>
      <CustomerFooter />
    </div>
  );
}
