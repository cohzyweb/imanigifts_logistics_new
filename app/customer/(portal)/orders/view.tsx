"use client";

import ShipmentWizard from "@/components/shipments/ShipmentWizard";

export default function OrdersView() {
  return (
    <ShipmentWizard
      variant="customer"
      heading="New Shipment"
      subtitle="Create a new transit route and finalise manifest details."
      cancelHref="/customer/dashboard"
      trackHref="/customer/track"
      successTitle="Shipment Booked!"
      successLabel="Your tracking ID"
    />
  );
}
