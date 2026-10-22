"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import type { CarrierType, ServiceLevel, Shipment } from "@/types";
import {
  ADDON_PRICING,
  SERVICE_ETA,
  SERVICE_PRICING,
} from "@/types";
import { generateTrackingId, saveOrder } from "@/lib/orders";
import { etaFromNow, formatUSD } from "@/lib/format";
import Icon from "@/components/shared/Icon";
import { Field, inputCls, labelCls } from "@/components/shared/FormControls";

const CARRIER_LABELS: Record<CarrierType, string> = {
  air: "SkyExpress",
  sea: "Oceanic Blue",
  road: "Imanigifts Express",
};

const SERVICE_DAYS: Record<ServiceLevel, number> = {
  express: 2,
  standard: 4,
  economy: 9,
};

type Variant = "customer" | "admin";

interface FormState {
  fromName: string;
  fromStreet: string;
  fromCity: string;
  fromCountry: string;
  toName: string;
  toStreet: string;
  toCity: string;
  toCountry: string;
  description: string;
  weight: string;
  length: string;
  widthHeight: string;
  carrier: CarrierType;
  service: ServiceLevel;
  insurance: boolean;
  signature: boolean;
}

const initialForm: FormState = {
  fromName: "",
  fromStreet: "",
  fromCity: "",
  fromCountry: "",
  toName: "",
  toStreet: "",
  toCity: "",
  toCountry: "",
  description: "",
  weight: "",
  length: "",
  widthHeight: "",
  carrier: "road",
  service: "standard",
  insurance: false,
  signature: false,
};

type ShipmentWizardProps = {
  variant: Variant;
  heading: string;
  subtitle: string;
  cancelHref: string;
  trackHref: string;
  successTitle: string;
  successLabel: string;
};

export default function ShipmentWizard({
  variant,
  heading,
  subtitle,
  cancelHref,
  trackHref,
  successTitle,
  successLabel,
}: ShipmentWizardProps) {
  const isAdmin = variant === "admin";
  const steps = isAdmin
    ? ["Sender & Recipient", "Package & Logistics", "Review & Confirm"]
    : ["Origin & Destination", "Package Details", "Service & Payment"];

  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmedId, setConfirmedId] = useState<string | null>(null);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const total =
    SERVICE_PRICING[form.service] +
    (form.insurance ? ADDON_PRICING.insurance : 0) +
    (form.signature && isAdmin ? ADDON_PRICING.signature : 0);

  const validateStep = (): boolean => {
    const next: Record<string, string> = {};
    if (step === 0) {
      if (!form.fromCity.trim()) next.fromCity = "City is required";
      if (!form.toCity.trim()) next.toCity = "Destination city is required";
    }
    if (step === 1 && !form.description.trim()) {
      next.description = "Package description is required";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const goNext = () => {
    if (validateStep()) setStep((s) => Math.min(steps.length - 1, s + 1));
  };

  const confirm = () => {
    const id = generateTrackingId();
    const order: Shipment = {
      id,
      description: form.description.trim() || "General Cargo",
      origin: [form.fromCity, form.fromCountry].filter(Boolean).join(", "),
      destination: [form.toCity, form.toCountry].filter(Boolean).join(", "),
      terminal: `${(form.toCity || form.toCountry || "Regional").slice(0, 12)} Depot`,
      carrier: CARRIER_LABELS[form.carrier],
      carrierType: form.carrier,
      serviceLevel: form.service,
      status: "pending",
      eta: etaFromNow(SERVICE_DAYS[form.service]),
      price: total,
      insured: form.insurance,
      signature: isAdmin ? form.signature : undefined,
      createdAt: new Date().toISOString(),
      ...(form.weight ? { weight: `${form.weight} kg` } : {}),
      ...(form.length || form.widthHeight
        ? {
            dimensions: `${[form.length, form.widthHeight]
              .filter(Boolean)
              .join(" × ")} cm`,
          }
        : {}),
    };
    saveOrder(order);
    setConfirmedId(id);
  };

  const reset = () => {
    setForm(initialForm);
    setErrors({});
    setStep(0);
    setConfirmedId(null);
  };

  if (confirmedId) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[70vh]">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Icon
              name="check_circle"
              className="text-on-primary text-4xl"
              fill
            />
          </div>
          <h2 className="font-headline text-3xl font-extrabold text-primary mb-3">
            {successTitle}
          </h2>
          <p className="text-secondary mb-2">{successLabel}</p>
          <p className="text-2xl font-bold text-primary bg-surface-container rounded-xl px-6 py-3 inline-block mb-8">
            {confirmedId}
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              href={`${trackHref}?q=${encodeURIComponent(confirmedId)}`}
              className="px-6 py-3 bg-primary text-on-primary rounded-lg font-bold text-sm hover:opacity-90 transition-all"
            >
              Track Shipment
            </Link>
            <button
              type="button"
              onClick={reset}
              className="px-6 py-3 border border-secondary/30 text-secondary rounded-lg font-bold text-sm hover:bg-surface-container transition-all"
            >
              New Shipment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="font-headline text-3xl font-extrabold tracking-tight text-primary">
            {heading}
          </h2>
          <p className="text-secondary text-sm mt-1">{subtitle}</p>
        </div>
        <Link
          href={cancelHref}
          className="px-5 py-2 rounded-lg text-sm text-secondary border border-secondary/30 hover:bg-surface-container transition-all font-medium"
        >
          Cancel
        </Link>
      </div>

      {/* Stepper */}
      <div className="relative flex justify-between items-center px-4">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-secondary/15 -translate-y-1/2 z-0" />
        <div
          className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 z-0 transition-all duration-500"
          style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
        />
        {steps.map((label, index) => (
          <div
            key={label}
            className="relative z-10 flex flex-col items-center gap-1.5"
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                index <= step
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container text-secondary border-2 border-secondary/20"
              } ${index === step ? "ring-4 ring-primary/20" : ""}`}
            >
              {index < step ? (
                <Icon name="check" size={16} fill />
              ) : (
                index + 1
              )}
            </div>
            <span
              className={`text-xs font-bold whitespace-nowrap hidden sm:block ${
                index === step ? "text-primary" : "text-secondary/60"
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Form body */}
      <div className="bg-surface-container-lowest rounded-xl border border-secondary/5 shadow-sm p-8">
        {step === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <LocationSection
              title={isAdmin ? "Sender Details" : "Pickup Location"}
              icon="person_pin"
              nameValue={form.fromName}
              streetValue={form.fromStreet}
              cityValue={form.fromCity}
              countryValue={form.fromCountry}
              namePlaceholder={isAdmin ? "Full name" : "Sender name"}
              onName={(v) => update("fromName", v)}
              onStreet={(v) => update("fromStreet", v)}
              onCity={(v) => update("fromCity", v)}
              onCountry={(v) => update("fromCountry", v)}
              error={errors.fromCity}
            />
            <LocationSection
              title={isAdmin ? "Recipient Details" : "Delivery Destination"}
              icon="location_on"
              nameValue={form.toName}
              streetValue={form.toStreet}
              cityValue={form.toCity}
              countryValue={form.toCountry}
              namePlaceholder="Recipient name"
              onName={(v) => update("toName", v)}
              onStreet={(v) => update("toStreet", v)}
              onCity={(v) => update("toCity", v)}
              onCountry={(v) => update("toCountry", v)}
              error={errors.toCity}
            />
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label htmlFor="pkg-description" className={labelCls}>
                Package Description
              </label>
              <input
                id="pkg-description"
                className={inputCls}
                placeholder="e.g. Gift Hamper – Corporate Premium"
                value={form.description}
                onChange={(event) => update("description", event.target.value)}
              />
              {errors.description && (
                <p className="text-xs text-error mt-1.5 font-medium">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field label="Weight (kg)" htmlFor="pkg-weight">
                <input
                  id="pkg-weight"
                  type="number"
                  min="0"
                  className={inputCls}
                  placeholder="0.0"
                  value={form.weight}
                  onChange={(event) => update("weight", event.target.value)}
                />
              </Field>
              <Field label="Length (cm)" htmlFor="pkg-length">
                <input
                  id="pkg-length"
                  type="number"
                  min="0"
                  className={inputCls}
                  placeholder="0"
                  value={form.length}
                  onChange={(event) => update("length", event.target.value)}
                />
              </Field>
              <Field label="Width × Height" htmlFor="pkg-dims">
                <input
                  id="pkg-dims"
                  className={inputCls}
                  placeholder="40 × 30"
                  value={form.widthHeight}
                  onChange={(event) => update("widthHeight", event.target.value)}
                />
              </Field>
            </div>

            {!isAdmin && (
              <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 flex items-start gap-3">
                <Icon name="verified_user" size={18} className="text-primary" />
                <p className="text-xs font-medium text-primary leading-relaxed">
                  Your shipment is protected with Imanigifts Secure Cargo
                  Insurance up to $50,000.
                </p>
              </div>
            )}

            {isAdmin && (
              <>
                <CarrierServicePickers
                  carrier={form.carrier}
                  service={form.service}
                  showPrices={false}
                  onCarrier={(value) => update("carrier", value)}
                  onService={(value) => update("service", value)}
                />
                <OptionsRow
                  insurance={form.insurance}
                  signature={form.signature}
                  onInsurance={(value) => update("insurance", value)}
                  onSignature={(value) => update("signature", value)}
                />
              </>
            )}
          </div>
        )}

        {step === 2 && !isAdmin && (
          <div className="space-y-7">
            <CarrierServicePickers
              carrier={form.carrier}
              service={form.service}
              showPrices
              onCarrier={(value) => update("carrier", value)}
              onService={(value) => update("service", value)}
            />
            <label className="flex items-center gap-4 p-4 bg-surface-container rounded-xl cursor-pointer hover:bg-surface-container-high transition-all">
              <input
                type="checkbox"
                checked={form.insurance}
                onChange={(event) => update("insurance", event.target.checked)}
                className="w-4 h-4 accent-primary"
              />
              <div>
                <p className="text-sm font-bold text-primary">
                  Shipment Insurance
                </p>
                <p className="text-xs text-secondary">
                  Coverage up to $10,000 (+{formatUSD(ADDON_PRICING.insurance)})
                </p>
              </div>
            </label>
            <Summary
              rows={[
                ["Carrier", CARRIER_LABELS[form.carrier]],
                ["Service", capitalize(form.service)],
                ["Insurance", form.insurance ? "Included" : "Not selected"],
                ["Estimated Total", formatUSD(total, true)],
              ]}
            />
          </div>
        )}

        {step === 2 && isAdmin && (
          <div className="space-y-5">
            <h3 className="font-headline text-xl font-bold text-primary">
              Review Your Shipment
            </h3>
            <div className="bg-surface-container-low p-6 rounded-xl">
              <Summary
                rows={[
                  ["Carrier", CARRIER_LABELS[form.carrier]],
                  ["Service", capitalize(form.service)],
                  ["Insurance", form.insurance ? "Yes" : "No"],
                  ["Signature", form.signature ? "Required" : "Not required"],
                  ["Est. Total", formatUSD(total, true)],
                ]}
                asReview
              />
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className={`px-6 py-3 rounded-lg font-bold text-sm border border-secondary/30 text-secondary hover:bg-surface-container transition-all ${
            step === 0 ? "opacity-30 cursor-not-allowed" : ""
          }`}
        >
          ← Back
        </button>

        {step < steps.length - 1 ? (
          <button
            type="button"
            onClick={goNext}
            className="px-8 py-3 bg-primary text-on-primary rounded-lg font-bold text-sm hover:opacity-90 transition-all"
          >
            Continue →
          </button>
        ) : (
          <button
            type="button"
            onClick={confirm}
            className="px-8 py-3 bg-primary text-on-primary rounded-lg font-bold text-sm hover:opacity-90 transition-all shadow-lg"
          >
            {isAdmin ? "Confirm Shipment ✓" : "Confirm & Pay ✓"}
            <span className="sr-only"> — {formatUSD(total, true)}</span>
          </button>
        )}
      </div>
    </div>
  );
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function LocationSection({
  title,
  icon,
  nameValue,
  streetValue,
  cityValue,
  countryValue,
  namePlaceholder,
  onName,
  onStreet,
  onCity,
  onCountry,
  error,
}: {
  title: string;
  icon: string;
  nameValue: string;
  streetValue: string;
  cityValue: string;
  countryValue: string;
  namePlaceholder: string;
  onName: (value: string) => void;
  onStreet: (value: string) => void;
  onCity: (value: string) => void;
  onCountry: (value: string) => void;
  error?: string;
}) {
  const id = title.toLowerCase().replace(/[^a-z]+/g, "-");
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 bg-surface-container rounded-lg flex items-center justify-center text-primary">
          <Icon name={icon} size={18} />
        </div>
        <h3 className="font-headline font-bold text-primary">{title}</h3>
      </div>
      <Field label="Full Name" htmlFor={`${id}-name`}>
        <input
          id={`${id}-name`}
          className={inputCls}
          placeholder={namePlaceholder}
          value={nameValue}
          onChange={(event) => onName(event.target.value)}
        />
      </Field>
      <Field label="Street Address" htmlFor={`${id}-street`}>
        <input
          id={`${id}-street`}
          className={inputCls}
          placeholder="123 Main St"
          value={streetValue}
          onChange={(event) => onStreet(event.target.value)}
        />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="City" htmlFor={`${id}-city`}>
          <input
            id={`${id}-city`}
            className={inputCls}
            placeholder="City"
            value={cityValue}
            onChange={(event) => onCity(event.target.value)}
          />
        </Field>
        <Field label="Country" htmlFor={`${id}-country`}>
          <input
            id={`${id}-country`}
            className={inputCls}
            placeholder="Country"
            value={countryValue}
            onChange={(event) => onCountry(event.target.value)}
          />
        </Field>
      </div>
      {error && <p className="text-xs text-error font-medium">{error}</p>}
    </div>
  );
}

function CarrierServicePickers({
  carrier,
  service,
  showPrices,
  onCarrier,
  onService,
}: {
  carrier: CarrierType;
  service: ServiceLevel;
  showPrices: boolean;
  onCarrier: (value: CarrierType) => void;
  onService: (value: ServiceLevel) => void;
}) {
  return (
    <div className="space-y-7">
      <div>
        <h3 className="font-headline font-bold text-primary mb-4">
          Carrier Type
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {(["air", "sea", "road"] as CarrierType[]).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => onCarrier(type)}
              className={`p-4 rounded-xl border-2 text-center transition-all ${
                carrier === type
                  ? "border-primary bg-primary/5"
                  : "border-secondary/15 hover:border-secondary/40"
              }`}
            >
              <Icon
                name={
                  type === "air"
                    ? "flight"
                    : type === "sea"
                      ? "directions_boat"
                      : "local_shipping"
                }
                className="text-primary block mb-1.5"
              />
              <p className="text-sm font-bold text-primary capitalize">{type}</p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-headline font-bold text-primary mb-4">
          Service Level
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {(["express", "standard", "economy"] as ServiceLevel[]).map(
            (level) => (
              <button
                key={level}
                type="button"
                onClick={() => onService(level)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  service === level
                    ? "border-primary bg-primary/5"
                    : "border-secondary/15 hover:border-secondary/40"
                }`}
              >
                <p className="text-sm font-bold text-primary capitalize">
                  {level}
                </p>
                <p className="text-[10px] text-secondary">
                  {SERVICE_ETA[level]}
                </p>
                {showPrices && (
                  <p className="text-base font-extrabold text-primary mt-2">
                    {formatUSD(SERVICE_PRICING[level])}
                  </p>
                )}
              </button>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

function OptionsRow({
  insurance,
  signature,
  onInsurance,
  onSignature,
}: {
  insurance: boolean;
  signature: boolean;
  onInsurance: (value: boolean) => void;
  onSignature: (value: boolean) => void;
}) {
  const options: Array<{
    key: "insurance" | "signature";
    label: string;
    sub: string;
    checked: boolean;
    onChange: (value: boolean) => void;
  }> = [
    {
      key: "insurance",
      label: "Shipment Insurance",
      sub: `Coverage up to $10,000 (+${formatUSD(ADDON_PRICING.insurance)})`,
      checked: insurance,
      onChange: onInsurance,
    },
    {
      key: "signature",
      label: "Signature on Delivery",
      sub: `Requires recipient signature (+${formatUSD(ADDON_PRICING.signature)})`,
      checked: signature,
      onChange: onSignature,
    },
  ];

  return (
    <div className="space-y-3">
      {options.map((option) => (
        <label
          key={option.key}
          className="flex items-center gap-4 p-4 bg-surface-container rounded-xl cursor-pointer hover:bg-surface-container-high transition-all"
        >
          <input
            type="checkbox"
            checked={option.checked}
            onChange={(event) => option.onChange(event.target.checked)}
            className="w-4 h-4 accent-primary"
          />
          <div>
            <p className="text-sm font-bold text-primary">{option.label}</p>
            <p className="text-xs text-secondary">{option.sub}</p>
          </div>
        </label>
      ))}
    </div>
  );
}

function Summary({
  rows,
  asReview = false,
}: {
  rows: Array<[string, string]>;
  asReview?: boolean;
}) {
  const totalRow = rows[rows.length - 1];
  const isTotal = totalRow?.[0].includes("Total");

  const content: ReactNode = (
    <>
      {rows.map(([key, value], index) => {
        const last = index === rows.length - 1 && isTotal;
        return (
          <div
            key={key}
            className={`flex justify-between ${
              last
                ? "font-extrabold text-primary text-lg pt-3 border-t border-secondary/10 mt-3"
                : "text-sm"
            }`}
          >
            <span className={last ? "" : "text-secondary"}>{key}</span>
            <span className="font-bold text-primary">{value}</span>
          </div>
        );
      })}
    </>
  );

  if (asReview) return <div className="space-y-3">{content}</div>;
  return (
    <div className="border-t border-secondary/10 pt-5 space-y-2">
      {content}
    </div>
  );
}
