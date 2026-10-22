import type { Metadata } from "next";
import { Suspense } from "react";
import TrackView from "@/components/tracking/TrackView";

export const metadata: Metadata = {
  title: "Track Shipment",
  description: "Real-time location and delivery trajectory for your shipments.",
};

export default function TrackPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 flex justify-center">
          <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
      }
    >
      <TrackView
        portal="customer"
        title="Track Your Shipment"
        subtitle="Enter your tracking ID to see real-time location and delivery trajectory."
        tableTitle="My Shipments"
      />
    </Suspense>
  );
}
