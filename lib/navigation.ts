import type { PortalConfig } from "@/types";

export const PORTAL_CONFIGS: Record<string, PortalConfig> = {
  customer: {
    portal: "customer",
    label: "Customer Portal",
    homeHref: "/customer/dashboard",
    nav: [
      { label: "Dashboard", icon: "dashboard", href: "/customer/dashboard" },
      { label: "New Shipment", icon: "local_shipping", href: "/customer/orders" },
      { label: "Tracking", icon: "location_on", href: "/customer/track" },
      { label: "Profile", icon: "person", href: "/customer/profile" },
    ],
    trackHref: "/customer/track",
    profileHref: "/customer/profile",
    logoutHref: "/customer/login",
    searchPlaceholder: "Search shipments, tracking ID...",
    primaryAction: { label: "New Shipment", href: "/customer/orders" },
    showSettings: false,
    notificationDot: false,
  },
  admin: {
    portal: "admin",
    label: "Admin Portal",
    homeHref: "/admin/dashboard",
    nav: [
      { label: "Dashboard", icon: "dashboard", href: "/admin/dashboard" },
      { label: "Shipments", icon: "local_shipping", href: "/admin/create-order" },
      { label: "Tracking", icon: "location_on", href: "/admin/track" },
      { label: "Profile", icon: "person", href: "/admin/profile" },
    ],
    trackHref: "/admin/track",
    profileHref: "/admin/profile",
    logoutHref: "/customer/login",
    searchPlaceholder: "Search manifest ID, container...",
    primaryAction: { label: "New Shipment", href: "/admin/create-order" },
    showSettings: true,
    notificationDot: true,
  },
};
