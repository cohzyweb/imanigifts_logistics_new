"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import type { Portal, Shipment } from "@/types";
import { findShipment, getAllShipments } from "@/lib/orders";
import { buildTimeline, vehicleFor } from "@/lib/tracking";
import StatusBadge from "@/components/shared/StatusBadge";
import Icon from "@/components/shared/Icon";

type TrackViewProps = {
  portal: Portal;
  title: string;
  subtitle: string;
  tableTitle: string;
};

type Lookup =
  | { state: "idle" }
  | { state: "found"; shipment: Shipment }
  | { state: "missing"; id: string };

export default function TrackView({
  portal,
  title,
  subtitle,
  tableTitle,
}: TrackViewProps) {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(initialQ);
  const [lookup, setLookup] = useState<Lookup>({ state: "idle" });
  const [shipments, setShipments] = useState<Shipment[]>([]);

  useEffect(() => {
    setShipments(getAllShipments());
  }, []);

  const runSearch = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) {
      setLookup({ state: "idle" });
      return;
    }
    const found = findShipment(trimmed);
    setLookup(
      found
        ? { state: "found", shipment: found }
        : { state: "missing", id: trimmed },
    );
  };

  useEffect(() => {
    if (initialQ) runSearch(initialQ);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQ]);

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") runSearch(query);
  };

  const isAdmin = portal === "admin";

  return (
    <div className="p-8 space-y-8 max-w-6xl">
      {/* Search hero */}
      <section className="relative rounded-xl overflow-hidden bg-primary p-10 text-on-primary">
        <div className="absolute inset-0 opacity-5 pattern-lines" />
        <div className="relative z-10 max-w-2xl">
          <h2 className="font-headline text-3xl font-extrabold tracking-tighter mb-2">
            {title}
          </h2>
          <p className="text-on-primary/70 mb-6">{subtitle}</p>
          <div className="flex gap-2 p-2 bg-on-primary/10 rounded-lg border border-on-primary/20 focus-within:ring-2 ring-on-primary/30">
            <div className="flex-1 flex items-center px-3 gap-2">
              <Icon name="search" className="text-on-primary" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={onKeyDown}
                placeholder="KF-7729-BM-9001"
                aria-label="Tracking ID"
                className="bg-transparent border-none text-on-primary placeholder:text-on-primary/40 w-full focus:ring-0 outline-none font-bold"
              />
            </div>
            <button
              type="button"
              onClick={() => runSearch(query)}
              className="bg-on-primary text-primary px-6 py-3 rounded-md font-bold text-sm hover:brightness-95 transition-all active:scale-95"
            >
              Locate
            </button>
          </div>
        </div>
      </section>

      {/* Result */}
      {lookup.state === "missing" && (
        <div className="bg-surface-container-low rounded-xl border border-secondary/10 p-10 text-center">
          <div className="w-14 h-14 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="search_off" className="text-error text-2xl" />
          </div>
          <h3 className="font-headline text-xl font-bold text-primary mb-2">
            No shipment found
          </h3>
          <p className="text-secondary text-sm">
            We couldn&apos;t find a shipment matching{" "}
            <span className="font-bold text-primary">{lookup.id}</span>. Check
            the ID and try again, or pick one from the list below.
          </p>
        </div>
      )}

      {lookup.state === "found" && (
        <FoundShipment shipment={lookup.shipment} isAdmin={isAdmin} />
      )}

      {/* Shipments table */}
      <div>
        <h3 className="font-headline text-lg font-bold text-primary mb-4">
          {tableTitle}
        </h3>
        <div className="bg-surface-container-lowest rounded-xl overflow-hidden border border-secondary/5">
          <table className="w-full text-left">
            <caption className="sr-only">{tableTitle}</caption>
            <thead className="bg-surface-container">
              <tr>
                {["Shipment ID", "Destination", "Status", "ETA"].map(
                  (heading, index) => (
                    <th
                      key={heading}
                      scope="col"
                      className={`px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-secondary ${
                        index === 3 ? "text-right" : ""
                      }`}
                    >
                      {heading}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary/5">
              {shipments.map((shipment) => (
                <tr
                  key={shipment.id}
                  className="hover:bg-surface-container-low/60 cursor-pointer transition-colors"
                  onClick={() => {
                    setQuery(shipment.id);
                    runSearch(shipment.id);
                  }}
                >
                  <td className="px-6 py-4 font-bold text-primary text-sm">
                    {shipment.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-secondary">
                    {shipment.destination}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={shipment.status} />
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-sm text-primary">
                    {shipment.eta}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function FoundShipment({
  shipment,
  isAdmin,
}: {
  shipment: Shipment;
  isAdmin: boolean;
}) {
  const steps = buildTimeline(shipment);
  const vehicle = vehicleFor(shipment);

  return (
    <div className="grid grid-cols-12 gap-8">
      {/* Timeline */}
      <div className="col-span-12 lg:col-span-5">
        <div className="bg-surface-container-low p-8 rounded-xl border border-secondary/5">
          <div className="flex justify-between items-start mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-secondary">
                Active Transit
              </span>
              <h3 className="font-headline text-2xl font-bold mt-1 text-primary">
                {shipment.id}
              </h3>
            </div>
            <StatusBadge status={shipment.status} />
          </div>

          <div className="relative">
            <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-secondary/20" />
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative pl-11 pb-8 last:pb-0"
              >
                <div
                  className={`absolute left-0 top-1 w-7 h-7 rounded-full flex items-center justify-center z-10 ${
                    step.status === "completed" || step.status === "active"
                      ? step.status === "active"
                        ? "bg-primary text-on-primary ring-4 ring-primary/15"
                        : "bg-primary text-on-primary"
                      : "bg-surface-container border-2 border-secondary/20 text-secondary"
                  }`}
                >
                  <Icon
                    name={step.icon}
                    size={14}
                    fill={step.status !== "upcoming"}
                  />
                </div>
                <h4
                  className={`font-bold text-sm ${
                    step.status === "upcoming"
                      ? "text-secondary opacity-60"
                      : "text-primary"
                  }`}
                >
                  {step.label}
                </h4>
                <p
                  className={`text-xs text-secondary ${
                    step.status === "upcoming" ? "opacity-60" : ""
                  }`}
                >
                  {step.sub}
                </p>
                {step.detail && (
                  <div className="mt-3 p-3 bg-surface-container-high rounded-lg border-l-4 border-primary">
                    <p className="text-[10px] text-primary font-bold uppercase mb-0.5">
                      {step.detail.label}
                    </p>
                    <p className="text-lg font-extrabold text-primary">
                      {step.detail.value}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map + specs */}
      <div className="col-span-12 lg:col-span-7 space-y-4">
        <div className="bg-surface-container rounded-xl h-72 relative border border-secondary/5 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Icon name="location_on" className="text-on-primary text-3xl" />
            </div>
            <p className="text-primary font-bold text-sm">Live tracking active</p>
            <p className="text-secondary text-xs mt-1">{vehicle.location}</p>
          </div>

          <div className="absolute bottom-4 left-4 right-4 p-4 bg-background/90 backdrop-blur-md rounded-lg border border-primary/10 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded flex items-center justify-center text-on-primary">
                <Icon name={vehicle.icon} size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-secondary uppercase">
                  Live Vehicle #{vehicle.unit}
                </p>
                <p className="text-sm font-bold text-primary">
                  {vehicle.location}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-secondary">Speed</p>
              <p className="text-sm font-bold text-primary">{vehicle.speed}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface-container-low p-5 rounded-xl border border-secondary/5">
            <div className="flex items-center gap-2 mb-3">
              <Icon name="package_2" size={18} className="text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">
                {isAdmin ? "Specs" : "Package Specs"}
              </span>
            </div>
            {[
              ["Weight", shipment.weight ?? "—"],
              ["Dimensions", shipment.dimensions ?? "—"],
              [
                "Service",
                shipment.serviceLevel
                  ? shipment.serviceLevel.charAt(0).toUpperCase() +
                    shipment.serviceLevel.slice(1)
                  : shipment.carrier,
              ],
            ].map(([key, value]) => (
              <div key={key} className="flex justify-between py-1">
                <span className="text-xs text-secondary">{key}</span>
                <span className="text-xs font-bold text-primary">{value}</span>
              </div>
            ))}
          </div>

          <div className="bg-surface-container-low p-5 rounded-xl border border-secondary/5 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <Icon name="support_agent" size={18} className="text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">
                {isAdmin ? "Operations" : "Support"}
              </span>
            </div>
            <p className="text-xs text-secondary leading-relaxed mb-4 flex-1">
              Dispatcher available for specialized handling requests.
            </p>
            <Link
              href="/customer/contact"
              className="w-full py-2 bg-background text-primary text-xs font-bold rounded border border-secondary/20 hover:bg-surface-container transition-all text-center"
            >
              Contact Dispatch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
