import Link from "next/link";
import Icon from "./Icon";

type LogoProps = {
  href?: string;
  subtitle?: string;
  size?: "sm" | "md" | "lg";
  tone?: "brand" | "inverse";
  markOnly?: boolean;
  className?: string;
};

const sizes = {
  sm: { box: "w-9 h-9", icon: "text-on-primary", textSize: "text-base" },
  md: { box: "w-10 h-10", icon: "text-on-primary", textSize: "text-lg" },
  lg: { box: "w-14 h-14", icon: "text-primary", textSize: "text-xl" },
};

export default function Logo({
  href,
  subtitle,
  size = "md",
  tone = "brand",
  markOnly = false,
  className = "",
}: LogoProps) {
  const s = sizes[size];
  const inverse = tone === "inverse";

  const mark = (
    <div
      className={`${s.box} ${
        inverse ? "bg-on-primary" : "bg-primary"
      } rounded-lg flex items-center justify-center shrink-0 ${
        size === "lg" ? "rounded-2xl shadow-lg" : ""
      }`}
    >
      <Icon
        name="card_giftcard"
        size={size === "lg" ? 28 : 20}
        className={inverse ? "text-primary" : "text-on-primary"}
      />
    </div>
  );

  if (markOnly) return <div className={className}>{mark}</div>;

  const content = (
    <span className={`flex items-center gap-3 ${className}`}>
      {mark}
      <span className="flex flex-col">
        <span
          className={`font-headline font-bold leading-none ${
            inverse ? "text-white" : "text-primary"
          } ${s.textSize}`}
        >
          Imanigifts Logistics
        </span>
        {subtitle && (
          <span className="text-[10px] uppercase tracking-widest text-secondary font-bold mt-1">
            {subtitle}
          </span>
        )}
      </span>
    </span>
  );

  return href ? (
    <Link href={href} aria-label="Imanigifts Logistics home">
      {content}
    </Link>
  ) : (
    content
  );
}
