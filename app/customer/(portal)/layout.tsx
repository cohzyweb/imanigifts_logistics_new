import type { Metadata } from "next";
import PortalGuard from "@/components/shell/PortalGuard";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Client Portal",
};

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PortalGuard portal="customer">{children}</PortalGuard>;
}
