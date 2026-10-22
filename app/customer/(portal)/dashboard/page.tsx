import type { Metadata } from "next";
import DashboardView from "./view";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your shipments, orders, and account overview.",
};

export default function DashboardPage() {
  return <DashboardView />;
}
