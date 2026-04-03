"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { customerUser } from "@/lib/data";

const nav = [
  { label: "Dashboard", icon: "dashboard",      href: "/customer/dashboard" },
  { label: "Orders",    icon: "local_shipping", href: "/customer/orders" },
  { label: "Tracking",  icon: "location_on",    href: "/customer/track" },
  { label: "Profile",   icon: "person",          href: "/customer/profile" },
];

export default function CustomerShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  return (
    <div className="min-h-screen bg-[#fff9eb]">
      <aside className="flex flex-col h-screen w-64 fixed left-0 top-0 z-50 bg-[#fff9eb] border-r border-[#506357]/10">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-[#00442d] rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-[#fff9eb]" style={{fontSize:"20px"}}>card_giftcard</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#00442d] leading-none" style={{fontFamily:"Manrope,sans-serif"}}>Imanigifts</h1>
              <p className="text-[10px] uppercase tracking-widest text-[#506357] font-bold">Customer Portal</p>
            </div>
          </div>
          <nav className="space-y-1">
            {nav.map(item => {
              const active = path === item.href;
              return (
                <Link key={item.href} href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${active ? "bg-[#00442d] text-[#fff9eb]" : "text-[#506357] hover:bg-[#506357]/5"}`}>
                  <span className="material-symbols-outlined" style={{fontSize:"20px"}}>{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="mt-auto p-6 space-y-4">
          <div className="border-t border-[#506357]/10 pt-3 space-y-1">
            <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-[#506357] hover:bg-[#506357]/5 rounded-lg">
              <span className="material-symbols-outlined" style={{fontSize:"18px"}}>help</span>Support
            </a>
            <Link href="/customer/login" className="flex items-center gap-3 px-4 py-2 text-sm text-[#506357] hover:bg-[#506357]/5 rounded-lg">
              <span className="material-symbols-outlined" style={{fontSize:"18px"}}>logout</span>Logout
            </Link>
          </div>
          <Link href="/customer/orders"
            className="w-full bg-[#00442d] text-[#fff9eb] py-3 px-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all text-sm">
            <span className="material-symbols-outlined" style={{fontSize:"18px"}}>add</span>New Shipment
          </Link>
        </div>
      </aside>
      <header className="flex justify-between items-center h-16 px-8 ml-64 fixed top-0 right-0 w-[calc(100%-16rem)] z-40 bg-[#fff9eb]/80 backdrop-blur-md shadow-sm">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#506357] pointer-events-none" style={{fontSize:"20px"}}>search</span>
          <input type="text" placeholder="Search shipments, tracking ID..."
            className="pl-10 pr-4 py-2 bg-[#f2ecd9] border-none rounded-lg text-sm w-64 focus:ring-2 ring-[#00442d]/20 outline-none placeholder:text-[#506357]/50" />
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 text-[#506357] hover:bg-[#506357]/10 rounded-lg">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <div className="h-8 w-px bg-[#506357]/10 mx-1" />
          <Link href="/customer/profile" className="flex items-center gap-3 group">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-[#00442d] leading-none">{customerUser.name}</p>
              <p className="text-[10px] text-[#506357]">{customerUser.role}</p>
            </div>
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#fff9eb] shadow-sm ring-2 ring-transparent group-hover:ring-[#00442d]/20 transition-all">
              <img src={customerUser.avatar} alt="avatar" className="w-full h-full object-cover" />
            </div>
          </Link>
        </div>
      </header>
      <main className="ml-64 pt-20 min-h-screen">{children}</main>
    </div>
  );
}
