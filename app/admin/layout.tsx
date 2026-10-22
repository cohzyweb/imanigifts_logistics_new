import type { Metadata } from "next";
import PortalGuard from "@/components/shell/PortalGuard";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Admin Portal",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PortalGuard portal="admin">{children}</PortalGuard>;
}
