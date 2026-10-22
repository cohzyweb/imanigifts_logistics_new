import type { Metadata } from "next";
import CreateOrderView from "./view";

export const metadata: Metadata = {
  title: "Create Order",
  description: "Create a new shipment and generate a tracking ID.",
};

export default function CreateOrderPage() {
  return <CreateOrderView />;
}
