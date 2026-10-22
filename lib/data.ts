import type { ChartPoint, NotificationPref, SavedAddress, Shipment, UserProfile } from "@/types";

export const mockShipments: Shipment[] = [
  { id: "KF-902834",       description: "Electronic Components",    origin: "San Francisco, CA", destination: "Tokyo, JPN",      terminal: "HND Intl Terminal", carrier: "SkyExpress",          carrierType: "air",  status: "shipped",    eta: "Jun 14, 08:30", weight: "18.2 kg",  dimensions: "60×40×30 cm",   price: 1240, serviceLevel: "express",   insured: true, createdAt: "2026-10-21T09:00:00.000Z" },
  { id: "KF-882190",       description: "Industrial Machinery",     origin: "Rotterdam, NLD",    destination: "Berlin, GER",     terminal: "Zone B-4 Hub",      carrier: "Oceanic Blue",        carrierType: "sea",  status: "delivered",  eta: "Completed",     weight: "320 kg",   dimensions: "200×150×100 cm", price: 4850, serviceLevel: "standard",  insured: true, createdAt: "2026-10-15T09:00:00.000Z" },
  { id: "KF-7729-BM-9001", description: "Gift Packages – Premium",  origin: "San Francisco, CA", destination: "Los Angeles, CA", terminal: "LAX Distribution",  carrier: "Imanigifts Express",  carrierType: "road", status: "in-transit", eta: "Today, 4:30 PM",weight: "42.5 kg",  dimensions: "120×80×60 cm",  price: 2180, serviceLevel: "express",   insured: true, createdAt: "2026-10-18T09:00:00.000Z" },
  { id: "KF-8821-XP-3022", description: "Gift Hampers – Corporate", origin: "Portland, OR",      destination: "Seattle, WA",     terminal: "SEA Central Hub",   carrier: "FastRoute",           carrierType: "road", status: "shipped",    eta: "Tomorrow",      weight: "15.0 kg",  dimensions: "80×60×40 cm",   price: 780,  serviceLevel: "standard",  insured: false, createdAt: "2026-10-20T09:00:00.000Z" },
  { id: "KF-1209-LL-0044", description: "Luxury Goods",             origin: "Miami, FL",         destination: "Austin, TX",      terminal: "AUS Depot 3",       carrier: "PrimeFreight",        carrierType: "air",  status: "pending",    eta: "Oct 24",        weight: "8.5 kg",   dimensions: "50×30×20 cm",   price: 640,  serviceLevel: "economy",   insured: true, createdAt: "2026-10-22T09:00:00.000Z" },
  { id: "KF-4490-MM-8812", description: "Seasonal Gift Boxes",      origin: "Chicago, IL",       destination: "New York, NY",    terminal: "JFK Hub A",         carrier: "SkyExpress",          carrierType: "air",  status: "delivered",  eta: "Completed",     weight: "22.0 kg",  dimensions: "90×70×50 cm",   price: 1960, serviceLevel: "standard",  insured: false, createdAt: "2026-09-30T09:00:00.000Z" },
];

export const adminUser: UserProfile = {
  name: "Alex Sterling", role: "Fleet Manager",
  avatar: "https://i.pravatar.cc/150?img=47",
  email: "alex@imanigifts.com", phone: "+1 (555) 012-3456",
  plan: "Enterprise", shipmentsUsed: 750, shipmentsTotal: 1000,
  company: "Imanigifts Logistics",
};

export const customerUser: UserProfile = {
  name: "Marcus Chen", role: "Director of Logistics",
  avatar: "https://i.pravatar.cc/150?img=52",
  email: "marcus@omni-global.com", phone: "+1 (415) 555-0182",
  plan: "Premium", shipmentsUsed: 28, shipmentsTotal: 100,
  company: "Omni-Global Solutions",
};

export const chartData: ChartPoint[] = [
  { month: "JAN", air: 30, sea: 40 },
  { month: "FEB", air: 50, sea: 30 },
  { month: "MAR", air: 40, sea: 50 },
  { month: "APR", air: 70, sea: 20 },
  { month: "MAY", air: 45, sea: 45 },
  { month: "JUN", air: 80, sea: 15 },
];

export const defaultAddresses: SavedAddress[] = [
  { id: "addr-1", label: "Main Warehouse (West)", address: "4520 Logistics Pkwy, Houston, TX", icon: "warehouse" },
  { id: "addr-2", label: "HQ Corporate", address: "2200 Market St, San Francisco, CA", icon: "apartment" },
  { id: "addr-3", label: "East Coast Hub", address: "890 Industrial Blvd, Newark, NJ", icon: "store" },
];

export const defaultNotifications: NotificationPref[] = [
  { id: "dispatched", label: "Shipment Dispatched", sub: "When a shipment leaves the hub", enabled: true },
  { id: "status", label: "Status Updates", sub: "Real-time location changes", enabled: true },
  { id: "delivery", label: "Delivery Confirmation", sub: "When delivered", enabled: true },
  { id: "payment", label: "Payment Reminders", sub: "Before payments are due", enabled: false },
  { id: "system", label: "System Alerts", sub: "Critical system notifications", enabled: true },
];
