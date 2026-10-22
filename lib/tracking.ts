import type { Shipment, TrackStep } from "@/types";

export function buildTimeline(shipment: Shipment): TrackStep[] {
  const { status, terminal, destination, eta, origin } = shipment;

  const activeStep =
    status === "pending"
      ? 0
      : status === "delivered"
        ? 99
        : status === "cancelled"
          ? 99
          : 1;

  const state = (index: number): TrackStep["status"] =>
    status === "cancelled"
      ? index === 0
        ? "completed"
        : "upcoming"
      : index < activeStep
        ? "completed"
        : index === activeStep
          ? "active"
          : "upcoming";

  const steps: TrackStep[] = [
    {
      label: "Shipment Picked Up",
      sub:
        status === "pending"
          ? `Awaiting pickup at ${terminal}`
          : `${origin ?? terminal} • Dispatched`,
      icon: "check_circle",
      status: state(0),
    },
    {
      label: "In Transit to Regional Center",
      sub:
        status === "in-transit"
          ? `Moving toward ${destination}`
          : status === "shipped"
            ? `Departed ${terminal}`
            : status === "delivered"
              ? `Passed through ${terminal}`
              : `Route queued via ${terminal}`,
      icon: "local_shipping",
      status: state(1),
      detail:
        state(1) === "active" && status !== "delivered"
          ? { label: "Estimated Arrival", value: eta }
          : undefined,
    },
    {
      label: "Out for Delivery",
      sub:
        status === "delivered"
          ? "Proof of delivery captured"
          : "Local Courier Assigned",
      icon: "inventory_2",
      status: state(2),
    },
    {
      label: "Delivered",
      sub: `Final Destination: ${destination}`,
      icon: "home",
      status: state(3),
    },
  ];

  return steps;
}

export function vehicleFor(shipment: Shipment) {
  const modes = {
    air: { icon: "flight", speed: "544 mph", prefix: "FLT" },
    sea: { icon: "directions_boat", speed: "18 kn", prefix: "SHP" },
    road: { icon: "electric_car", speed: "62 mph", prefix: "TRK" },
  } as const;

  const mode = modes[shipment.carrierType];
  const digits = shipment.id.replace(/\D/g, "").slice(-3).padStart(3, "0");

  return {
    icon: mode.icon,
    speed: mode.speed,
    unit: `${mode.prefix}-${digits}`,
    location: `${shipment.terminal} → ${shipment.destination}`,
  };
}
