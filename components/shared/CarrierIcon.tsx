const icons: Record<string, string> = { air: "flight", sea: "directions_boat", road: "local_shipping" };
export default function CarrierIcon({ type }: { type: "air" | "sea" | "road" }) {
  return (
    <div className="w-7 h-7 rounded bg-[#f2ecd9] flex items-center justify-center">
      <span className="material-symbols-outlined text-sm text-primary">{icons[type]}</span>
    </div>
  );
}
