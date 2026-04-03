"use client";
import { useState } from "react";
import Link from "next/link";
export default function CustomerSignup() {
  const [type, setType] = useState<"individual"|"business">("individual");
  const [showPw, setShowPw] = useState(false);
  return (
    <main className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      <section className="hidden md:flex md:w-5/12 bg-[#00442d] relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff9eb 0,#fff9eb 1px,transparent 0,transparent 50%)", backgroundSize: "12px 12px" }} />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#0f5d41] rounded-full blur-3xl opacity-30" />
        <div className="relative z-10 max-w-md">
          <div className="w-12 h-12 bg-[#fff9eb] rounded-xl flex items-center justify-center mb-12"><span className="material-symbols-outlined text-[#00442d] text-2xl">card_giftcard</span></div>
          <h1 className="text-5xl font-bold text-white leading-tight mb-6 tracking-tight">Join the <span className="text-[#8cd4b0]">Modern Fleet.</span></h1>
          <p className="text-emerald-100/80 text-base leading-relaxed mb-12">Premium editorial tracking and bespoke shipping for businesses that value precision.</p>
          <div className="space-y-8">{[{icon:"auto_awesome",title:"Artisanal Precision",sub:"Every shipment treated with editorial care."},{icon:"shield_with_heart",title:"Bespoke Insurance",sub:"Premium coverage for your most valuable assets."}].map(f => (<div key={f.title} className="flex items-start gap-4"><div className="p-3 bg-[#0f5d41] rounded-lg"><span className="material-symbols-outlined text-[#8cd4b0]">{f.icon}</span></div><div><h3 className="font-semibold text-white">{f.title}</h3><p className="text-emerald-100/60 text-sm">{f.sub}</p></div></div>))}</div>
        </div>
      </section>
      <section className="flex-1 flex flex-col items-center justify-center p-6 md:p-16 bg-[#fff9eb] overflow-y-auto">
        <div className="w-full max-w-lg py-8">
          <div className="md:hidden mb-8 flex items-center gap-3"><div className="w-9 h-9 bg-[#00442d] rounded-lg flex items-center justify-center"><span className="material-symbols-outlined text-[#fff9eb]" style={{fontSize:"18px"}}>card_giftcard</span></div><span className="text-xl font-bold text-[#00442d]">Imanigifts</span></div>
          <h2 className="text-3xl font-bold text-[#00442d] mb-1">Create Account</h2>
          <p className="text-[#506357] mb-8">Register for the Imanigifts logistics portal.</p>
          <div className="flex p-1 bg-[#f1e8c8] rounded-xl mb-8">{(["individual","business"] as const).map(t => <button key={t} onClick={() => setType(t)} className={`flex-1 py-3 text-center rounded-lg font-semibold transition-all text-sm ${type===t?"bg-white text-[#00442d] shadow-sm":"text-[#506357] hover:text-[#00442d]"}`}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>)}</div>
          <div className="space-y-5">
            {[{label:"Full Name",icon:"person",type:"text",placeholder:"Johnathan Doe"},{label:"Email Address",icon:"mail",type:"email",placeholder:"john@example.com"},...(type==="business"?[{label:"Company Name",icon:"domain",type:"text",placeholder:"Imanigifts Ltd."}]:[])].map(f => (
              <div key={f.label}><label className="block text-xs font-bold text-[#506357] uppercase tracking-wider mb-1.5">{f.label}</label><div className="relative"><span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#506357]/50 text-xl">{f.icon}</span><input type={f.type} placeholder={f.placeholder} className="w-full pl-12 pr-4 py-4 bg-[#ebe3c2] rounded-lg border-0 text-[#1f1c08] placeholder:text-[#506357]/40 focus:bg-[#fff9eb] focus:ring-2 ring-[#00442d]/10 outline-none transition-all" /></div></div>
            ))}
            <div><label className="block text-xs font-bold text-[#506357] uppercase tracking-wider mb-1.5">Password</label><div className="relative"><span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#506357]/50 text-xl">lock</span><input type={showPw?"text":"password"} placeholder="••••••••••••" className="w-full pl-12 pr-12 py-4 bg-[#ebe3c2] rounded-lg border-0 text-[#1f1c08] placeholder:text-[#506357]/40 focus:bg-[#fff9eb] focus:ring-2 ring-[#00442d]/10 outline-none transition-all" /><button onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#506357]/40 hover:text-[#00442d] transition-colors"><span className="material-symbols-outlined text-xl">{showPw?"visibility_off":"visibility"}</span></button></div></div>
            <label className="flex items-start gap-3 cursor-pointer py-2"><input type="checkbox" className="mt-1 h-4 w-4 rounded accent-[#00442d]" /><span className="text-sm text-[#506357] leading-snug">I agree to the <a href="#" className="text-[#00442d] font-semibold hover:underline">Terms of Service</a> and <a href="#" className="text-[#00442d] font-semibold hover:underline">Privacy Policy</a>.</span></label>
            <Link href="/customer/dashboard" className="w-full py-5 text-white font-bold rounded-lg shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 group sig-gradient">Create Account <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span></Link>
            <div className="relative py-3"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#bfc9c1]" /></div><div className="relative flex justify-center text-xs uppercase"><span className="bg-[#fff9eb] px-4 text-[#506357] font-semibold tracking-wider">Or continue with</span></div></div>
            <button className="w-full py-4 bg-white border border-[#bfc9c1] text-[#3f4943] font-semibold rounded-lg flex items-center justify-center gap-3 hover:bg-[#fdf4d3] active:scale-95 transition-all shadow-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Sign up with Google
            </button>
            <p className="text-center text-[#506357] text-sm">Already have an account? <Link href="/customer/login" className="text-[#00442d] font-bold hover:underline">Login</Link></p>
          </div>
        </div>
      </section>
    </main>
  );
}
