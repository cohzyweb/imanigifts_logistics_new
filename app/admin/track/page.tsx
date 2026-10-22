import type { Metadata } from "next";
import { Suspense } from "react";
import TrackView from "@/components/tracking/TrackView";

export const metadata: Metadata = {
  title: "Track Shipment",
  description: "Look up any shipment by tracking ID across the fleet.",
};

export default function AdminTrackPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 flex justify-center">
          <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
      }
    >
      <TrackView
        portal="admin"
        title="Track Shipment"
        subtitle="Enter a tracking ID to view real-time location and status."
        tableTitle="All Shipments"
      />
    </Suspense>
  );
}
