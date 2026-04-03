import type { Shipment, UserProfile } from "@/types";

export const mockShipments: Shipment[] = [
  { id: "KF-902834",       description: "Electronic Components",    destination: "Tokyo, JPN",      terminal: "HND Intl Terminal", carrier: "SkyExpress",          carrierType: "air",  status: "shipped",    eta: "Jun 14, 08:30", weight: "18.2 kg",  dimensions: "60×40×30 cm" },
  { id: "KF-882190",       description: "Industrial Machinery",     destination: "Berlin, GER",     terminal: "Zone B-4 Hub",      carrier: "Oceanic Blue",        carrierType: "sea",  status: "delivered",  eta: "Completed",     weight: "320 kg",   dimensions: "200×150×100 cm" },
  { id: "KF-7729-BM-9001", description: "Gift Packages – Premium",  destination: "Los Angeles, CA", terminal: "LAX Distribution",  carrier: "Imanigifts Express",  carrierType: "road", status: "in-transit", eta: "Today, 4:30 PM",weight: "42.5 kg",  dimensions: "120×80×60 cm" },
  { id: "KF-8821-XP-3022", description: "Gift Hampers – Corporate", destination: "Seattle, WA",     terminal: "SEA Central Hub",   carrier: "FastRoute",           carrierType: "road", status: "shipped",    eta: "Tomorrow",      weight: "15.0 kg",  dimensions: "80×60×40 cm" },
  { id: "KF-1209-LL-0044", description: "Luxury Goods",             destination: "Austin, TX",      terminal: "AUS Depot 3",       carrier: "PrimeFreight",        carrierType: "air",  status: "pending",    eta: "Oct 24",        weight: "8.5 kg",   dimensions: "50×30×20 cm" },
  { id: "KF-4490-MM-8812", description: "Seasonal Gift Boxes",      destination: "New York, NY",    terminal: "JFK Hub A",         carrier: "SkyExpress",          carrierType: "air",  status: "delivered",  eta: "Completed",     weight: "22.0 kg",  dimensions: "90×70×50 cm" },
];

export const adminUser: UserProfile = {
  name: "Alex Sterling", role: "Fleet Manager",
  avatar: "https://i.pravatar.cc/150?img=47",
  email: "alex@imanigifts.com", phone: "+1 (555) 012-3456",
  plan: "Enterprise", shipmentsUsed: 750, shipmentsTotal: 1000,
};

export const customerUser: UserProfile = {
  name: "Marcus Chen", role: "Director of Logistics",
  avatar: "https://i.pravatar.cc/150?img=52",
  email: "marcus@omni-global.com", phone: "+1 (415) 555-0182",
  plan: "Premium", shipmentsUsed: 28, shipmentsTotal: 100,
};

export const chartData = [
  { month: "JAN", air: 30, sea: 40 },
  { month: "FEB", air: 50, sea: 30 },
  { month: "MAR", air: 40, sea: 50 },
  { month: "APR", air: 70, sea: 20 },
  { month: "MAY", air: 45, sea: 45 },
  { month: "JUN", air: 80, sea: 15 },
];
