"use client";

import ShipmentWizard from "@/components/shipments/ShipmentWizard";

export default function CreateOrderView() {
  return (
    <ShipmentWizard
      variant="admin"
      heading="New Shipment"
      subtitle="Create a new logistical transit route."
      cancelHref="/admin/dashboard"
      trackHref="/admin/track"
      successTitle="Shipment Created!"
      successLabel="Tracking ID"
    />
  );
}
