import CustomerShell from "@/components/customer/CustomerShell";
import StatusBadge from "@/components/shared/StatusBadge";
import CarrierIcon from "@/components/shared/CarrierIcon";
import { mockShipments } from "@/lib/data";
import Link from "next/link";

export default function CustomerDashboard() {
  const active = mockShipments.filter(s => s.status === "in-transit" || s.status === "shipped");
  return (
    <CustomerShell>
      <div className="p-8 space-y-8">
        {/* Welcome banner */}
        <div className="bg-[#00442d] rounded-xl p-8 relative overflow-hidden text-[#fff9eb]">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff9eb 0,#fff9eb 1px,transparent 0,transparent 50%)", backgroundSize: "12px 12px" }} />
          <div className="relative z-10 flex justify-between items-start">
            <div><p className="text-[#8cd4b0] text-sm font-medium mb-2">Good morning,</p><h2 className="text-3xl font-bold tracking-tight mb-1">Marcus Chen</h2><p className="text-[#fff9eb]/70 text-sm">You have {active.length} active shipments in motion.</p></div>
            <Link href="/customer/orders" className="bg-[#fff9eb] text-[#00442d] px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-[#fdf4d3] transition-colors active:scale-95 flex items-center gap-2"><span className="material-symbols-outlined" style={{ fontSize: "16px" }}>add</span>New Shipment</Link>
          </div>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{icon:"local_shipping",label:"Active",value:String(active.length),bg:"bg-[#f2ecd9]"},{icon:"task_alt",label:"Delivered (MTD)",value:"12",bg:"bg-[#00442d]/10"},{icon:"pending_actions",label:"Pending",value:"3",bg:"bg-amber-50",color:"text-amber-700"},{icon:"payments",label:"Total Spend",value:"$8,240",bg:"bg-[#f2ecd9]"}].map(s => (
            <div key={s.label} className="bg-white p-5 rounded-lg shadow-sm border border-[#506357]/5 hover:border-[#00442d]/20 transition-colors">
              <div className={`p-2.5 ${s.bg} rounded-lg ${s.color||"text-[#00442d]"} w-fit mb-3`}><span className="material-symbols-outlined" style={{ fontSize: "20px" }}>{s.icon}</span></div>
              <p className="text-[#506357] text-xs font-medium mb-1">{s.label}</p>
              <p className="text-2xl font-extrabold text-[#00442d] tracking-tight">{s.value}</p>
            </div>
          ))}
        </div>
        {/* Active shipments */}
        <div>
          <div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold text-[#00442d]">Active Shipments</h3><Link href="/customer/track" className="text-[#00442d] font-bold text-sm flex items-center gap-1 hover:underline">Track All <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>arrow_forward</span></Link></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {active.map(s => (
              <div key={s.id} className="bg-white p-5 rounded-lg border border-[#506357]/5 hover:border-[#00442d]/20 transition-colors">
                <div className="flex justify-between items-start mb-3"><div><p className="font-bold text-[#00442d] text-sm">{s.id}</p><p className="text-xs text-[#506357]">{s.description}</p></div><StatusBadge status={s.status} /></div>
                <div className="flex items-center justify-between text-sm"><div className="flex items-center gap-2 text-[#506357]"><span className="material-symbols-outlined" style={{ fontSize: "16px" }}>location_on</span>{s.destination}</div><div className="flex items-center gap-1.5"><CarrierIcon type={s.carrierType} /><span className="text-xs font-medium text-[#00442d]">{s.carrier}</span></div></div>
                <div className="mt-3 pt-3 border-t border-[#506357]/5 flex justify-between items-center"><p className="text-xs text-[#506357]">ETA: <span className="font-bold text-[#00442d]">{s.eta}</span></p><Link href="/customer/track" className="text-xs text-[#00442d] font-bold hover:underline">Track →</Link></div>
              </div>
            ))}
          </div>
        </div>
        {/* Recent table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-[#506357]/5">
          <div className="p-6 border-b border-[#506357]/5 flex justify-between items-center"><h3 className="text-lg font-bold text-[#00442d]">Recent Orders</h3><Link href="/customer/profile" className="text-[#00442d] font-bold text-sm flex items-center gap-1 hover:underline">Full History <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>arrow_forward</span></Link></div>
          <table className="w-full text-left"><thead className="bg-[#f2ecd9]"><tr>{["Order ID","Destination","Carrier","Status","ETA"].map(h => <th key={h} className="px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-[#506357]">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-[#506357]/5">{mockShipments.slice(0,4).map(s => (<tr key={s.id} className="hover:bg-[#faf3df]/50 transition-colors"><td className="px-5 py-4 text-sm font-bold text-[#00442d]">{s.id}</td><td className="px-5 py-4 text-sm text-[#00442d]">{s.destination}</td><td className="px-5 py-4"><div className="flex items-center gap-2"><CarrierIcon type={s.carrierType} /><span className="text-sm text-[#00442d]">{s.carrier}</span></div></td><td className="px-5 py-4"><StatusBadge status={s.status} /></td><td className="px-5 py-4 text-sm text-[#00442d]">{s.eta}</td></tr>))}</tbody>
          </table>
        </div>
      </div>
    </CustomerShell>
  );
}
