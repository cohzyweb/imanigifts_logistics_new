import type { Metadata } from "next";
import DashboardView from "./view";

export const metadata: Metadata = {
  title: "Operations Overview",
  description: "Real-time logistics operations dashboard for fleet managers.",
};

export default function AdminDashboardPage() {
  return <DashboardView />;
}
