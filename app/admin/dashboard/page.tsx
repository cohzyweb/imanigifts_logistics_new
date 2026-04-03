import AdminShell from "@/components/admin/AdminShell";
import StatusBadge from "@/components/shared/StatusBadge";
import CarrierIcon from "@/components/shared/CarrierIcon";
import { mockShipments, chartData } from "@/lib/data";
import Link from "next/link";

export default function AdminDashboard() {
  const recent = mockShipments.slice(0, 5);
  const stats = [
    { icon: "transit_enterexit", bg: "bg-[#f2ecd9]", label: "Active Shipments", value: "1,284", badge: "+12.5%", badgeCls: "text-[#00442d] bg-[#00442d]/10" },
    { icon: "task_alt",          bg: "bg-[#00442d]/10", label: "Delivered (MTD)", value: "8,432", badge: "On Track", badgeCls: "text-emerald-600 bg-emerald-50", progress: 78 },
    { icon: "pending_actions",   bg: "bg-amber-50", color: "text-amber-700", label: "Pending Payment", value: "$42,900", badge: "Urgent", badgeCls: "text-error bg-error/10", note: "Next batch due in 4 hours" },
  ];
  return (
    <AdminShell>
      <div className="p-8 space-y-8">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-[#00442d]">Overview</h2>
          <p className="text-sm text-[#506357] mt-1">Real-time logistics operations dashboard</p>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-[#506357]/5 hover:border-[#00442d]/20 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 ${s.bg} rounded-lg ${s.color || "text-[#00442d]"}`}>
                  <span className="material-symbols-outlined">{s.icon}</span>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded ${s.badgeCls}`}>{s.badge}</span>
              </div>
              <p className="text-[#506357] text-sm font-medium mb-1">{s.label}</p>
              <p className="text-3xl font-extrabold text-[#00442d] tracking-tighter">{s.value}</p>
              {"progress" in s && s.progress !== undefined && (
                <>
                  <div className="mt-4 h-1.5 w-full bg-[#f2ecd9] rounded-full overflow-hidden">
                    <div className="h-full bg-[#00442d] rounded-full" style={{ width: `${s.progress}%` }} />
                  </div>
                  <p className="mt-2 text-[10px] font-semibold text-[#506357]/60 uppercase tracking-wide">{s.progress}% of monthly goal reached</p>
                </>
              )}
              {"note" in s && s.note && (
                <p className="mt-4 text-xs text-[#506357] flex items-center gap-1">
                  <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>schedule</span>{s.note}
                </p>
              )}
            </div>
          ))}
        </div>
        {/* Chart + Fleet */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 bg-white p-8 rounded-lg shadow-sm border border-[#506357]/5">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-xl font-extrabold tracking-tight text-[#00442d]">Shipping Volume</h2>
                <p className="text-sm text-[#506357]">Global fleet operations by month</p>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-[#506357]">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#00442d] inline-block" />Air</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#506357]/30 inline-block" />Sea</span>
              </div>
            </div>
            <div className="h-52 flex items-end justify-between gap-3 px-2">
              {chartData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col justify-end gap-0.5 h-full">
                    <div className="bg-[#506357]/25 w-full rounded-t-sm" style={{ height: `${d.sea}%` }} />
                    <div className="bg-[#00442d] w-full" style={{ height: `${d.air}%` }} />
                  </div>
                  <span className={`text-[10px] font-bold ${i === chartData.length - 1 ? "text-[#00442d]" : "text-[#506357]"}`}>{d.month}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-4 bg-[#00442d] text-[#fff9eb] rounded-lg p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff9eb 0,#fff9eb 1px,transparent 0,transparent 50%)", backgroundSize: "12px 12px" }} />
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">Fleet Performance</h3>
              <p className="text-[#fff9eb]/70 text-sm">Real-time terminal efficiency across 12 zones.</p>
            </div>
            <div className="relative z-10 space-y-3 mt-6">
              {[{ label: "Hub Utilization", pct: 92, color: "bg-emerald-400" }, { label: "On-Time Rate", pct: 87, color: "bg-amber-400" }].map(b => (
                <div key={b.label}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-[#fff9eb]/80 font-medium">{b.label}</span>
                    <span className="font-bold">{b.pct}%</span>
                  </div>
                  <div className="h-2 w-full bg-[#fff9eb]/10 rounded-full">
                    <div className={`h-full ${b.color} rounded-full`} style={{ width: `${b.pct}%` }} />
                  </div>
                </div>
              ))}
              <button className="w-full py-3 mt-2 bg-[#fff9eb]/10 border border-[#fff9eb]/20 rounded-lg font-bold text-sm hover:bg-[#fff9eb]/20 transition-all">Generate Audit Report</button>
            </div>
          </div>
        </div>
        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-[#506357]/5">
          <div className="p-6 border-b border-[#506357]/5 flex justify-between items-center">
            <h2 className="text-xl font-extrabold tracking-tight text-[#00442d]">Recent Shipments</h2>
            <Link href="/admin/track" className="text-[#00442d] font-bold text-sm flex items-center gap-1 hover:underline">
              View All <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>arrow_forward</span>
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#f2ecd9]">
                <tr>{["Shipment ID", "Destination", "Carrier", "Status", "ETA", ""].map((h, i) => (
                  <th key={i} className={`px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#506357] ${i === 5 ? "text-right" : ""}`}>{h}</th>
                ))}</tr>
              </thead>
              <tbody className="divide-y divide-[#506357]/5">
                {recent.map(s => (
                  <tr key={s.id} className="hover:bg-[#faf3df]/60 transition-colors group">
                    <td className="px-6 py-4"><p className="text-sm font-bold text-[#00442d]">{s.id}</p><p className="text-[10px] text-[#506357]">{s.description}</p></td>
                    <td className="px-6 py-4"><p className="text-sm font-medium text-[#00442d]">{s.destination}</p><p className="text-[10px] text-[#506357]">{s.terminal}</p></td>
                    <td className="px-6 py-4"><div className="flex items-center gap-2"><CarrierIcon type={s.carrierType} /><span className="text-sm font-medium text-[#00442d]">{s.carrier}</span></div></td>
                    <td className="px-6 py-4"><StatusBadge status={s.status} /></td>
                    <td className="px-6 py-4 text-sm font-medium text-[#00442d]">{s.eta}</td>
                    <td className="px-6 py-4 text-right"><button className="p-2 hover:bg-[#f2ecd9] rounded-lg text-[#506357] group-hover:text-[#00442d] transition-all"><span className="material-symbols-outlined">more_vert</span></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Link href="/admin/create-order" className="fixed bottom-8 right-8 w-14 h-14 bg-[#00442d] text-[#fff9eb] rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50">
        <span className="material-symbols-outlined text-2xl">add</span>
      </Link>
    </AdminShell>
  );
}
