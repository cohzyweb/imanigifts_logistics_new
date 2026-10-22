import type { ReactNode } from "react";

export const inputCls =
  "w-full px-4 py-3 bg-surface-container border-none rounded-lg text-sm text-primary placeholder:text-secondary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all";

export const inputSmCls =
  "w-full px-4 py-2.5 bg-surface-container border-none rounded-lg text-sm text-primary placeholder:text-secondary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all";

export const labelCls =
  "block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5";

export function Field({
  label,
  htmlFor,
  children,
  className = "",
}: {
  label: string;
  htmlFor?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className={labelCls}>
        {label}
      </label>
      {children}
    </div>
  );
}
