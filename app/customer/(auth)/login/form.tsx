"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, type FormEvent } from "react";
import { adminUser, customerUser } from "@/lib/data";
import { setSession } from "@/lib/auth";
import { saveProfile } from "@/lib/profile";
import Logo from "@/components/shared/Logo";
import Icon from "@/components/shared/Icon";
import GoogleButton from "@/components/shared/GoogleButton";

type Tab = "client" | "admin";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function safeNext(next: string | null, tab: Tab): string {
  if (!next || !next.startsWith("/") || next.includes("//")) {
    return tab === "admin" ? "/admin/dashboard" : "/customer/dashboard";
  }
  const forbidden = ["/customer/login", "/customer/signup", "/admin/"];
  if (tab === "admin" && !next.startsWith("/admin")) {
    return "/admin/dashboard";
  }
  if (tab === "client" && forbidden.some((p) => next.startsWith(p))) {
    return "/customer/dashboard";
  }
  return next;
}

function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialTab: Tab =
    searchParams.get("tab") === "admin" ? "admin" : "client";
  const next = safeNext(searchParams.get("next"), initialTab);

  const [tab, setTab] = useState<Tab>(initialTab);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [staySignedIn, setStaySignedIn] = useState(true);
  const [error, setError] = useState("");

  const signIn = (role: "customer" | "admin", name: string, mail: string) => {
    setSession({ role, name, email: mail });
    router.replace(next);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError("");

    if (!EMAIL_RE.test(email.trim())) {
      setError("Please enter a valid work email.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    const normalized = email.trim().toLowerCase();

    if (tab === "admin") {
      if (normalized !== adminUser.email) {
        setError(
          `Admin access requires the admin account email (${adminUser.email}).`,
        );
        return;
      }
      signIn("admin", adminUser.name, adminUser.email);
      return;
    }

    const name =
      normalized === customerUser.email
        ? customerUser.name
        : normalized
            .split("@")[0]
            .replace(/[._-]+/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());

    saveProfile("customer", { name, email: normalized });
    signIn("customer", name, normalized);
  };

  const handleGoogle = () => {
    signIn("customer", customerUser.name, customerUser.email);
  };

  const inputCls =
    "w-full pl-12 pr-4 py-4 bg-highlight-deep border border-transparent rounded-xl text-on-surface placeholder:text-secondary/50 focus:ring-2 focus:ring-primary/20 focus:border-primary/40 outline-none transition-all duration-200";

  return (
    <main className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      {/* LEFT PANEL */}
      <section className="hidden md:flex md:w-1/2 lg:w-3/5 relative items-center justify-center bg-primary">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.25)_100%)]" />

        <div className="relative z-10 p-12 lg:p-20 max-w-xl">
          <Logo markOnly size="lg" tone="inverse" className="mb-14" />

          <h1 className="font-headline text-5xl lg:text-6xl font-bold text-white leading-tight mb-8 tracking-tight">
            Premium <span className="text-accent">Global</span> Fulfillment.
          </h1>

          <p className="text-accent text-lg leading-relaxed font-light">
            Experience the next generation of logistics. Secure, transparent,
            and tailored for the modern enterprise.
          </p>

          <div className="mt-16 flex gap-14">
            {[
              ["99.8%", "Precision Rate"],
              ["24/7", "Expert Support"],
            ].map(([value, label]) => (
              <div key={label}>
                <span className="font-headline text-3xl font-bold text-white">
                  {value}
                </span>
                <p className="text-accent text-xs uppercase tracking-widest mt-2">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RIGHT PANEL */}
      <section className="w-full md:w-1/2 lg:w-2/5 flex items-center justify-center p-6 md:p-12 lg:p-20 bg-background">
        <div className="w-full max-w-md">
          <div className="md:hidden mb-10">
            <Logo markOnly />
          </div>

          <div className="mb-10 text-center md:text-left">
            <h2 className="font-headline text-3xl font-bold text-primary mb-3">
              Welcome Back
            </h2>
            <p className="text-secondary">
              Please enter your credentials to access the portal.
            </p>
          </div>

          {/* Tabs */}
          <div className="bg-highlight-mid p-1.5 rounded-xl mb-8 flex shadow-inner">
            {(["client", "admin"] as const).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setTab(value);
                  setError("");
                }}
                className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  tab === value
                    ? "bg-background text-primary shadow-md"
                    : "text-secondary hover:text-primary"
                }`}
              >
                {value === "client" ? "Client Login" : "Admin Access"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="login-email"
                className="block text-sm font-medium text-secondary mb-2"
              >
                Work Email
              </label>
              <div className="relative">
                <Icon
                  name="mail"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/70 text-lg"
                />
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className={inputCls}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between mb-2">
                <label
                  htmlFor="login-password"
                  className="block text-sm font-medium text-secondary"
                >
                  Password
                </label>
                <Link
                  href="/customer/contact"
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Icon
                  name="lock"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/70 text-lg"
                />
                <input
                  id="login-password"
                  type={showPw ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className={`${inputCls} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((value) => !value)}
                  aria-label={showPw ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary/70 hover:text-primary transition-colors"
                >
                  <Icon name={showPw ? "visibility_off" : "visibility"} className="text-lg" />
                </button>
              </div>
            </div>

            {/* Checkbox */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={staySignedIn}
                onChange={(event) => setStaySignedIn(event.target.checked)}
                className="w-4 h-4 rounded accent-primary"
              />
              <span className="text-sm text-secondary">
                Stay signed in for 30 days
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

            {/* Primary */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl font-bold text-lg text-white text-center active:scale-[0.98] transition-all duration-200 shadow-xl sig-gradient hover:shadow-2xl"
            >
              Sign In to Portal
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-secondary/30" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-background px-4 text-secondary">OR</span>
              </div>
            </div>

            <GoogleButton onClick={handleGoogle} />
          </form>

          {/* Demo hint */}
          <div className="mt-6 bg-surface-container rounded-xl p-4 border border-secondary/10">
            <p className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-2 flex items-center gap-1.5">
              <Icon name="key" size={14} className="text-primary" />
              Demo credentials
            </p>
            <p className="text-xs text-secondary leading-relaxed">
              Client: <span className="font-bold text-primary">{customerUser.email}</span>
              <br />
              Admin: <span className="font-bold text-primary">{adminUser.email}</span>
              <br />
              Password: any 6+ characters (e.g. demo1234)
            </p>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-secondary/20 text-center">
            <p className="text-secondary text-sm">
              New to Imanigifts?
              <Link
                href="/customer/signup"
                className="text-primary font-bold hover:underline ml-1"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function LoginFormBoundary() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
