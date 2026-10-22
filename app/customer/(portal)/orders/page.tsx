import type { Metadata } from "next";
import OrdersView from "./view";

export const metadata: Metadata = {
  title: "New Shipment",
  description: "Book a new shipment: route, package details, and service level.",
};

export default function OrdersPage() {
  return <OrdersView />;
}
