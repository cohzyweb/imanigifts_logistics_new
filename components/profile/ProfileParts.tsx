"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import type { Shipment, ShipmentStatus, UserProfile } from "@/types";
import { downloadCSV } from "@/lib/download";
import { formatDateTime } from "@/lib/format";
import StatusBadge from "@/components/shared/StatusBadge";
import Icon from "@/components/shared/Icon";
import { inputSmCls, labelCls } from "@/components/shared/FormControls";

/* ---------------------------------- Hero --------------------------------- */

export function ProfileHero({
  user,
  meta,
  editing,
  onToggleEdit,
  children,
}: {
  user: UserProfile;
  meta: ReactNode;
  editing: boolean;
  onToggleEdit: () => void;
  children?: ReactNode;
}) {
  return (
    <div className="bg-surface-container-lowest rounded-xl border border-secondary/5 overflow-hidden shadow-sm">
      <div className="h-24 sig-gradient relative">
        <div className="absolute inset-0 opacity-10 pattern-lines" />
      </div>
      <div className="px-8 pb-8 relative">
        <div className="flex justify-between items-end -mt-10 mb-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-xl border-4 border-white shadow-lg overflow-hidden">
              <Image
                src={user.avatar}
                alt={`${user.name} avatar`}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-400 rounded-full border-2 border-white flex items-center justify-center">
              <Icon name="check" size={12} className="text-white" fill />
            </div>
          </div>
          <button
            type="button"
            onClick={onToggleEdit}
            className={`px-5 py-2 rounded-lg font-bold text-sm transition-all ${
              editing
                ? "bg-primary text-on-primary"
                : "border border-secondary/30 text-secondary hover:bg-surface-container"
            }`}
          >
            {editing ? "Save Changes" : "Edit Profile"}
          </button>
        </div>
        <h2 className="font-headline text-2xl font-extrabold text-primary">
          {user.name}
        </h2>
        <p className="text-secondary text-sm">{children ?? user.role}</p>
        <div className="flex items-center gap-4 mt-3">{meta}</div>
      </div>
    </div>
  );
}

/* ---------------------------------- Tabs --------------------------------- */

export function TabBar({
  tabs,
  active,
  onSelect,
}: {
  tabs: string[];
  active: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="flex gap-1 bg-surface-container p-1 rounded-lg w-fit flex-wrap">
      {tabs.map((tab, index) => (
        <button
          key={tab}
          type="button"
          onClick={() => onSelect(index)}
          aria-pressed={active === index}
          className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${
            active === index
              ? "bg-primary text-on-primary shadow-sm"
              : "text-secondary hover:text-primary"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

/* --------------------------- Personal info card -------------------------- */

export interface InfoField {
  key: string;
  label: string;
  value: string;
  readOnly?: boolean;
}

export function PersonalInfoCard({
  title = "Personal Information",
  fields,
  editing,
  onChange,
}: {
  title?: string;
  fields: InfoField[];
  editing: boolean;
  onChange: (key: string, value: string) => void;
}) {
  return (
    <div className="bg-surface-container-lowest p-6 rounded-xl border border-secondary/5 shadow-sm space-y-5">
      <h3 className="font-headline font-bold text-primary">{title}</h3>
      {fields.map((field) => (
        <div key={field.key}>
          <label
            htmlFor={`info-${field.key}`}
            className={labelCls}
          >
            {field.label}
          </label>
          {editing && !field.readOnly ? (
            <input
              id={`info-${field.key}`}
              className={`${inputSmCls} !py-2.5`}
              value={field.value}
              onChange={(event) => onChange(field.key, event.target.value)}
            />
          ) : (
            <p className="text-sm font-medium text-primary">{field.value}</p>
          )}
        </div>
      ))}
    </div>
  );
}

/* -------------------------------- Plan card ------------------------------ */

export function PlanCard({
  plan,
  priceLine,
  usage,
}: {
  plan: string;
  priceLine: string;
  usage?: { used: number; total: number };
}) {
  const pct = usage
    ? Math.round((usage.used / usage.total) * 100)
    : null;

  return (
    <div className="bg-primary p-6 rounded-xl text-on-primary">
      <div className="flex justify-between items-start mb-5">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-accent/70 mb-1">
            Account Plan
          </p>
          <h3 className="font-headline text-2xl font-bold">{plan}</h3>
          <p className="text-on-primary/70 text-xs mt-1">{priceLine}</p>
        </div>
        <span className="text-xs bg-accent/20 text-accent px-3 py-1 rounded-full font-bold">
          Active
        </span>
      </div>

      {usage && pct !== null && (
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-xs">
            <span className="text-on-primary/70">Shipments Used</span>
            <span>
              {usage.used} / {usage.total}
            </span>
                              </div>
          <div className="h-2 w-full bg-on-primary/10 rounded-full">
            <div
              className="h-full bg-accent rounded-full"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      )}

      <Link
        href="/customer/contact"
        className="block w-full py-2.5 bg-on-primary/10 border border-on-primary/20 rounded-lg font-bold text-sm hover:bg-on-primary/20 transition-all text-center"
      >
        Manage Plan
      </Link>
    </div>
  );
}

/* ------------------------------- Quick stats ----------------------------- */

export function QuickStats({
  items,
}: {
  items: Array<{ value: string; label: string; icon: string }>;
}) {
  return (
    <div className="bg-surface-container-lowest p-6 rounded-xl border border-secondary/5 shadow-sm">
      <h3 className="font-headline font-bold text-primary mb-4">Quick Stats</h3>
      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="text-center p-3 bg-surface-container-low rounded-lg"
          >
            <Icon
              name={item.icon}
              size={18}
              className="text-primary block mb-1"
            />
            <p className="text-lg font-extrabold text-primary">{item.value}</p>
            <p className="text-[10px] text-secondary mt-0.5">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ History table ---------------------------- */

const STATUS_OPTIONS: Array<ShipmentStatus | "all"> = [
  "all",
  "pending",
  "shipped",
  "in-transit",
  "delivered",
  "cancelled",
];

const PAGE_SIZE = 5;

export function HistoryTable({
  shipments,
  showDate = false,
  showEta = false,
  showInvoice = false,
  searchPlaceholder = "Search by ID...",
  filename = "shipment-history.csv",
}: {
  shipments: Shipment[];
  showDate?: boolean;
  showEta?: boolean;
  showInvoice?: boolean;
  searchPlaceholder?: string;
  filename?: string;
}) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ShipmentStatus | "all">("all");
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return shipments.filter((shipment) => {
      const matchesQuery =
        !query ||
        shipment.id.toLowerCase().includes(query) ||
        shipment.destination.toLowerCase().includes(query) ||
        shipment.description.toLowerCase().includes(query);
      const matchesStatus = status === "all" || shipment.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [shipments, search, status]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pageCount - 1);
  const visible = filtered.slice(current * PAGE_SIZE, current * PAGE_SIZE + PAGE_SIZE);

  const exportCsv = () => {
    const headers = ["Order ID"];
    if (showDate) headers.push("Date");
    headers.push("Destination", "Status");
    if (showEta) headers.push("ETA");
    headers.push("Weight");

    downloadCSV(
      filename,
      headers,
      filtered.map((shipment) => {
        const row: Array<string> = [shipment.id];
        if (showDate) row.push(formatDateTime(shipment.createdAt ?? ""));
        row.push(shipment.destination, shipment.status);
        if (showEta) row.push(shipment.eta);
        row.push(shipment.weight ?? "—");
        return row;
      }),
    );
  };

  const statusSelectCls = `${inputSmCls} !py-2 w-36 cursor-pointer`;

  return (
    <div className="bg-surface-container-lowest rounded-xl border border-secondary/5 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-secondary/5 flex flex-wrap gap-3 justify-between items-center">
        <h3 className="font-headline font-bold text-primary">Shipment History</h3>
        <div className="flex gap-2 flex-wrap">
          <input
            type="search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(0);
            }}
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            className="px-4 py-2 bg-surface-container rounded-lg text-sm focus:ring-2 ring-primary/20 outline-none border-none w-44 placeholder:text-secondary/50 text-primary"
          />
          <select
            value={status}
            onChange={(event) => {
              setStatus(event.target.value as ShipmentStatus | "all");
              setPage(0);
            }}
            aria-label="Filter by status"
            className={statusSelectCls}
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option === "all" ? "All Statuses" : option}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={exportCsv}
            aria-label="Download CSV"
            title="Download CSV"
            className="p-2 bg-primary text-on-primary rounded-lg hover:opacity-90 transition-all"
          >
            <Icon name="download" size={18} />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <caption className="sr-only">Shipment history</caption>
          <thead className="bg-surface-container">
            <tr>
              <th scope="col" className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-secondary">Order ID</th>
              {showDate && (
                <th scope="col" className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-secondary">Date</th>
              )}
              <th scope="col" className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-secondary">Destination</th>
              <th scope="col" className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-secondary">Status</th>
              {showEta && (
                <th scope="col" className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-secondary">ETA</th>
              )}
              <th scope="col" className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-secondary">Weight</th>
              {showInvoice && (
                <th scope="col" className="px-6 py-3 text-right text-[10px] font-bold uppercase tracking-widest text-secondary">Invoice</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary/5">
            {visible.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-10 text-center text-sm text-secondary"
                >
                  No shipments match your filters.
                </td>
              </tr>
            )}
            {visible.map((shipment) => (
              <tr
                key={shipment.id}
                className="hover:bg-surface-container-low/60 transition-colors"
              >
                <td className="px-6 py-4 font-mono text-xs font-bold text-primary">
                  {shipment.id}
                </td>
                {showDate && (
                  <td className="px-6 py-4 text-sm text-on-surface">
                    {formatDateTime(shipment.createdAt ?? "")}
                  </td>
                )}
                <td className="px-6 py-4 text-sm text-primary">
                  {shipment.destination}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={shipment.status} />
                </td>
                {showEta && (
                  <td className="px-6 py-4 text-sm text-primary">
                    {shipment.eta}
                  </td>
                )}
                <td className="px-6 py-4 text-sm text-secondary">
                  {shipment.weight ?? "—"}
                </td>
                {showInvoice && (
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={() =>
                        downloadCSV(
                          `invoice-${shipment.id}.csv`,
                          ["Order ID", "Description", "Destination", "Status", "Price"],
                          [
                            [
                              shipment.id,
                              shipment.description,
                              shipment.destination,
                              shipment.status,
                              shipment.price ?? 0,
                            ],
                          ],
                        )
                      }
                      className="inline-flex items-center gap-1 text-primary hover:underline text-xs font-bold"
                    >
                      Download{" "}
                      <Icon name="description" size={16} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 bg-surface-container-low/30 flex items-center justify-between border-t border-secondary/10">
        <span className="text-xs text-secondary font-medium">
          {filtered.length === 0
            ? "No entries"
            : `Showing ${current * PAGE_SIZE + 1} to ${Math.min(
                (current + 1) * PAGE_SIZE,
                filtered.length,
              )} of ${filtered.length} entries`}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={current === 0}
            aria-label="Previous page"
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-secondary/20 text-secondary hover:bg-surface-container-lowest transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Icon name="chevron_left" className="text-sm" />
          </button>
          {Array.from({ length: pageCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setPage(index)}
              aria-label={`Page ${index + 1}`}
              aria-current={current === index}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-colors ${
                current === index
                  ? "bg-primary text-on-primary"
                  : "border border-secondary/20 text-secondary hover:bg-surface-container-lowest"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
            disabled={current >= pageCount - 1}
            aria-label="Next page"
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-secondary/20 text-secondary hover:bg-surface-container-lowest transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Icon name="chevron_right" className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
}
