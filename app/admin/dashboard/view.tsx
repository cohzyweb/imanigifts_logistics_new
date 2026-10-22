"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Shipment } from "@/types";
import { getAllShipments } from "@/lib/orders";
import { chartData } from "@/lib/data";
import { downloadCSV } from "@/lib/download";
import { formatUSD } from "@/lib/format";
import StatusBadge from "@/components/shared/StatusBadge";
import CarrierIcon from "@/components/shared/CarrierIcon";
import Icon from "@/components/shared/Icon";

interface StatCard {
  icon: string;
  bg: string;
  label: string;
  value: string;
  badge: string;
  badgeCls: string;
  color?: string;
  progress?: number;
  note?: string;
}

export default function AdminDashboardView() {
  const [shipments, setShipments] = useState<Shipment[]>([]);

  useEffect(() => {
    setShipments(getAllShipments());
  }, []);

  const stats = useMemo<StatCard[]>(() => {
    const now = new Date();
    const active = shipments.filter(
      (s) => s.status === "in-transit" || s.status === "shipped",
    ).length;
    const deliveredMtd = shipments.filter(
      (s) =>
        s.status === "delivered" &&
        s.createdAt &&
        new Date(s.createdAt).getMonth() === now.getMonth() &&
        new Date(s.createdAt).getFullYear() === now.getFullYear(),
    ).length;
    const pendingPayment = shipments
      .filter((s) => s.status === "pending")
      .reduce((sum, s) => sum + (s.price ?? 0), 0);

    return [
      {
        icon: "transit_enterexit",
        bg: "bg-surface-container",
        label: "Active Shipments",
        value: String(active),
        badge: "Live",
        badgeCls: "text-primary bg-primary/10",
      },
      {
        icon: "task_alt",
        bg: "bg-primary/10",
        label: "Delivered (MTD)",
        value: String(deliveredMtd),
        badge: "On Track",
        badgeCls: "text-emerald-600 bg-emerald-50",
        progress: 78,
      },
      {
        icon: "pending_actions",
        bg: "bg-amber-50",
        color: "text-amber-700",
        label: "Pending Payment",
        value: formatUSD(pendingPayment),
        badge: "Action",
        badgeCls: "text-error bg-error/10",
        note: "Next batch due in 4 hours",
      },
    ];
  }, [shipments]);

  const exportAudit = () => {
    downloadCSV(
      "imanigifts-fleet-audit.csv",
      ["Metric", "Value"],
      [
        ["Hub Utilization", "92%"],
        ["On-Time Rate", "87%"],
        ["Active Shipments", String(shipments.filter((s) => s.status === "in-transit" || s.status === "shipped").length)],
        ["Total Tracked Shipments", String(shipments.length)],
        ["Generated", new Date().toISOString()],
      ],
    );
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="font-headline text-2xl font-extrabold tracking-tight text-primary">
          Overview
        </h2>
        <p className="text-sm text-secondary mt-1">
          Real-time logistics operations dashboard
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-surface-container-lowest p-6 rounded-lg shadow-sm border border-secondary/5 hover:border-primary/20 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 ${stat.bg} rounded-lg ${stat.color ?? "text-primary"}`}>
                <Icon name={stat.icon} />
              </div>
              <span
                className={`text-xs font-bold px-2 py-1 rounded ${stat.badgeCls}`}
              >
                {stat.badge}
              </span>
            </div>
            <p className="text-secondary text-sm font-medium mb-1">
              {stat.label}
            </p>
            <p className="font-headline text-3xl font-extrabold text-primary tracking-tighter">
              {stat.value}
            </p>
            {stat.progress !== undefined && (
              <>
                <div className="mt-4 h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${stat.progress}%` }}
                  />
                </div>
                <p className="mt-2 text-[10px] font-semibold text-secondary/60 uppercase tracking-wide">
                  {stat.progress}% of monthly goal reached
                </p>
              </>
            )}
            {stat.note && (
              <p className="mt-4 text-xs text-secondary flex items-center gap-1">
                <Icon name="schedule" size={16} />
                {stat.note}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Chart + Fleet */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-surface-container-lowest p-8 rounded-lg shadow-sm border border-secondary/5">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="font-headline text-xl font-extrabold tracking-tight text-primary">
                Shipping Volume
              </h2>
              <p className="text-sm text-secondary">
                Global fleet operations by month
              </p>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-secondary">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                Air
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-secondary/30 inline-block" />
                Sea
              </span>
            </div>
          </div>
          <div
            className="h-52 flex items-end justify-between gap-3 px-2"
            role="img"
            aria-label="Bar chart of monthly air and sea shipping volume"
          >
            {chartData.map((point, index) => (
              <div
                key={point.month}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <div className="w-full flex flex-col justify-end gap-0.5 h-full">
                  <div
                    className="bg-secondary/25 w-full rounded-t-sm"
                    style={{ height: `${point.sea}%` }}
                  />
                  <div
                    className="bg-primary w-full"
                    style={{ height: `${point.air}%` }}
                  />
                </div>
                <span
                  className={`text-[10px] font-bold ${
                    index === chartData.length - 1 ? "text-primary" : "text-secondary"
                  }`}
                >
                  {point.month}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 bg-primary text-on-primary rounded-lg p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 pattern-lines" />
          <div className="relative z-10">
            <h3 className="font-headline text-xl font-bold mb-2">
              Fleet Performance
            </h3>
            <p className="text-on-primary/70 text-sm">
              Real-time terminal efficiency across 12 zones.
            </p>
          </div>
          <div className="relative z-10 space-y-3 mt-6">
            {[
              { label: "Hub Utilization", pct: 92, color: "bg-emerald-400" },
              { label: "On-Time Rate", pct: 87, color: "bg-amber-400" },
            ].map((bar) => (
              <div key={bar.label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-on-primary/80 font-medium">
                    {bar.label}
                  </span>
                  <span className="font-bold">{bar.pct}%</span>
                </div>
                <div className="h-2 w-full bg-on-primary/10 rounded-full">
                  <div
                    className={`h-full ${bar.color} rounded-full`}
                    style={{ width: `${bar.pct}%` }}
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={exportAudit}
              className="w-full py-3 mt-2 bg-on-primary/10 border border-on-primary/20 rounded-lg font-bold text-sm hover:bg-on-primary/20 transition-all"
            >
              Generate Audit Report
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface-container-lowest rounded-lg shadow-sm overflow-hidden border border-secondary/5">
        <div className="p-6 border-b border-secondary/5 flex justify-between items-center">
          <h2 className="font-headline text-xl font-extrabold tracking-tight text-primary">
            Recent Shipments
          </h2>
          <Link
            href="/admin/track"
            className="text-primary font-bold text-sm flex items-center gap-1 hover:underline"
          >
            View All <Icon name="arrow_forward" size={16} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <caption className="sr-only">Recent shipments</caption>
            <thead className="bg-surface-container">
              <tr>
                {["Shipment ID", "Destination", "Carrier", "Status", "ETA", ""].map(
                  (heading, index) => (
                    <th
                      key={index}
                      scope="col"
                      className={`px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-secondary ${
                        index === 5 ? "text-right" : ""
                      }`}
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
                  className="hover:bg-surface-container-low/60 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-primary">
                      {shipment.id}
                    </p>
                    <p className="text-[10px] text-secondary">
                      {shipment.description}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-primary">
                      {shipment.destination}
                    </p>
                    <p className="text-[10px] text-secondary">
                      {shipment.terminal}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <CarrierIcon type={shipment.carrierType} />
                      <span className="text-sm font-medium text-primary">
                        {shipment.carrier}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={shipment.status} />
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-primary">
                    {shipment.eta}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/track?q=${encodeURIComponent(shipment.id)}`}
                      aria-label={`Track ${shipment.id}`}
                      className="p-2 inline-flex hover:bg-surface-container rounded-lg text-secondary group-hover:text-primary transition-all"
                    >
                      <Icon name="arrow_forward" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Link
        href="/admin/create-order"
        aria-label="Create shipment"
        className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50"
      >
        <Icon name="add" className="text-2xl" />
      </Link>
    </div>
  );
}
