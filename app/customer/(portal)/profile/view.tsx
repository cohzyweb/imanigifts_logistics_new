"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import type { SavedAddress, Shipment, UserProfile } from "@/types";
import { getAllShipments } from "@/lib/orders";
import { getProfile, saveProfile } from "@/lib/profile";
import { getSession, clearSession } from "@/lib/auth";
import { STORAGE_KEYS, load, makeId, remove, save } from "@/lib/storage";
import { defaultAddresses } from "@/lib/data";
import {
  HistoryTable,
  PersonalInfoCard,
  PlanCard,
  ProfileHero,
  QuickStats,
  TabBar,
} from "@/components/profile/ProfileParts";
import Icon from "@/components/shared/Icon";
import { inputSmCls, labelCls } from "@/components/shared/FormControls";

const TABS = ["Profile", "Shipment History", "Saved Addresses", "Security"];

const TAB_FROM_PARAM: Record<string, number> = {
  profile: 0,
  history: 1,
  addresses: 2,
  security: 3,
};

export default function ProfileView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [tab, setTab] = useState(0);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const [addresses, setAddresses] = useState<SavedAddress[]>(defaultAddresses);
  const [editAddressId, setEditAddressId] = useState<string | null>(null);
  const [newAddress, setNewAddress] = useState({ label: "", address: "" });
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const loaded = getProfile("customer", getSession());
    setProfile(loaded);
    setForm({
      name: loaded.name,
      email: loaded.email,
      phone: loaded.phone,
      company: loaded.company ?? "",
    });
    setShipments(getAllShipments());
    setAddresses(load<SavedAddress[]>(STORAGE_KEYS.addresses, defaultAddresses));

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
      saveProfile("customer", form);
      setProfile({ ...profile, ...form });
      setEditing(false);
    } else {
      setEditing(true);
      setTab(0);
    }
  };

  const updateForm = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const persistAddresses = (next: SavedAddress[]) => {
    setAddresses(next);
    save(STORAGE_KEYS.addresses, next);
  };

  const addAddress = (event: FormEvent) => {
    event.preventDefault();
    if (!newAddress.label.trim() || !newAddress.address.trim()) return;
    persistAddresses([
      ...addresses,
      {
        id: makeId("addr"),
        label: newAddress.label.trim(),
        address: newAddress.address.trim(),
        icon: "location_on",
      },
    ]);
    setNewAddress({ label: "", address: "" });
    setAdding(false);
  };

  const deleteAccount = () => {
    clearSession();
    remove(`${STORAGE_KEYS.profile}.customer`);
    remove(STORAGE_KEYS.orders);
    router.replace("/customer/login");
  };

  const stats = (() => {
    const delivered = shipments.filter((s) => s.status === "delivered").length;
    const inTransit = shipments.filter(
      (s) => s.status === "in-transit" || s.status === "shipped",
    ).length;
    const cancelled = shipments.filter((s) => s.status === "cancelled").length;
    const successRate = Math.round(
      (1 - cancelled / Math.max(1, shipments.length)) * 100,
    );
    return [
      { value: String(shipments.length), label: "Total Orders", icon: "local_shipping" },
      { value: String(delivered), label: "Delivered", icon: "task_alt" },
      { value: String(inTransit), label: "In Transit", icon: "transit_enterexit" },
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
              {profile.plan} Account
            </span>
            <span className="text-xs text-secondary">Member since Jan 2022</span>
          </>
        }
      >
        {profile.role}
        {form.company ? ` · ${form.company}` : ""}
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
              { key: "company", label: "Company", value: form.company },
            ]}
            editing={editing}
            onChange={updateForm}
          />
          <div className="space-y-4">
            <PlanCard
              plan={profile.plan}
              priceLine="$149/month · Renews Dec 1, 2026"
            />
            <QuickStats items={stats} />
          </div>
        </div>
      )}

      {/* History tab */}
      {tab === 1 && (
        <HistoryTable
          shipments={shipments}
          showDate
          showInvoice
          searchPlaceholder="Search by ID or destination..."
          filename="imanigifts-shipment-history.csv"
        />
      )}

      {/* Addresses tab */}
      {tab === 2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="bg-surface-container-lowest p-5 rounded-xl border border-secondary/5 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-surface-container rounded-lg text-primary">
                  <Icon name={address.icon} size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-primary">
                    {address.label}
                  </p>
                  {editAddressId === address.id ? (
                    <input
                      className={`${inputSmCls} !py-1.5 mt-1`}
                      value={address.address}
                      onChange={(event) =>
                        persistAddresses(
                          addresses.map((item) =>
                            item.id === address.id
                              ? { ...item, address: event.target.value }
                              : item,
                          ),
                        )
                      }
                    />
                  ) : (
                    <p className="text-xs text-secondary mt-0.5">
                      {address.address}
                    </p>
                  )}
                </div>
                <div className="flex gap-1">
                  <button
                    type="button"
                    aria-label={`Edit ${address.label}`}
                    onClick={() =>
                      setEditAddressId(
                        editAddressId === address.id ? null : address.id,
                      )
                    }
                    className="p-1.5 text-secondary hover:bg-surface-container rounded-lg transition-colors"
                  >
                    <Icon name={editAddressId === address.id ? "check" : "edit"} size={16} />
                  </button>
                  <button
                    type="button"
                    aria-label={`Delete ${address.label}`}
                    onClick={() =>
                      persistAddresses(
                        addresses.filter((item) => item.id !== address.id),
                      )
                    }
                    className="p-1.5 text-secondary hover:bg-error/10 hover:text-error rounded-lg transition-colors"
                  >
                    <Icon name="delete" size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {adding ? (
            <form
              onSubmit={addAddress}
              className="bg-surface-container-low border-2 border-primary/30 p-5 rounded-xl space-y-3"
            >
              <div>
                <label htmlFor="addr-label" className={labelCls}>
                  Label
                </label>
                <input
                  id="addr-label"
                  className={`${inputSmCls} !py-2`}
                  placeholder="e.g. South Depot"
                  value={newAddress.label}
                  onChange={(event) =>
                    setNewAddress((prev) => ({
                      ...prev,
                      label: event.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label htmlFor="addr-value" className={labelCls}>
                  Address
                </label>
                <input
                  id="addr-value"
                  className={`${inputSmCls} !py-2`}
                  placeholder="123 Market St, City, State"
                  value={newAddress.address}
                  onChange={(event) =>
                    setNewAddress((prev) => ({
                      ...prev,
                      address: event.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-on-primary rounded-lg text-xs font-bold hover:opacity-90 transition-all"
                >
                  Save Address
                </button>
                <button
                  type="button"
                  onClick={() => setAdding(false)}
                  className="px-4 py-2 border border-secondary/30 text-secondary rounded-lg text-xs font-bold hover:bg-surface-container transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setAdding(true)}
              className="bg-surface-container-low border-2 border-dashed border-secondary/20 p-5 rounded-xl flex items-center justify-center gap-2 text-secondary hover:border-primary/30 hover:text-primary transition-all"
            >
              <Icon name="add_location" />
              <span className="text-sm font-bold">Add New Address</span>
            </button>
          )}
        </div>
      )}

      {/* Security tab */}
      {tab === 3 && (
        <div className="bg-surface-container-lowest p-8 rounded-xl border border-secondary/5 shadow-sm space-y-5">
          <h3 className="font-headline font-bold text-primary">
            Account Security
          </h3>
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center gap-3">
            <Icon name="shield" className="text-emerald-600" fill />
            <p className="text-sm font-medium text-emerald-800">
              Multi-factor authentication is <strong>active</strong> on your
              account.
            </p>
          </div>

          {[
            { label: "Change Password", sub: "Update your account password", icon: "lock" },
            { label: "Two-Factor Authentication", sub: "Manage 2FA settings", icon: "security" },
            { label: "Login Sessions", sub: "View and revoke active sessions", icon: "devices" },
            { label: "Delete Account", sub: "Permanently remove your account", icon: "delete", danger: true },
          ].map((row) => (
            <div
              key={row.label}
              className={`flex items-center justify-between py-4 border-b border-secondary/5 last:border-0 ${
                row.danger ? "opacity-80" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  name={row.icon}
                  className={row.danger ? "text-error" : "text-primary"}
                />
                <div>
                  <p
                    className={`text-sm font-bold ${
                      row.danger ? "text-error" : "text-primary"
                    }`}
                  >
                    {row.label}
                  </p>
                  <p className="text-xs text-secondary">{row.sub}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={row.danger ? deleteAccount : undefined}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  row.danger
                    ? "border-error/30 text-error hover:bg-error/5"
                    : "border-secondary/30 text-secondary hover:bg-surface-container"
                }`}
              >
                {row.danger ? "Delete" : "Manage"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
