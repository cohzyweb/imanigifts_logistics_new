"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { customerUser } from "@/lib/data";
import { setSession } from "@/lib/auth";
import { saveProfile } from "@/lib/profile";
import Logo from "@/components/shared/Logo";
import Icon from "@/components/shared/Icon";
import GoogleButton from "@/components/shared/GoogleButton";

type AccountType = "individual" | "business";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignupForm() {
  const router = useRouter();
  const [type, setType] = useState<AccountType>("individual");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError("");

    if (!name.trim()) return setError("Please enter your full name.");
    if (!EMAIL_RE.test(email.trim()))
      return setError("Please enter a valid email address.");
    if (type === "business" && !company.trim())
      return setError("Please enter your company name.");
    if (password.length < 6)
      return setError("Password must be at least 6 characters.");
    if (!agreed)
      return setError("Please agree to the Terms of Service and Privacy Policy.");

    const normalized = email.trim().toLowerCase();
    const displayName = name.trim();

    saveProfile("customer", {
      name: displayName,
      email: normalized,
      ...(type === "business" ? { company: company.trim() } : {}),
    });
    setSession({ role: "customer", name: displayName, email: normalized });
    router.replace("/customer/dashboard");
  };

  const handleGoogle = () => {
    setSession({
      role: "customer",
      name: customerUser.name,
      email: customerUser.email,
    });
    router.replace("/customer/dashboard");
  };

  const fieldIconCls =
    "absolute left-4 top-1/2 -translate-y-1/2 text-secondary/50 text-xl";
  const inputCls =
    "w-full pl-12 pr-4 py-4 bg-highlight-deep rounded-lg border-0 text-on-surface placeholder:text-secondary/40 focus:bg-background focus:ring-2 ring-primary/10 outline-none transition-all";
  const labelCls =
    "block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5";

  return (
    <main className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      {/* LEFT PANEL */}
      <section className="hidden md:flex md:w-5/12 bg-primary relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pattern-lines" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary-dark rounded-full blur-3xl opacity-30" />
        <div className="relative z-10 max-w-md">
          <Logo markOnly size="lg" tone="inverse" className="mb-12" />
          <h1 className="font-headline text-5xl font-bold text-white leading-tight mb-6 tracking-tight">
            Join the <span className="text-accent">Modern Fleet.</span>
          </h1>
          <p className="text-accent/80 text-base leading-relaxed mb-12">
            Premium editorial tracking and bespoke shipping for businesses that
            value precision.
          </p>
          <div className="space-y-8">
            {[
              {
                icon: "auto_awesome",
                title: "Artisanal Precision",
                sub: "Every shipment treated with editorial care.",
              },
              {
                icon: "shield_with_heart",
                title: "Bespoke Insurance",
                sub: "Premium coverage for your most valuable assets.",
              },
            ].map((feature) => (
              <div key={feature.title} className="flex items-start gap-4">
                <div className="p-3 bg-primary-dark rounded-lg">
                  <Icon name={feature.icon} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{feature.title}</h3>
                  <p className="text-accent/70 text-sm">{feature.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RIGHT PANEL */}
      <section className="flex-1 flex flex-col items-center justify-center p-6 md:p-16 bg-background overflow-y-auto">
        <div className="w-full max-w-lg py-8">
          <div className="md:hidden mb-8">
            <Logo markOnly />
          </div>

          <h2 className="font-headline text-3xl font-bold text-primary mb-1">
            Create Account
          </h2>
          <p className="text-secondary mb-8">
            Register for the Imanigifts logistics portal.
          </p>

          <div className="flex p-1 bg-highlight-mid rounded-xl mb-8">
            {(["individual", "business"] as const).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setType(value)}
                className={`flex-1 py-3 text-center rounded-lg font-semibold transition-all text-sm ${
                  type === value
                    ? "bg-surface-container-lowest text-primary shadow-sm"
                    : "text-secondary hover:text-primary"
                }`}
              >
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div>
              <label htmlFor="signup-name" className={labelCls}>
                Full Name
              </label>
              <div className="relative">
                <Icon name="person" className={fieldIconCls} />
                <input
                  id="signup-name"
                  className={inputCls}
                  placeholder="Johnathan Doe"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="signup-email" className={labelCls}>
                Email Address
              </label>
              <div className="relative">
                <Icon name="mail" className={fieldIconCls} />
                <input
                  id="signup-email"
                  type="email"
                  className={inputCls}
                  placeholder="john@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </div>

            {type === "business" && (
              <div>
                <label htmlFor="signup-company" className={labelCls}>
                  Company Name
                </label>
                <div className="relative">
                  <Icon name="domain" className={fieldIconCls} />
                  <input
                    id="signup-company"
                    className={inputCls}
                    placeholder="Imanigifts Ltd."
                    value={company}
                    onChange={(event) => setCompany(event.target.value)}
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="signup-password" className={labelCls}>
                Password
              </label>
              <div className="relative">
                <Icon name="lock" className={fieldIconCls} />
                <input
                  id="signup-password"
                  type={showPw ? "text" : "password"}
                  className={`${inputCls} pr-12`}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((value) => !value)}
                  aria-label={showPw ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary/50 hover:text-primary transition-colors"
                >
                  <Icon
                    name={showPw ? "visibility_off" : "visibility"}
                    className="text-xl"
                  />
                </button>
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer py-2">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(event) => setAgreed(event.target.checked)}
                className="mt-1 h-4 w-4 rounded accent-primary"
              />
              <span className="text-sm text-secondary leading-snug">
                I agree to the{" "}
                <Link href="/customer/contact" className="text-primary font-semibold hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/customer/contact" className="text-primary font-semibold hover:underline">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>

            {error && (
              <p
                role="alert"
                className="text-sm font-medium text-error bg-error/10 border border-error/20 rounded-lg px-4 py-3"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-5 text-white font-bold rounded-lg shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 group sig-gradient"
            >
              Create Account{" "}
              <Icon
                name="arrow_forward"
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>

            <div className="relative py-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-secondary/30" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-4 text-secondary font-semibold tracking-wider">
                  Or continue with
                </span>
              </div>
            </div>

            <GoogleButton onClick={handleGoogle} label="Sign up with Google" />

            <p className="text-center text-secondary text-sm">
              Already have an account?{" "}
              <Link
                href="/customer/login"
                className="text-primary font-bold hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
