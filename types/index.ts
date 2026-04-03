export type ShipmentStatus = "shipped" | "delivered" | "pending" | "in-transit" | "cancelled";

export interface Shipment {
  id: string;
  description: string;
  destination: string;
  terminal: string;
  carrier: string;
  carrierType: "air" | "sea" | "road";
  status: ShipmentStatus;
  eta: string;
  weight?: string;
  dimensions?: string;
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
}
