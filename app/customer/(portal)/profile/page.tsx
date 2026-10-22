import type { Metadata } from "next";
import { Suspense } from "react";
import ProfileView from "./view";

export const metadata: Metadata = {
  title: "Profile",
  description: "Manage your account, shipment history, addresses, and security.",
};

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 flex justify-center">
          <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
      }
    >
      <ProfileView />
    </Suspense>
  );
}
