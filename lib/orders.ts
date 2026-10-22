import type { Shipment } from "@/types";
import { mockShipments } from "./data";
import { STORAGE_KEYS, load, save } from "./storage";

export function getStoredOrders(): Shipment[] {
  return load<Shipment[]>(STORAGE_KEYS.orders, []);
}

export function saveOrder(order: Shipment): void {
  const orders = getStoredOrders();
  save(STORAGE_KEYS.orders, [order, ...orders]);
}

export function getAllShipments(): Shipment[] {
  return [...getStoredOrders(), ...mockShipments];
}

export function findShipment(id: string): Shipment | undefined {
  const query = id.trim().toUpperCase();
  if (!query) return undefined;
  return getAllShipments().find((s) => s.id.toUpperCase() === query);
}

export function generateTrackingId(): string {
  const block = () =>
    Math.random().toString(36).slice(2, 6).toUpperCase().padEnd(4, "0");
  return `KF-${block()}-${block()}`;
}
