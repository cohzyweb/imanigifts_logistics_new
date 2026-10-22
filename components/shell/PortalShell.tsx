"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import type { Portal, UserProfile } from "@/types";
import { PORTAL_CONFIGS } from "@/lib/navigation";
import { clearSession } from "@/lib/auth";
import Icon from "@/components/shared/Icon";
import Logo from "@/components/shared/Logo";

type PortalShellProps = {
  portal: Portal;
  user: UserProfile;
  children: ReactNode;
};

export default function PortalShell({ portal, user, children }: PortalShellProps) {
  const config = PORTAL_CONFIGS[portal];
  const pathname = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState("");

  const usagePct = Math.round(
    (user.shipmentsUsed / user.shipmentsTotal) * 100,
  );

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const q = search.trim();
    router.push(q ? `${config.trackHref}?q=${encodeURIComponent(q)}` : config.trackHref);
  };

  const handleLogout = () => {
    clearSession();
    router.push(config.logoutHref);
  };

  const navLinkCls = (active: boolean) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
      active
        ? "bg-primary text-on-primary"
        : "text-secondary hover:bg-secondary/5"
    }`;

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col h-screen w-64 fixed left-0 top-0 z-50 bg-background border-r border-secondary/10"
      >
        <div className="p-6">
          <Logo
            href={config.homeHref}
            subtitle={config.label}
            className="mb-10"
          />

          <motion.nav
            className="space-y-1"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {config.nav.map((item) => {
              const active = pathname === item.href;
              return (
                <motion.div
                  key={item.href}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <Link href={item.href} className={navLinkCls(active)}>
                    <Icon name={item.icon} size={20} />
                    {item.label}
                  </Link>
                </motion.div>
              );
            })}
          </motion.nav>
        </div>

        {/* Bottom section */}
        <div className="mt-auto p-6 space-y-4">
          {portal === "admin" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-surface-variant p-4 rounded-xl border border-secondary/10"
            >
              <p className="text-[10px] font-bold text-secondary uppercase mb-2">
                {user.plan} Plan
              </p>
              <div className="h-1.5 w-full bg-secondary/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${usagePct}%` }}
                />
              </div>
              <p className="text-[10px] mt-2 text-secondary">
                {user.shipmentsUsed} / {user.shipmentsTotal} used
              </p>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="border-t border-secondary/10 pt-3 space-y-1"
          >
            <Link
              href="/customer/contact"
              className="flex items-center gap-3 px-4 py-2 text-sm text-secondary hover:bg-secondary/5 rounded-lg"
            >
              <Icon name="help" size={18} />
              Support
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-secondary hover:bg-secondary/5 rounded-lg"
            >
              <Icon name="logout" size={18} />
              Logout
            </button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href={config.primaryAction.href}
              className="w-full bg-primary text-on-primary py-3 px-4 rounded-lg font-bold flex items-center justify-center gap-2 text-sm hover:opacity-90 active:scale-95 transition-all"
            >
              <Icon name="add" size={18} />
              {config.primaryAction.label}
            </Link>
          </motion.div>
        </div>
      </motion.aside>

      {/* Header */}
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center h-16 px-8 ml-64 fixed top-0 right-0 w-[calc(100%-16rem)] z-40 bg-background/80 backdrop-blur-md shadow-sm"
      >
        <form onSubmit={handleSearch} className="relative" role="search">
          <Icon
            name="search"
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none"
          />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={config.searchPlaceholder}
            aria-label={config.searchPlaceholder}
            className="pl-10 pr-4 py-2 bg-surface-container rounded-lg text-sm w-72 focus:ring-2 ring-primary/20 outline-none placeholder:text-secondary/50 text-primary"
          />
        </form>

        <div className="flex items-center gap-3">
          <Link
            href={
              config.notificationDot
                ? `${config.profileHref}?tab=notifications`
                : config.profileHref
            }
            aria-label="Notifications"
            className="p-2 text-secondary hover:bg-secondary/10 rounded-lg relative"
          >
            <Icon name="notifications" />
            {config.notificationDot && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-background" />
            )}
          </Link>

          {config.showSettings && (
            <Link
              href={config.profileHref}
              aria-label="Settings"
              className="p-2 text-secondary hover:bg-secondary/10 rounded-lg"
            >
              <Icon name="settings" />
            </Link>
          )}

          <div className="h-8 w-px bg-secondary/10 mx-1" />

          <Link href={config.profileHref} className="flex items-center gap-3 group">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-primary leading-none">
                {user.name}
              </p>
              <p className="text-[10px] text-secondary">{user.role}</p>
            </div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-9 h-9 rounded-full overflow-hidden border-2 border-on-primary shadow-sm ring-2 ring-transparent group-hover:ring-primary/20 transition-all"
            >
              <Image
                src={user.avatar}
                alt={`${user.name} avatar`}
                width={36}
                height={36}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </Link>
        </div>
      </motion.header>

      {/* Main */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="ml-64 pt-20 min-h-screen"
      >
        {children}
      </motion.main>
    </div>
  );
}
