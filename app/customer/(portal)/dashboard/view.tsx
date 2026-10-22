"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Shipment, UserProfile } from "@/types";
import { getAllShipments } from "@/lib/orders";
import { getProfile } from "@/lib/profile";
import { getSession } from "@/lib/auth";
import { formatUSD, greeting } from "@/lib/format";
import StatusBadge from "@/components/shared/StatusBadge";
import CarrierIcon from "@/components/shared/CarrierIcon";
import Icon from "@/components/shared/Icon";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";

export default function DashboardView() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [shipments, setShipments] = useState<Shipment[]>([]);

  useEffect(() => {
    setProfile(getProfile("customer", getSession()));
    setShipments(getAllShipments());
  }, []);

  const stats = useMemo(() => {
    const now = new Date();
    const active = shipments.filter(
      (s) => s.status === "in-transit" || s.status === "shipped",
    );
    const deliveredMtd = shipments.filter(
      (s) =>
        s.status === "delivered" &&
        s.createdAt &&
        new Date(s.createdAt).getMonth() === now.getMonth() &&
        new Date(s.createdAt).getFullYear() === now.getFullYear(),
    );
    const pending = shipments.filter((s) => s.status === "pending");
    const spend = shipments.reduce((sum, s) => sum + (s.price ?? 0), 0);

    return {
      active,
      cards: [
        {
          icon: "local_shipping",
          label: "Active",
          value: String(active.length),
          cls: "bg-surface-container text-primary",
        },
        {
          icon: "task_alt",
          label: "Delivered (MTD)",
          value: String(deliveredMtd.length),
          cls: "bg-primary/10 text-primary",
        },
        {
          icon: "pending_actions",
          label: "Pending",
          value: String(pending.length),
          cls: "bg-amber-50 text-amber-700",
        },
        {
          icon: "payments",
          label: "Total Spend",
          value: formatUSD(spend),
          cls: "bg-surface-container text-primary",
        },
      ],
    };
  }, [shipments]);

  if (!profile) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      {/* Welcome banner */}
      <Reveal animateOnMount y={-30}>
        <div className="bg-primary rounded-xl p-8 relative overflow-hidden text-on-primary">
          <div className="absolute inset-0 opacity-5 pattern-lines" />
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <p className="text-accent text-sm font-medium mb-2">
                {greeting()},
              </p>
              <h2 className="font-headline text-3xl font-bold tracking-tight mb-1">
                {profile.name}
              </h2>
              <p className="text-on-primary/70 text-sm">
                You have {stats.active.length} active shipment
                {stats.active.length === 1 ? "" : "s"} in motion.
              </p>
            </div>

            <Link
              href="/customer/orders"
              className="bg-on-primary text-primary px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-highlight transition-colors"
            >
              <Icon name="add" size={16} />
              New Shipment
            </Link>
          </div>
        </div>
      </Reveal>

      {/* Stats */}
      <StaggerGroup animateOnMount className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.cards.map((card) => (
          <StaggerItem key={card.label}>
            <div className="bg-surface-container-lowest p-5 rounded-lg shadow-sm border border-secondary/5 hover:border-primary/20 transition-colors h-full">
              <div className={`p-2.5 ${card.cls} rounded-lg w-fit mb-3`}>
                <Icon name={card.icon} size={20} />
              </div>
              <p className="text-secondary text-xs font-medium mb-1">
                {card.label}
              </p>
              <p className="font-headline text-2xl font-extrabold text-primary tracking-tight">
                {card.value}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>

      {/* Active shipments */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-headline text-lg font-bold text-primary">
            Active Shipments
          </h3>
          <Link
            href="/customer/track"
            className="text-primary font-bold text-sm flex items-center gap-1 hover:underline"
          >
            Track All <Icon name="arrow_forward" size={16} />
          </Link>
        </div>

        {stats.active.length === 0 ? (
          <div className="bg-surface-container-low rounded-xl border border-secondary/10 p-10 text-center">
            <Icon
              name="package_2"
              className="text-secondary/60 text-4xl mb-3 block mx-auto"
            />
            <p className="text-secondary text-sm mb-4">
              No active shipments right now.
            </p>
            <Link
              href="/customer/orders"
              className="inline-block px-5 py-2.5 bg-primary text-on-primary rounded-lg font-bold text-sm hover:opacity-90 transition-all"
            >
              Book a Shipment
            </Link>
          </div>
        ) : (
          <StaggerGroup animateOnMount className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.active.map((shipment) => (
              <StaggerItem key={shipment.id}>
                <div className="bg-surface-container-lowest p-5 rounded-lg border border-secondary/5 hover:border-primary/20 transition-colors h-full">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-bold text-primary text-sm">
                        {shipment.id}
                      </p>
                      <p className="text-xs text-secondary">
                        {shipment.description}
                      </p>
                    </div>
                    <StatusBadge status={shipment.status} />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-secondary">
                      <Icon name="location_on" size={16} />
                      {shipment.destination}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CarrierIcon type={shipment.carrierType} />
                      <span className="text-xs font-medium text-primary">
                        {shipment.carrier}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-secondary/5 flex justify-between items-center">
                    <p className="text-xs text-secondary">
                      ETA:{" "}
                      <span className="font-bold text-primary">
                        {shipment.eta}
                      </span>
                    </p>
                    <Link
                      href={`/customer/track?q=${encodeURIComponent(shipment.id)}`}
                      className="text-xs text-primary font-bold hover:underline"
                    >
                      Track →
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </div>

      {/* Recent table */}
      <Reveal animateOnMount y={40} delay={0.2}>
        <div className="bg-surface-container-lowest rounded-lg shadow-sm overflow-hidden border border-secondary/5">
          <div className="p-6 border-b border-secondary/5 flex justify-between items-center">
            <h3 className="font-headline text-lg font-bold text-primary">
              Recent Orders
            </h3>
            <Link
              href="/customer/profile?tab=history"
              className="text-primary font-bold text-sm flex items-center gap-1 hover:underline"
            >
              Full History <Icon name="arrow_forward" size={16} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <caption className="sr-only">Recent orders</caption>
              <thead className="bg-surface-container">
                <tr>
                  {["Order ID", "Destination", "Carrier", "Status", "ETA"].map(
                    (heading) => (
                      <th
                        key={heading}
                        scope="col"
                        className="px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-secondary"
                      >
                        {heading}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary/5">
                {shipments.slice(0, 5).map((shipment) => (
                  <tr
                    key={shipment.id}
                    className="hover:bg-surface-container-low/60 transition-colors"
                  >
                    <td className="px-5 py-4 text-sm font-bold text-primary">
                      {shipment.id}
                    </td>
                    <td className="px-5 py-4 text-sm text-primary">
                      {shipment.destination}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <CarrierIcon type={shipment.carrierType} />
                        <span className="text-sm text-primary">
                          {shipment.carrier}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={shipment.status} />
                    </td>
                    <td className="px-5 py-4 text-sm text-primary">
                      {shipment.eta}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
