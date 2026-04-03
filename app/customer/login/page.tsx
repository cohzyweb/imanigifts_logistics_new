"use client";
import { useState } from "react";
import Link from "next/link";

export default function CustomerLogin() {
  const [tab, setTab] = useState<"client"|"admin">("client");
  const [showPw, setShowPw] = useState(false);
  const dest = tab === "admin" ? "/admin/dashboard" : "/customer/dashboard";
  return (
    <main className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      <section className="hidden md:flex md:w-1/2 lg:w-3/5 relative items-center justify-center bg-[#00442d]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.2)_100%)]" />
        <div className="relative z-10 p-12 lg:p-20 max-w-xl">
          <div className="w-12 h-12 bg-[#fff9eb] rounded-xl flex items-center justify-center mb-12"><span className="material-symbols-outlined text-[#00442d] text-2xl">card_giftcard</span></div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-8 tracking-tight">Premium <span className="text-[#8cd4b0]">Global</span> Fulfillment.</h1>
          <p className="text-[#8cd4b0] text-lg leading-relaxed font-light">Experience the next generation of logistics. Secure, transparent, and tailored for the modern enterprise.</p>
          <div className="mt-16 flex gap-12">{[["99.9%","Reliability Rate"],["24/7","Expert Support"]].map(([v,l]) => (<div key={l}><span className="text-3xl font-bold text-white">{v}</span><p className="text-[#8cd4b0] text-xs uppercase tracking-widest mt-1">{l}</p></div>))}</div>
        </div>
      </section>
      <section className="w-full md:w-1/2 lg:w-2/5 flex items-center justify-center p-6 md:p-12 lg:p-20 bg-[#fff9eb]">
        <div className="w-full max-w-md">
          <div className="md:hidden mb-10 flex items-center gap-3"><div className="w-9 h-9 bg-[#00442d] rounded-lg flex items-center justify-center"><span className="material-symbols-outlined text-[#fff9eb]" style={{fontSize:"18px"}}>card_giftcard</span></div><span className="text-xl font-bold text-[#00442d]">Imanigifts</span></div>
          <div className="mb-8 text-center md:text-left"><h2 className="text-3xl font-bold text-[#00442d] mb-2">Welcome Back</h2><p className="text-[#506357]">Please enter your credentials to access the portal.</p></div>
          <div className="bg-[#f1e8c8] p-1 rounded-xl mb-8 flex">
            {(["client","admin"] as const).map(t => <button key={t} onClick={() => setTab(t)} className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-all ${tab===t?"bg-[#fff9eb] text-[#00442d] shadow-sm":"text-[#506357] hover:text-[#00442d]"}`}>{t==="client"?"Client Login":"Admin Access"}</button>)}
          </div>
          <div className="space-y-5">
            <div><label className="block text-sm font-medium text-[#506357] mb-1.5">Work Email</label><div className="relative"><span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#707973] text-lg">mail</span><input type="email" placeholder="name@company.com" className="w-full pl-12 pr-4 py-4 bg-[#ebe3c2] border-0 rounded-lg text-[#1f1c08] placeholder:text-[#707973]/50 focus:ring-2 ring-[#00442d]/10 outline-none transition-all" /></div></div>
            <div><div className="flex justify-between mb-1.5"><label className="block text-sm font-medium text-[#506357]">Password</label><a href="#" className="text-xs font-semibold text-[#00442d] hover:underline">Forgot password?</a></div><div className="relative"><span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#707973] text-lg">lock</span><input type={showPw?"text":"password"} placeholder="••••••••" className="w-full pl-12 pr-12 py-4 bg-[#ebe3c2] border-0 rounded-lg text-[#1f1c08] placeholder:text-[#707973]/50 focus:ring-2 ring-[#00442d]/10 outline-none transition-all" /><button onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#707973] hover:text-[#00442d] transition-colors"><span className="material-symbols-outlined text-lg">{showPw?"visibility_off":"visibility"}</span></button></div></div>
            <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" className="w-4 h-4 rounded accent-[#00442d]" /><span className="text-sm text-[#506357]">Stay signed in for 30 days</span></label>
            <Link href={dest} className="w-full py-4 rounded-lg font-bold text-lg text-white text-center block active:scale-[0.98] transition-all shadow-lg sig-gradient">Sign In to Portal</Link>
            <div className="relative my-4"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#bfc9c1]/50" /></div><div className="relative flex justify-center text-sm"><span className="bg-[#fff9eb] px-4 text-[#707973]">OR</span></div></div>
            <button className="w-full flex items-center justify-center gap-3 bg-white border border-[#bfc9c1]/40 text-[#3f4943] py-4 rounded-lg font-semibold hover:bg-[#fdf4d3] transition-all active:scale-[0.98] shadow-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Continue with Google
            </button>
          </div>
          <div className="mt-8 pt-6 border-t border-[#bfc9c1]/20 text-center"><p className="text-[#506357] text-sm">New to Imanigifts? <Link href="/customer/signup" className="text-[#00442d] font-bold hover:underline ml-1">Create an account</Link></p></div>
        </div>
      </section>
    </main>
  );
}
