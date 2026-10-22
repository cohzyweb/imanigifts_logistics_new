export type ShipmentStatus =
  | "shipped"
  | "delivered"
  | "pending"
  | "in-transit"
  | "cancelled";

export type CarrierType = "air" | "sea" | "road";
export type ServiceLevel = "express" | "standard" | "economy";
export type Portal = "customer" | "admin";

export interface Shipment {
  id: string;
  description: string;
  destination: string;
  terminal: string;
  carrier: string;
  carrierType: CarrierType;
  status: ShipmentStatus;
  eta: string;
  weight?: string;
  dimensions?: string;
  price?: number;
  origin?: string;
  serviceLevel?: ServiceLevel;
  insured?: boolean;
  signature?: boolean;
  createdAt?: string;
}

export interface UserProfile {
  name: string;
  role: string;
  avatar: string;
  email: string;
  phone: string;
  plan: string;
  shipmentsUsed: number;
  shipmentsTotal: number;
  company?: string;
}

export interface Session {
  role: Portal;
  name: string;
  email: string;
  createdAt: string;
}

export interface SavedAddress {
  id: string;
  label: string;
  address: string;
  icon: string;
}

export interface TrackStep {
  label: string;
  sub: string;
  icon: string;
  status: "completed" | "active" | "upcoming";
  detail?: { label: string; value: string };
}

export interface ChartPoint {
  month: string;
  air: number;
  sea: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface NotificationPref {
  id: string;
  label: string;
  sub: string;
  enabled: boolean;
}

export interface NavItem {
  label: string;
  icon: string;
  href: string;
}

export interface PortalConfig {
  portal: Portal;
  label: string;
  homeHref: string;
  nav: NavItem[];
  trackHref: string;
  profileHref: string;
  logoutHref: string;
  searchPlaceholder: string;
  primaryAction: { label: string; href: string };
  showSettings: boolean;
  notificationDot: boolean;
}

export const SERVICE_PRICING: Record<ServiceLevel, number> = {
  express: 89,
  standard: 45,
  economy: 22,
};

export const SERVICE_ETA: Record<ServiceLevel, string> = {
  express: "1–2 days",
  standard: "3–5 days",
  economy: "7–14 days",
};

export const ADDON_PRICING = {
  insurance: 12,
  signature: 9,
} as const;
