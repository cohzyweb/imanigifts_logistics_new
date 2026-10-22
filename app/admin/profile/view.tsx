"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { NotificationPref, Shipment, UserProfile } from "@/types";
import { getAllShipments } from "@/lib/orders";
import { getProfile, saveProfile } from "@/lib/profile";
import { getSession } from "@/lib/auth";
import { STORAGE_KEYS, load, save } from "@/lib/storage";
import { defaultNotifications } from "@/lib/data";
import { formatUSD } from "@/lib/format";
import {
  HistoryTable,
  PersonalInfoCard,
  PlanCard,
  ProfileHero,
  QuickStats,
  TabBar,
} from "@/components/profile/ProfileParts";
import Icon from "@/components/shared/Icon";

const TABS = ["Profile", "Shipment History", "Notifications", "Billing"];

const TAB_FROM_PARAM: Record<string, number> = {
  profile: 0,
  history: 1,
  notifications: 2,
  billing: 3,
};

const INVOICES = [
  { date: "Oct 1, 2026", description: "Enterprise Plan – Monthly", amount: "$299.00" },
  { date: "Sep 1, 2026", description: "Enterprise Plan – Monthly", amount: "$299.00" },
  { date: "Aug 1, 2026", description: "Enterprise Plan – Monthly", amount: "$299.00" },
];

export default function AdminProfileView() {
  const searchParams = useSearchParams();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [tab, setTab] = useState(0);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", role: "" });
  const [notifications, setNotifications] =
    useState<NotificationPref[]>(defaultNotifications);

  useEffect(() => {
    const loaded = getProfile("admin", getSession());
    setProfile(loaded);
    setForm({
      name: loaded.name,
      email: loaded.email,
      phone: loaded.phone,
      role: loaded.role,
    });
    setShipments(getAllShipments());
    setNotifications(
      load<NotificationPref[]>(STORAGE_KEYS.notifications, defaultNotifications),
    );

    const param = searchParams.get("tab");
    if (param && param in TAB_FROM_PARAM) setTab(TAB_FROM_PARAM[param]);
  }, [searchParams]);

  if (!profile) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const toggleEdit = () => {
    if (editing) {
      saveProfile("admin", form);
      setProfile({ ...profile, ...form });
      setEditing(false);
    } else {
      setEditing(true);
      setTab(0);
    }
  };

  const updateForm = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleNotification = (id: string) => {
    const next = notifications.map((pref) =>
      pref.id === id ? { ...pref, enabled: !pref.enabled } : pref,
    );
    setNotifications(next);
    save(STORAGE_KEYS.notifications, next);
  };

  const stats = (() => {
    const delivered = shipments.filter((s) => s.status === "delivered").length;
    const pending = shipments.filter((s) => s.status === "pending").length;
    const cancelled = shipments.filter((s) => s.status === "cancelled").length;
    const successRate = Math.round(
      (1 - cancelled / Math.max(1, shipments.length)) * 100,
    );
    return [
      { value: String(shipments.length), label: "Total Tracked", icon: "local_shipping" },
      { value: String(delivered), label: "Delivered", icon: "task_alt" },
      { value: String(pending), label: "Pending", icon: "pending_actions" },
      { value: `${successRate}%`, label: "Success Rate", icon: "verified" },
    ];
  })();

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <ProfileHero
        user={{ ...profile, ...form }}
        editing={editing}
        onToggleEdit={toggleEdit}
        meta={
          <>
            <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-bold">
              {profile.plan} Plan
            </span>
            <span className="text-xs text-secondary">{profile.email}</span>
          </>
        }
      >
        {form.role}
      </ProfileHero>

      <TabBar tabs={TABS} active={tab} onSelect={setTab} />

      {/* Profile tab */}
      {tab === 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PersonalInfoCard
            fields={[
              { key: "name", label: "Full Name", value: form.name },
              { key: "email", label: "Email", value: form.email },
              { key: "phone", label: "Phone", value: form.phone },
              { key: "role", label: "Role", value: form.role, readOnly: true },
            ]}
            editing={editing}
            onChange={updateForm}
          />
          <div className="space-y-4">
            <PlanCard
              plan={profile.plan}
              priceLine="$299/month · Renews Dec 1, 2026"
              usage={{
                used: profile.shipmentsUsed,
                total: profile.shipmentsTotal,
              }}
            />
            <QuickStats items={stats} />
          </div>
        </div>
      )}

      {/* History tab */}
      {tab === 1 && (
        <HistoryTable
          shipments={shipments}
          showEta
          searchPlaceholder="Search shipments..."
          filename="imanigifts-fleet-shipments.csv"
        />
      )}

      {/* Notifications tab */}
      {tab === 2 && (
        <div className="bg-surface-container-lowest p-8 rounded-xl border border-secondary/5 shadow-sm space-y-4">
          <h3 className="font-headline font-bold text-primary">
            Notification Preferences
          </h3>
          {notifications.map((pref) => (
            <div
              key={pref.id}
              className="flex justify-between items-center py-4 border-b border-secondary/5 last:border-0"
            >
              <div>
                <p className="text-sm font-bold text-primary">{pref.label}</p>
                <p className="text-xs text-secondary">{pref.sub}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={pref.enabled}
                aria-label={pref.label}
                onClick={() => toggleNotification(pref.id)}
                className={`w-11 h-6 rounded-full cursor-pointer flex items-center px-1 transition-colors ${
                  pref.enabled ? "bg-primary" : "bg-surface-container-high"
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full bg-white shadow transition-transform ${
                    pref.enabled ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Billing tab */}
      {tab === 3 && (
        <div className="space-y-5">
          <div className="sig-gradient text-on-primary p-8 rounded-xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 pattern-lines" />
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent/80 mb-2">
                  Current Plan
                </p>
                <h3 className="font-headline text-3xl font-extrabold">
                  {profile.plan}
                </h3>
                <p className="text-on-primary/70 text-sm mt-1">
                  $299/month · Renews Dec 1, 2026
                </p>
              </div>
              <span className="text-xs bg-accent/20 text-accent px-3 py-1 rounded-full font-bold">
                {formatUSD(299, true)} / mo
              </span>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl border border-secondary/5 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-secondary/5">
              <h3 className="font-headline font-bold text-primary">
                Billing History
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <caption className="sr-only">Billing history</caption>
                <thead className="bg-surface-container">
                  <tr>
                    {["Date", "Description", "Amount", "Status"].map(
                      (heading) => (
                        <th
                          key={heading}
                          scope="col"
                          className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-secondary"
                        >
                          {heading}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary/5">
                  {INVOICES.map((invoice) => (
                    <tr
                      key={invoice.date}
                      className="hover:bg-surface-container-low/60 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-secondary">
                        {invoice.date}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-primary">
                        {invoice.description}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-primary">
                        {invoice.amount}
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1">
                          <Icon name="check" size={12} fill />
                          Paid
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
