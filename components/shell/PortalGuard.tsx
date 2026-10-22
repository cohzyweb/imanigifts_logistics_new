"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import type { Portal } from "@/types";
import { getSession } from "@/lib/auth";
import { getProfile } from "@/lib/profile";
import PortalShell from "./PortalShell";
import Logo from "@/components/shared/Logo";

type PortalGuardProps = {
  portal: Portal;
  children: ReactNode;
};

export default function PortalGuard({ portal, children }: PortalGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [status, setStatus] = useState<"checking" | "ready">("checking");

  useEffect(() => {
    const session = getSession();
    if (!session || session.role !== portal) {
      const login = portal === "admin" ? "/customer/login?tab=admin" : "/customer/login";
      const next = encodeURIComponent(pathname);
      const separator = login.includes("?") ? "&" : "?";
      router.replace(`${login}${separator}next=${next}`);
      return;
    }
    setStatus("ready");
  }, [portal, pathname, router]);

  if (status === "checking") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6">
        <Logo subtitle="Verifying session" />
        <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const session = getSession();
  if (!session) return null;

  return (
    <PortalShell portal={portal} user={getProfile(portal, session)}>
      {children}
    </PortalShell>
  );
}
