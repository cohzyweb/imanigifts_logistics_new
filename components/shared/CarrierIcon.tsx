import type { CarrierType } from "@/types";
import Icon from "./Icon";

const icons: Record<CarrierType, string> = {
  air: "flight",
  sea: "directions_boat",
  road: "local_shipping",
};

export default function CarrierIcon({ type }: { type: CarrierType }) {
  return (
    <div className="w-7 h-7 rounded bg-surface-container flex items-center justify-center">
      <Icon name={icons[type]} className="text-sm text-primary" />
    </div>
  );
}
