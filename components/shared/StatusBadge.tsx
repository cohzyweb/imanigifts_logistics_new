import type { ShipmentStatus } from "@/types";
const cfg: Record<ShipmentStatus, { label: string; cls: string }> = {
  shipped:      { label: "Shipped",    cls: "bg-primary/10 text-primary" },
  delivered:    { label: "Delivered",  cls: "bg-primary text-[#fff9eb]" },
  pending:      { label: "Pending",    cls: "bg-[#dbd2b5] text-[#00442d]" },
  "in-transit": { label: "In Transit", cls: "bg-primary text-[#fff9eb]" },
  cancelled:    { label: "Cancelled",  cls: "bg-error/10 text-error" },
};
export default function StatusBadge({ status }: { status: ShipmentStatus }) {
  const { label, cls } = cfg[status];
  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-tight ${cls}`}>{label}</span>;
}
